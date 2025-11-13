import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { isCommentsFeatureEnabled } from "@/lib/feature-flags";
import { sendCommentNotification } from "@/lib/mailer";

const linkSchema = z
  .string()
  .url({ message: "Debe ser un URL válido" })
  .optional()
  .or(z.literal("").transform(() => undefined));

const updateCommentSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  body: z.string().min(1).optional(),
  linkUrl: linkSchema,
  elementLabel: z.string().optional(),
  status: z.enum(["pending", "in_progress", "resolved"]).optional(),
  editorFirstName: z.string().min(1).optional(),
  editorLastName: z.string().min(1).optional(),
});

type Params = {
  params: {
    pageId: string;
    commentId: string;
  };
};

function featureDisabledResponse() {
  return NextResponse.json({ message: "Not Found" }, { status: 404 });
}

export async function PATCH(request: Request, { params }: Params) {
  if (!isCommentsFeatureEnabled()) {
    return featureDisabledResponse();
  }

  const body = await request.json().catch(() => null);
  const parsed = updateCommentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const session = await auth();
  const { pageId, commentId } = params;

  const comment = await db.pageComment.findUnique({
    where: { id: commentId, pageId },
  });

  if (!comment) {
    return NextResponse.json({ message: "Comment not found" }, { status: 404 });
  }

  let editorName = session?.user?.name;
  if (!editorName && parsed.data.editorFirstName && parsed.data.editorLastName) {
    editorName = `${parsed.data.editorFirstName} ${parsed.data.editorLastName}`;
  }

  if (!editorName) {
    return NextResponse.json(
      {
        message: "Se requiere nombre y apellido de quien edita cuando no hay sesión",
      },
      { status: 400 },
    );
  }

  const updateData: Record<string, unknown> = {};
  const hasAnyFieldUpdate =
    parsed.data.firstName !== undefined ||
    parsed.data.lastName !== undefined ||
    parsed.data.body !== undefined ||
    parsed.data.linkUrl !== undefined ||
    parsed.data.elementLabel !== undefined ||
    parsed.data.status !== undefined;

  if (!hasAnyFieldUpdate) {
    return NextResponse.json(
      { message: "No hay cambios para actualizar" },
      { status: 400 },
    );
  }

  if (parsed.data.firstName) updateData.firstName = parsed.data.firstName;
  if (parsed.data.lastName) updateData.lastName = parsed.data.lastName;
  if (parsed.data.body) updateData.body = parsed.data.body;
  if (parsed.data.linkUrl !== undefined) updateData.linkUrl = parsed.data.linkUrl ?? null;
  if (parsed.data.elementLabel !== undefined) updateData.elementLabel = parsed.data.elementLabel ?? null;
  if (parsed.data.status) updateData.status = parsed.data.status;

  updateData.updatedByUserId = session?.user?.id ?? null;

  const changes: string[] = [];
  if (parsed.data.body && parsed.data.body !== comment.body) {
    changes.push("- Texto del comentario editado");
  }
  if (parsed.data.status && parsed.data.status !== comment.status) {
    changes.push(`- Estado: ${comment.status} → ${parsed.data.status}`);
  }
  if (parsed.data.linkUrl !== undefined && parsed.data.linkUrl !== comment.linkUrl) {
    changes.push(
      `- Enlace: ${comment.linkUrl ?? "(sin enlace)"} → ${parsed.data.linkUrl || "(sin enlace)"}`,
    );
  }
  if (parsed.data.firstName && parsed.data.firstName !== comment.firstName) {
    changes.push(`- Nombre: ${comment.firstName} → ${parsed.data.firstName}`);
  }
  if (parsed.data.lastName && parsed.data.lastName !== comment.lastName) {
    changes.push(`- Apellido: ${comment.lastName} → ${parsed.data.lastName}`);
  }
  if (parsed.data.elementLabel && parsed.data.elementLabel !== comment.elementLabel) {
    changes.push(
      `- Etiqueta de sección: ${comment.elementLabel ?? "(sin etiqueta)"} → ${parsed.data.elementLabel}`,
    );
  }

  if (!changes.length) {
    return NextResponse.json(
      { message: "No hay cambios para registrar" },
      { status: 400 },
    );
  }

  const historySummary = changes.join("\n");

  try {
    await db.$transaction(async (tx) => {
      await tx.pageCommentRevision.create({
        data: {
          commentId: comment.id,
          previousBody: comment.body,
          previousLinkUrl: comment.linkUrl,
          previousStatus: comment.status,
          editedByUserId: session?.user?.id,
          editedByName: editorName,
        },
      });

      await tx.pageComment.update({
        where: { id: comment.id },
        data: updateData,
      });
    });

    const updated = await db.pageComment.findUnique({
      where: { id: commentId, pageId },
      include: {
        revisions: {
          orderBy: { editedAt: "desc" },
        },
      },
    });

    if (!updated) {
      throw new Error("Comment disappeared after update");
    }

    await sendCommentNotification({
      type: "updated",
      pageId,
      elementLabel: updated.elementLabel,
      commentId: updated.id,
      authorFullName: `${updated.firstName} ${updated.lastName}`,
      commentBody: updated.body,
      linkUrl: updated.linkUrl,
      status: updated.status,
      editorName,
      historySummary,
    });

    return NextResponse.json({
      comment: {
        ...updated,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
        revisions: updated.revisions.map((revision) => ({
          ...revision,
          editedAt: revision.editedAt.toISOString(),
        })),
      },
    });
  } catch (error) {
    console.error("Failed to update page comment", error);
    return NextResponse.json({ message: "Error updating comment" }, { status: 500 });
  }
}

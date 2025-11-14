import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { ensureCommentTables } from "@/lib/comments-bootstrap";
import { db } from "@/lib/db";
import { isCommentsFeatureEnabled } from "@/lib/feature-flags";
import { sendCommentNotification } from "@/lib/mailer";

function isValidUrl(value: string) {
  try {
    const parsed = new URL(value);
    return Boolean(parsed);
  } catch {
    return false;
  }
}

const linkSchema = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => {
    if (value === undefined) {
      return undefined;
    }
    if (value === null) {
      return null;
    }
    const trimmed = value.trim();
    return trimmed.length ? trimmed : null;
  })
  .superRefine((value, ctx) => {
    if (!value) {
      return;
    }
    if (!isValidUrl(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must be a valid URL",
      });
    }
  });

const updateCommentSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  body: z.string().min(1).optional(),
  linkUrl: linkSchema,
  elementLabel: z.string().optional(),
  status: z.enum(["pending", "in_progress", "resolved", "rejected"]).optional(),
  statusNote: z
    .string()
    .trim()
    .min(3, "Status note must be at least 3 characters")
    .optional(),
  editorFirstName: z.string().min(1).optional(),
  editorLastName: z.string().min(1).optional(),
});

type Params = {
  params: Promise<{
    pageId: string;
    commentId: string;
  }>;
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
  const { pageId, commentId } = await params;

  await ensureCommentTables(db);

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
        message: "Editor first and last name are required when no authenticated user is present.",
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
    return NextResponse.json({ message: "No changes were provided." }, { status: 400 });
  }

  if (parsed.data.firstName) updateData.firstName = parsed.data.firstName;
  if (parsed.data.lastName) updateData.lastName = parsed.data.lastName;
  if (parsed.data.body) updateData.body = parsed.data.body;
  if (parsed.data.linkUrl !== undefined) updateData.linkUrl = parsed.data.linkUrl ?? null;
  if (parsed.data.elementLabel !== undefined) updateData.elementLabel = parsed.data.elementLabel ?? null;
  const statusChanged = parsed.data.status && parsed.data.status !== comment.status;
  if (statusChanged) {
    updateData.status = parsed.data.status;
  }

  if (parsed.data.statusNote && !statusChanged) {
    return NextResponse.json(
      { message: "A status note can only be provided when the status changes." },
      { status: 400 },
    );
  }

  updateData.updatedByUserId = session?.user?.id ?? null;

  const changes: string[] = [];
  if (parsed.data.body && parsed.data.body !== comment.body) {
    changes.push("- Comment text updated");
  }
  if (statusChanged) {
    changes.push(`- Status: ${comment.status} → ${parsed.data.status}`);
  }
  if (parsed.data.linkUrl !== undefined && parsed.data.linkUrl !== comment.linkUrl) {
    changes.push(`- Link: ${comment.linkUrl ?? "(none)"} → ${parsed.data.linkUrl || "(none)"}`);
  }
  if (parsed.data.firstName && parsed.data.firstName !== comment.firstName) {
    changes.push(`- First name: ${comment.firstName} → ${parsed.data.firstName}`);
  }
  if (parsed.data.lastName && parsed.data.lastName !== comment.lastName) {
    changes.push(`- Last name: ${comment.lastName} → ${parsed.data.lastName}`);
  }
  if (parsed.data.elementLabel && parsed.data.elementLabel !== comment.elementLabel) {
    changes.push(`- Section label: ${comment.elementLabel ?? "(none)"} → ${parsed.data.elementLabel}`);
  }

  if (parsed.data.statusNote && statusChanged) {
    changes.push(`- Status note: ${parsed.data.statusNote.trim()}`);
  }

  if (!changes.length) {
    return NextResponse.json({ message: "No changes were detected." }, { status: 400 });
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
          statusNote: statusChanged ? parsed.data.statusNote?.trim() ?? null : null,
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
      statusNote: parsed.data.statusNote?.trim(),
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

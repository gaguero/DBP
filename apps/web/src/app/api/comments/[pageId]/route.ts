import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
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

const createCommentSchema = z.object({
  elementId: z.string().min(1),
  elementLabel: z.string().optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  body: z.string().min(1),
  linkUrl: linkSchema,
});

type Params = {
  params: Promise<{
    pageId: string;
  }>;
};

function featureDisabledResponse() {
  return NextResponse.json({ message: "Not Found" }, { status: 404 });
}

export async function GET(_request: Request, { params }: Params) {
  if (!isCommentsFeatureEnabled()) {
    return featureDisabledResponse();
  }

  const { pageId } = await params;

  const comments = await db.pageComment.findMany({
    where: { pageId },
    orderBy: { createdAt: "desc" },
    include: {
      revisions: {
        orderBy: { editedAt: "desc" },
      },
    },
  });

  return NextResponse.json({
    comments: comments.map((comment) => ({
      ...comment,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
      revisions: comment.revisions.map((revision) => ({
        ...revision,
        editedAt: revision.editedAt.toISOString(),
      })),
    })),
  });
}

export async function POST(request: Request, { params }: Params) {
  if (!isCommentsFeatureEnabled()) {
    return featureDisabledResponse();
  }

  const body = await request.json().catch(() => null);

  const parsed = createCommentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const session = await auth();
  const { pageId } = await params;

  try {
    const comment = await db.pageComment.create({
      data: {
        pageId,
        elementId: parsed.data.elementId,
        elementLabel: parsed.data.elementLabel ?? null,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        body: parsed.data.body,
        linkUrl: parsed.data.linkUrl ?? null,
        status: "pending",
        createdByUserId: session?.user?.id,
        updatedByUserId: session?.user?.id,
      },
    });

    await sendCommentNotification({
      type: "created",
      pageId,
      elementLabel: comment.elementLabel,
      commentId: comment.id,
      authorFullName: `${comment.firstName} ${comment.lastName}`,
      commentBody: comment.body,
      linkUrl: comment.linkUrl,
      status: comment.status,
    });

    return NextResponse.json({
      comment: {
        ...comment,
        createdAt: comment.createdAt.toISOString(),
        updatedAt: comment.updatedAt.toISOString(),
        revisions: [],
      },
    });
  } catch (error) {
    console.error("Failed to create page comment", error);
    return NextResponse.json({ message: "Error creating comment" }, { status: 500 });
  }
}

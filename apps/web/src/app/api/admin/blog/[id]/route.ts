import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { blogPostSchema } from "@/lib/validations/blog";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;

    const post = await db.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;

    const body = await request.json();
    const validated = blogPostSchema.parse(body);

    // Check if slug already exists for another post
    const existing = await db.blogPost.findUnique({
      where: { slug: validated.slug },
    });

    if (existing && existing.id !== id) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    const post = await db.blogPost.update({
      where: { id },
      data: {
        ...validated,
        date: validated.date || new Date(),
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;

    await db.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}


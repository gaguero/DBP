import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { blogPostSchema } from "@/lib/validations/blog";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale");
    const published = searchParams.get("published");

    const where: { locale?: string; published?: boolean } = {};
    if (locale) where.locale = locale;
    if (published !== null) where.published = published === "true";

    const posts = await db.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const validated = blogPostSchema.parse(body);

    // Check if slug already exists
    const existing = await db.blogPost.findUnique({
      where: { slug: validated.slug },
    });

    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    const post = await db.blogPost.create({
      data: {
        ...validated,
        date: validated.date || new Date(),
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error && typeof error === "object" && "name" in error && error.name === "ZodError") {
      return NextResponse.json({ error: (error as { errors: unknown }).errors }, { status: 400 });
    }
    const message = error && typeof error === "object" && "message" in error ? String(error.message) : "Failed to create post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


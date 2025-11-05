import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { blogPostSchema } from "@/lib/validations/blog";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

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
        slug: validated.slug,
        title: validated.title,
        excerpt: validated.excerpt,
        date: validated.date || new Date(),
        image: validated.image,
        featuredImage: validated.featuredImage,
        author: validated.author,
        category: validated.category,
        readingTime: validated.readingTime,
        locale: validated.locale,
        published: validated.published,
        contentBlocks: validated.contentBlocks as unknown as Prisma.InputJsonValue,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    const message = error && typeof error === "object" && "message" in error ? String(error.message) : "Failed to create post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


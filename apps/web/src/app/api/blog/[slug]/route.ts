import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const post = await db.blogPost.findUnique({
      where: { slug, published: true },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        date: true,
        image: true,
        featuredImage: true,
        author: true,
        category: true,
        readingTime: true,
        locale: true,
        contentBlocks: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch post" }, { status: 500 });
  }
}


import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";
    const published = searchParams.get("published") !== "false"; // Default to true

    const posts = await db.blogPost.findMany({
      where: {
        locale,
        published: published ? true : undefined,
      },
      orderBy: { date: "desc" },
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
      },
    });

    return NextResponse.json(posts, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    const message = error && typeof error === "object" && "message" in error ? String(error.message) : "Failed to fetch posts";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


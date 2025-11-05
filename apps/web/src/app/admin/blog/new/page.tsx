"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogPostSchema, type BlogPostInput } from "@/lib/validations/blog";
import { BlogEditor } from "@/components/admin/blog-editor";
import { ContentBlock } from "@/types/content-blocks";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogPostInput>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      locale: "en",
      published: false,
      contentBlocks: [],
    },
  });

  const onSubmit = async (data: BlogPostInput) => {
    if (contentBlocks.length === 0) {
      setError("Please add at least one content block");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          contentBlocks,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create post");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">New Blog Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              {...register("title")}
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
              Slug *
            </label>
            <input
              {...register("slug")}
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="my-blog-post"
            />
            {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>}
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
              Excerpt *
            </label>
            <textarea
              {...register("excerpt")}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <input
              {...register("category")}
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Author *
            </label>
            <input
              {...register("author")}
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>}
          </div>

          <div>
            <label htmlFor="readingTime" className="block text-sm font-medium text-gray-700">
              Reading Time *
            </label>
            <input
              {...register("readingTime")}
              type="text"
              placeholder="5 min read"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            {errors.readingTime && (
              <p className="mt-1 text-sm text-red-600">{errors.readingTime.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Featured Image URL
            </label>
            <input
              {...register("image")}
              type="text"
              placeholder="/images/example.jpg"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="locale" className="block text-sm font-medium text-gray-700">
              Language *
            </label>
            <select
              {...register("locale")}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              {...register("published")}
              type="checkbox"
              id="published"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              Publish immediately
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content Blocks *</label>
          <BlogEditor contentBlocks={contentBlocks} onChange={setContentBlocks} />
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}


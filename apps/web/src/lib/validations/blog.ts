import { z } from "zod";
import { ContentBlock } from "@/types/content-blocks";

// Content Block Schemas
const paragraphBlockSchema = z.object({
  type: z.literal("paragraph"),
  id: z.string(),
  content: z.string(),
});

const headingBlockSchema = z.object({
  type: z.literal("heading"),
  id: z.string(),
  level: z.enum(["1", "2", "3"]).transform(Number) as z.ZodType<1 | 2 | 3>,
  content: z.string(),
});

const imageBlockSchema = z.object({
  type: z.literal("image"),
  id: z.string(),
  src: z.string(),
  alt: z.string(),
  width: z.enum(["full", "medium", "small"]).optional(),
  position: z.enum(["centered", "left", "right"]).optional(),
  caption: z.string().optional(),
});

const galleryBlockSchema = z.object({
  type: z.literal("gallery"),
  id: z.string(),
  images: z.array(
    z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })
  ),
  columns: z.enum(["2", "3", "4"]).transform(Number) as z.ZodType<2 | 3 | 4>,
});

const quoteBlockSchema = z.object({
  type: z.literal("quote"),
  id: z.string(),
  content: z.string(),
  author: z.string().optional(),
});

const separatorBlockSchema = z.object({
  type: z.literal("separator"),
  id: z.string(),
});

const videoBlockSchema = z.object({
  type: z.literal("video"),
  id: z.string(),
  url: z.string().url(),
  provider: z.enum(["youtube", "vimeo"]),
  title: z.string().optional(),
});

const columnsBlockSchema = z.object({
  type: z.literal("columns"),
  id: z.string(),
  columns: z.array(z.object({ content: z.string() })),
  columnCount: z.enum(["2", "3"]).transform(Number) as z.ZodType<2 | 3>,
});

const callToActionBlockSchema = z.object({
  type: z.literal("callToAction"),
  id: z.string(),
  text: z.string(),
  url: z.string().url(),
  style: z.enum(["primary", "secondary"]).optional(),
});

const codeBlockSchema = z.object({
  type: z.literal("code"),
  id: z.string(),
  code: z.string(),
  language: z.string().optional(),
});

const listBlockSchema = z.object({
  type: z.literal("list"),
  id: z.string(),
  items: z.array(z.string()),
  ordered: z.boolean(),
});

const contentBlockSchema: z.ZodType<ContentBlock> = z.discriminatedUnion("type", [
  paragraphBlockSchema,
  headingBlockSchema,
  imageBlockSchema,
  galleryBlockSchema,
  quoteBlockSchema,
  separatorBlockSchema,
  videoBlockSchema,
  columnsBlockSchema,
  callToActionBlockSchema,
  codeBlockSchema,
  listBlockSchema,
]);

// Blog Post Schema
export const blogPostSchema = z.object({
  slug: z.string().min(1).max(200),
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(500),
  date: z.date().optional(),
  image: z.string().optional(),
  featuredImage: z.string().optional(),
  author: z.string().min(1).max(100),
  category: z.string().min(1).max(50),
  readingTime: z.string().min(1).max(20),
  locale: z.enum(["en", "es"]).default("en"),
  published: z.boolean().default(false),
  contentBlocks: z.array(contentBlockSchema).min(1),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

// For API responses
export const blogPostResponseSchema = blogPostSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type BlogPostResponse = z.infer<typeof blogPostResponseSchema>;


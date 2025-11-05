// Content Block Types for flexible blog post design

export type ContentBlockType =
  | "paragraph"
  | "heading"
  | "image"
  | "gallery"
  | "quote"
  | "separator"
  | "video"
  | "columns"
  | "callToAction"
  | "code"
  | "list";

export interface BaseContentBlock {
  type: ContentBlockType;
  id: string;
}

export interface ParagraphBlock extends BaseContentBlock {
  type: "paragraph";
  content: string; // Can contain HTML
}

export interface HeadingBlock extends BaseContentBlock {
  type: "heading";
  level: 1 | 2 | 3;
  content: string;
}

export interface ImageBlock extends BaseContentBlock {
  type: "image";
  src: string;
  alt: string;
  width?: "full" | "medium" | "small";
  position?: "centered" | "left" | "right";
  caption?: string;
}

export interface GalleryBlock extends BaseContentBlock {
  type: "gallery";
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  columns: 2 | 3 | 4;
}

export interface QuoteBlock extends BaseContentBlock {
  type: "quote";
  content: string;
  author?: string;
}

export interface SeparatorBlock extends BaseContentBlock {
  type: "separator";
}

export interface VideoBlock extends BaseContentBlock {
  type: "video";
  url: string;
  provider: "youtube" | "vimeo";
  title?: string;
}

export interface ColumnsBlock extends BaseContentBlock {
  type: "columns";
  columns: Array<{
    content: string; // HTML content
  }>;
  columnCount: 2 | 3;
}

export interface CallToActionBlock extends BaseContentBlock {
  type: "callToAction";
  text: string;
  url: string;
  style?: "primary" | "secondary";
}

export interface CodeBlock extends BaseContentBlock {
  type: "code";
  code: string;
  language?: string;
}

export interface ListBlock extends BaseContentBlock {
  type: "list";
  items: string[];
  ordered: boolean;
}

export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ImageBlock
  | GalleryBlock
  | QuoteBlock
  | SeparatorBlock
  | VideoBlock
  | ColumnsBlock
  | CallToActionBlock
  | CodeBlock
  | ListBlock;


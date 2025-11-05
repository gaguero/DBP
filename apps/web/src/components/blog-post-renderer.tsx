import React from "react";
import { ContentBlock } from "@/types/content-blocks";
import Image from "next/image";

interface BlogPostRendererProps {
  blocks: ContentBlock[];
}

export function BlogPostRenderer({ blocks }: BlogPostRendererProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <div
          className="text-base leading-7 text-[var(--color-text-primary)]"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      );

    case "heading":
      const HeadingTag = `h${block.level}` as "h1" | "h2" | "h3";
      const headingClasses = {
        1: "text-4xl md:text-5xl",
        2: "text-3xl md:text-4xl",
        3: "text-2xl md:text-3xl",
      };
      return (
        <HeadingTag className={`font-display text-[var(--color-navy)] mt-8 mb-4 ${headingClasses[block.level]}`}>
          {block.content}
        </HeadingTag>
      );

    case "image":
      const widthClasses = {
        full: "w-full",
        medium: "w-3/4 mx-auto",
        small: "w-1/2 mx-auto",
      };
      const positionClasses = {
        centered: "mx-auto",
        left: "mr-auto ml-0",
        right: "ml-auto mr-0",
      };
      return (
        <figure className={`${widthClasses[block.width || "medium"]} ${positionClasses[block.position || "centered"]}`}>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-600">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "gallery":
      const gridCols = {
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
      };
      return (
        <div className={`grid ${gridCols[block.columns]} gap-4`}>
          {block.images.map((img, idx) => (
            <div key={idx} className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white text-xs">
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-[var(--color-gold)] pl-6 italic text-lg text-gray-700 my-6">
          <p>{block.content}</p>
          {block.author && (
            <footer className="mt-2 text-sm text-gray-500">— {block.author}</footer>
          )}
        </blockquote>
      );

    case "separator":
      return <hr className="my-8 border-gray-300" />;

    case "video":
      const getEmbedUrl = (url: string, provider: "youtube" | "vimeo") => {
        if (provider === "youtube") {
          const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
          return match ? `https://www.youtube.com/embed/${match[1]}` : url;
        }
        if (provider === "vimeo") {
          const match = url.match(/vimeo\.com\/(\d+)/);
          return match ? `https://player.vimeo.com/video/${match[1]}` : url;
        }
        return url;
      };
      return (
        <div className="my-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src={getEmbedUrl(block.url, block.provider)}
              title={block.title || "Video"}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      );

    case "columns":
      const colClass = block.columnCount === 2 ? "grid-cols-2" : "grid-cols-3";
      return (
        <div className={`grid ${colClass} gap-6 my-6`}>
          {block.columns.map((col, idx) => (
            <div
              key={idx}
              className="text-base leading-7 text-[var(--color-text-primary)]"
              dangerouslySetInnerHTML={{ __html: col.content }}
            />
          ))}
        </div>
      );

    case "callToAction":
      const buttonClass = block.style === "primary" ? "button-primary" : "button-secondary";
      return (
        <div className="my-6 text-center">
          <a href={block.url} className={buttonClass}>
            {block.text}
          </a>
        </div>
      );

    case "code":
      return (
        <pre className="my-6 overflow-x-auto rounded-lg bg-gray-900 p-4">
          <code className={`language-${block.language || "text"}`}>{block.code}</code>
        </pre>
      );

    case "list":
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag className={`my-4 ${block.ordered ? "list-decimal" : "list-disc"} ml-6 space-y-2`}>
          {block.items.map((item, idx) => (
            <li key={idx} className="text-base leading-7 text-[var(--color-text-primary)]">
              {item}
            </li>
          ))}
        </ListTag>
      );

    default:
      return null;
  }
}


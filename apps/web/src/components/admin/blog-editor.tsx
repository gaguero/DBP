"use client";

import { ContentBlock } from "@/types/content-blocks";
import { useState } from "react";

interface BlogEditorProps {
  contentBlocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export function BlogEditor({ contentBlocks, onChange }: BlogEditorProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(contentBlocks);

  const addBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = {
      type,
      id: Math.random().toString(36).substring(7),
      ...(type === "paragraph" && { content: "" }),
      ...(type === "heading" && { level: 2, content: "" }),
      ...(type === "image" && { src: "", alt: "" }),
      ...(type === "gallery" && { images: [], columns: 3 }),
      ...(type === "quote" && { content: "" }),
      ...(type === "separator" && {}),
      ...(type === "video" && { url: "", provider: "youtube" }),
      ...(type === "columns" && { columns: [{ content: "" }, { content: "" }], columnCount: 2 }),
      ...(type === "callToAction" && { text: "", url: "", style: "primary" }),
      ...(type === "code" && { code: "", language: "" }),
      ...(type === "list" && { items: [""], ordered: false }),
    } as ContentBlock;

    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
    onChange(updatedBlocks);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    const updatedBlocks = blocks.map((block) =>
      block.id === id ? { ...block, ...updates } : block
    );
    setBlocks(updatedBlocks);
    onChange(updatedBlocks);
  };

  const deleteBlock = (id: string) => {
    const updatedBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(updatedBlocks);
    onChange(updatedBlocks);
  };

  const moveBlock = (id: string, direction: "up" | "down") => {
    const index = blocks.findIndex((block) => block.id === id);
    if (index === -1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;

    const updatedBlocks = [...blocks];
    [updatedBlocks[index], updatedBlocks[newIndex]] = [updatedBlocks[newIndex], updatedBlocks[index]];
    setBlocks(updatedBlocks);
    onChange(updatedBlocks);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 border-b pb-4">
        <button
          type="button"
          onClick={() => addBlock("paragraph")}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
        >
          + Text
        </button>
        <button
          type="button"
          onClick={() => addBlock("heading")}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
        >
          + Heading
        </button>
        <button
          type="button"
          onClick={() => addBlock("image")}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
        >
          + Image
        </button>
        <button
          type="button"
          onClick={() => addBlock("gallery")}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
        >
          + Gallery
        </button>
        <button
          type="button"
          onClick={() => addBlock("quote")}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
        >
          + Quote
        </button>
        <button
          type="button"
          onClick={() => addBlock("video")}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
        >
          + Video
        </button>
        <button
          type="button"
          onClick={() => addBlock("columns")}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
        >
          + Columns
        </button>
        <button
          type="button"
          onClick={() => addBlock("separator")}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
        >
          + Separator
        </button>
      </div>

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <BlockEditor
            key={block.id}
            block={block}
            index={index}
            totalBlocks={blocks.length}
            onUpdate={(updates) => updateBlock(block.id, updates)}
            onDelete={() => deleteBlock(block.id)}
            onMove={moveBlock}
          />
        ))}
      </div>

      {blocks.length === 0 && (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-500">No blocks yet. Click buttons above to add content.</p>
        </div>
      )}
    </div>
  );
}

function BlockEditor({
  block,
  index,
  totalBlocks,
  onUpdate,
  onDelete,
  onMove,
}: {
  block: ContentBlock;
  index: number;
  totalBlocks: number;
  onUpdate: (updates: Partial<ContentBlock>) => void;
  onDelete: () => void;
  onMove: (id: string, direction: "up" | "down") => void;
}) {
  const renderBlockEditor = () => {
    switch (block.type) {
      case "paragraph":
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={block.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              rows={3}
            />
          </div>
        );
      case "heading":
        return (
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Level</label>
              <select
                value={block.level}
                onChange={(e) => onUpdate({ level: Number(e.target.value) as 1 | 2 | 3 })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              >
                <option value="1">H1</option>
                <option value="2">H2</option>
                <option value="3">H3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Text</label>
              <input
                type="text"
                value={block.content}
                onChange={(e) => onUpdate({ content: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              />
            </div>
          </div>
        );
      case "image":
        return (
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                value={block.src}
                onChange={(e) => onUpdate({ src: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                placeholder="/images/example.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Alt Text</label>
              <input
                type="text"
                value={block.alt}
                onChange={(e) => onUpdate({ alt: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Width</label>
                <select
                  value={block.width || "medium"}
                  onChange={(e) => onUpdate({ width: e.target.value as "full" | "medium" | "small" })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                >
                  <option value="full">Full</option>
                  <option value="medium">Medium</option>
                  <option value="small">Small</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <select
                  value={block.position || "centered"}
                  onChange={(e) => onUpdate({ position: e.target.value as "centered" | "left" | "right" })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                >
                  <option value="centered">Centered</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
            {block.caption !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Caption</label>
                <input
                  type="text"
                  value={block.caption || ""}
                  onChange={(e) => onUpdate({ caption: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                />
              </div>
            )}
          </div>
        );
      case "quote":
        return (
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Quote</label>
              <textarea
                value={block.content}
                onChange={(e) => onUpdate({ content: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                rows={3}
              />
            </div>
            {block.author !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Author</label>
                <input
                  type="text"
                  value={block.author || ""}
                  onChange={(e) => onUpdate({ author: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                />
              </div>
            )}
          </div>
        );
      case "video":
        return (
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Video URL</label>
              <input
                type="url"
                value={block.url}
                onChange={(e) => onUpdate({ url: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Provider</label>
              <select
                value={block.provider}
                onChange={(e) => onUpdate({ provider: e.target.value as "youtube" | "vimeo" })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              >
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
              </select>
            </div>
          </div>
        );
      case "separator":
        return <div className="text-sm text-gray-500">Separator line</div>;
      default:
        return <div className="text-sm text-gray-500">Block type: {block.type}</div>;
    }
  };

  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 capitalize">{block.type} Block</span>
        <div className="flex gap-2">
          {index > 0 && (
            <button
              type="button"
              onClick={() => onMove(block.id, "up")}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ↑
            </button>
          )}
          {index < totalBlocks - 1 && (
            <button
              type="button"
              onClick={() => onMove(block.id, "down")}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ↓
            </button>
          )}
          <button
            type="button"
            onClick={onDelete}
            className="text-sm text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      </div>
      {renderBlockEditor()}
    </div>
  );
}


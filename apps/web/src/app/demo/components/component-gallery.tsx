"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/button";
import type { ComponentShowcaseItem } from "./types";

type ComponentGalleryProps = {
  items: ComponentShowcaseItem[];
};

export function ComponentGallery({ items }: ComponentGalleryProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const selectedItems = useMemo(
    () => items.filter((item) => selectedIds.includes(item.definition.id)),
    [items, selectedIds],
  );

  const selectionText = useMemo(() => {
    if (!selectedItems.length) return "";
    return selectedItems
      .map((item, index) => `${index + 1}. ${item.definition.title} (${item.definition.component})`)
      .join("\n");
  }, [selectedItems]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    setCopyState("idle");
  };

  const handleCopySelection = async () => {
    if (!selectionText) return;
    try {
      await navigator.clipboard.writeText(selectionText);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch (error) {
      console.error("Failed to copy selection", error);
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 2500);
    }
  };

  return (
    <div className="space-y-16">
      <div className="grid gap-8">
        {items.map((item) => {
          const { definition, preview } = item;
          const isSelected = selectedIds.includes(definition.id);

          return (
            <article
              key={definition.id}
              className={clsx(
                "overflow-hidden rounded-[var(--radius-lg)] border bg-white shadow-[var(--shadow-soft)] transition-all duration-200",
                isSelected ? "border-[var(--color-ocean)] shadow-lg" : "border-white",
              )}
            >
              <div className="flex flex-col gap-4 border-b border-slate-200/70 p-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[var(--color-navy)]">{definition.title}</h2>
                  <p className="mt-2 max-w-2xl text-sm text-[var(--color-text-muted)]">{definition.description}</p>
                </div>
                <label className="flex items-center gap-3 text-sm font-semibold text-[var(--color-navy)]">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelection(definition.id)}
                    className="size-5 cursor-pointer accent-[var(--color-ocean)]"
                    aria-label={`Select ${definition.title}`}
                  />
                  Include
                </label>
              </div>
              <div className="bg-[var(--color-sand)]/40 p-6">{preview}</div>
              {definition.tags?.length ? (
                <div className="flex flex-wrap gap-2 border-t border-slate-200/70 bg-white px-6 py-4">
                  {definition.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--color-sand)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-navy)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <section className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-ocean)] bg-white/80 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-navy)]">
              Selected Components ({selectedItems.length})
            </h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              Use the checkboxes to curate your shortlist. Copy the summary to share with your team or drop into a
              planning doc.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button type="button" variant="secondary" onClick={() => setSelectedIds([])}>
              Clear Selection
            </Button>
            <Button type="button" onClick={handleCopySelection} className="min-w-[10rem]" disabled={!selectionText}>
              {copyState === "copied" ? "Copied!" : copyState === "error" ? "Copy Failed" : "Copy Summary"}
            </Button>
          </div>
        </div>

        {selectedItems.length ? (
          <div className="mt-4 space-y-4">
            <ul className="list-inside list-decimal space-y-1 text-sm text-[var(--color-navy)]">
              {selectedItems.map((item) => (
                <li key={`selection-${item.definition.id}`}>
                  <span className="font-medium">{item.definition.title}</span>{" "}
                  <span className="text-[var(--color-text-muted)]">({item.definition.component})</span>
                </li>
              ))}
            </ul>
            <textarea
              readOnly
              value={selectionText}
              className="w-full rounded-md border border-slate-200 bg-[var(--color-background)] p-3 text-sm text-[var(--color-navy)]"
              rows={Math.min(6, Math.max(3, selectedItems.length + 1))}
              aria-label="Selected components summary"
            />
          </div>
        ) : (
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            No components selected yet. Pick your favorites above to build a tailored component list.
          </p>
        )}
      </section>
    </div>
  );
}

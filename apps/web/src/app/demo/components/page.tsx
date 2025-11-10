import path from "path";
import { promises as fs } from "fs";
import type { Metadata } from "next";
import type { ComponentDefinition, ComponentShowcaseItem } from "./types";
import { renderPreview } from "./render-preview";
import { ComponentGallery } from "./component-gallery";

export const metadata: Metadata = {
  title: "Component Demo Library",
  description:
    "Preview the Dolphin Blue Paradise marketing components, experiment with variants, and assemble a tailored component list.",
};

async function loadComponentDefinitions(): Promise<ComponentDefinition[]> {
  const repoRoot = path.join(process.cwd(), "..", "..");
  const sourcePath = path.join(repoRoot, "@site-components-list.md");

  try {
    const fileContents = await fs.readFile(sourcePath, "utf-8");
    const jsonBlockMatch = fileContents.match(/```json\s*([\s\S]*?)```/);

    if (!jsonBlockMatch) {
      console.warn("[components-demo] No JSON block found in @site-components-list.md");
      return [];
    }

    const parsed = JSON.parse(jsonBlockMatch[1]) as ComponentDefinition[];
    return parsed;
  } catch (error) {
    console.error("[components-demo] Failed to load component definitions:", error);
    return [];
  }
}

export default async function ComponentsDemoPage() {
  const definitions = await loadComponentDefinitions();

  const items: ComponentShowcaseItem[] = definitions.map((definition) => ({
    definition,
    preview: renderPreview(definition),
  }));

  return (
    <div className="bg-[var(--color-background)] pb-24">
      <header className="border-b border-slate-200/70 bg-white/60">
        <div className="container space-y-4 py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--color-gold)]">
            Internal Design System Demo
          </p>
          <h1 className="font-display text-4xl font-semibold text-[var(--color-navy)] md:text-5xl">
            Component Showcase & Selection
          </h1>
          <p className="max-w-3xl text-lg text-[var(--color-text-muted)]">
            Explore production-ready marketing components with live sample content. Toggle the elements you need for an
            upcoming page or campaign and copy the curated list to accelerate briefs, design reviews, or build tickets.
          </p>
        </div>
      </header>

      <section className="container pt-12">
        {items.length ? (
          <ComponentGallery items={items} />
        ) : (
          <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-ocean)] bg-white/70 p-8 text-center text-[var(--color-text-muted)] shadow-sm">
            No component definitions found. Update <code className="font-mono">@site-components-list.md</code> with a
            valid JSON block to power this demo.
          </div>
        )}
      </section>
    </div>
  );
}

import type { ReactNode } from "react";

export type ComponentDefinition = {
  id: string;
  title: string;
  component: string;
  description: string;
  tags?: string[];
  content?: Record<string, unknown>;
};

export type ComponentShowcaseItem = {
  definition: ComponentDefinition;
  preview: ReactNode;
};

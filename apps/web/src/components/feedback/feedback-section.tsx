"use client";

import clsx from "clsx";
import { PropsWithChildren } from "react";

import { useOptionalFeedbackContext } from "@/components/feedback/feedback-context";

type FeedbackSectionProps = PropsWithChildren<{
  id: string;
  label: string;
  className?: string;
}>;

export function FeedbackSection({ id, label, className, children }: FeedbackSectionProps) {
  const context = useOptionalFeedbackContext();

  if (!context) {
    return (
      <div data-feedback-id={id} data-feedback-label={label} className={className}>
        {children}
      </div>
    );
  }

  const { selectionMode, openCreateForm } = context;

  return (
    <div
      data-feedback-id={id}
      data-feedback-label={label}
      className={clsx(className, selectionMode && "relative group outline outline-1 outline-dashed outline-transparent hover:outline-blue-400/60")}
    >
      {selectionMode && (
        <button
          type="button"
          onClick={() => openCreateForm(id, label)}
          className="absolute right-3 top-3 z-10 hidden rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow group-hover:flex group-hover:items-center"
        >
          + Add comment
        </button>
      )}
      {children}
    </div>
  );
}

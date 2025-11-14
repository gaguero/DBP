"use client";

import clsx from "clsx";
import { PropsWithChildren, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { useOptionalFeedbackContext } from "@/components/feedback/feedback-context";

type FeedbackSectionProps = PropsWithChildren<{
  id: string;
  label: string;
  className?: string;
}>;

const HIGHLIGHT_CLASSES =
  "relative outline outline-2 outline-blue-500 ring-2 ring-blue-400/60 transition-all duration-200";

export function FeedbackSection(props: FeedbackSectionProps) {
  return (
    <Suspense fallback={<FeedbackSectionFallback {...props} />}>
      <FeedbackSectionContent {...props} />
    </Suspense>
  );
}

function FeedbackSectionContent({ id, label, className, children }: FeedbackSectionProps) {
  const context = useOptionalFeedbackContext();
  const searchParams = useSearchParams();
  const highlightTarget = searchParams?.get("highlight");
  const shouldHighlight = highlightTarget === id;

  if (!context) {
    return (
      <div
        data-feedback-id={id}
        data-feedback-label={label}
        className={clsx(className, shouldHighlight && HIGHLIGHT_CLASSES)}
      >
        {children}
      </div>
    );
  }

  const { selectionMode, openCreateForm } = context;

  return (
    <div
      data-feedback-id={id}
      data-feedback-label={label}
      className={clsx(
        className,
        selectionMode &&
          "relative group outline outline-1 outline-dashed outline-transparent hover:outline-blue-400/60",
        shouldHighlight && HIGHLIGHT_CLASSES,
      )}
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

function FeedbackSectionFallback({ id, label, className, children }: FeedbackSectionProps) {
  return (
    <div data-feedback-id={id} data-feedback-label={label} className={className}>
      {children}
    </div>
  );
}


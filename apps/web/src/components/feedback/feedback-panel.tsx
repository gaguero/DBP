"use client";

import clsx from "clsx";
import { useMemo } from "react";

import { useFeedbackContext } from "@/components/feedback/feedback-context";
import { FeedbackHistory } from "@/components/feedback/feedback-history";
import { PageComment } from "@/components/feedback/types";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

function groupByElement(comments: PageComment[]) {
  const groups = new Map<string, { label: string | null; comments: PageComment[] }>();
  comments.forEach((comment) => {
    const existing = groups.get(comment.elementId);
    if (existing) {
      existing.comments.push(comment);
    } else {
      groups.set(comment.elementId, {
        label: comment.elementLabel,
        comments: [comment],
      });
    }
  });
  return Array.from(groups.entries());
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function FeedbackPanel() {
  const { comments, isLoading, error, featureAvailable, openEditForm, openCreateForm, pageId } =
    useFeedbackContext();

  const groups = useMemo(() => groupByElement(comments), [comments]);

  if (!featureAvailable) {
    return null;
  }

  return (
    <aside className="mt-6 rounded-xl border border-blue-100 bg-white/90 shadow-lg">
      <div className="flex items-center justify-between border-b border-blue-100 bg-blue-50 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-blue-900">Stakeholder feedback · {pageId}</h2>
          <p className="text-xs text-blue-700">Work through comments together before launch.</p>
        </div>
        <button
          type="button"
          onClick={() => openCreateForm(`${pageId}-general`, "General notes")}
          className="rounded bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700"
        >
          + Quick comment
        </button>
      </div>

      <div className="max-h-[28rem] space-y-4 overflow-y-auto p-4 text-sm">
        {isLoading && <p className="text-blue-700">Loading comments...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!isLoading && !error && groups.length === 0 && (
          <p className="text-blue-700">No comments yet. Enable selection mode and add the first note.</p>
        )}

        {groups.map(([elementId, group]) => (
          <div key={elementId} className="rounded-lg border border-blue-100 bg-blue-50/40 p-3">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-blue-900">
                  {group.label ?? elementId}
                </p>
                <p className="text-[11px] text-blue-600">{group.comments.length} comment(s)</p>
              </div>
              <button
                type="button"
                className="rounded bg-blue-100 px-2 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-200"
                onClick={() => openCreateForm(elementId, group.label ?? elementId)}
              >
                + Add
              </button>
            </div>

            <div className="space-y-3">
              {group.comments.map((comment) => (
                <div key={comment.id} className="rounded border border-blue-100 bg-white p-3 shadow-sm">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <strong className="text-blue-900">
                      {comment.firstName} {comment.lastName}
                    </strong>
                    <span className="text-[11px] text-blue-600">{formatDate(comment.updatedAt)}</span>
                    <span
                      className={clsx(
                        "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        STATUS_STYLES[comment.status] ?? STATUS_STYLES.pending,
                      )}
                    >
                      {comment.status.replace("_", " ")}
                    </span>
                  </div>

                  <p className="whitespace-pre-wrap text-blue-900">{comment.body}</p>
                  {comment.linkUrl && (
                    <p className="mt-2 text-xs text-blue-700">
                      Link:{" "}
                      <a className="underline" href={comment.linkUrl}>
                        {comment.linkUrl}
                      </a>
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                      onClick={() => openEditForm(comment)}
                    >
                      Edit
                    </button>
                  </div>

                  <FeedbackHistory revisions={comment.revisions} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

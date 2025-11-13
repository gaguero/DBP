"use client";

import { useMemo } from "react";

import { CommentRevision } from "@/components/feedback/types";

type FeedbackHistoryProps = {
  revisions: CommentRevision[];
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("es-PA", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function FeedbackHistory({ revisions }: FeedbackHistoryProps) {
  const formatted = useMemo(() => revisions ?? [], [revisions]);

  if (!formatted.length) {
    return null;
  }

  return (
    <details className="mt-3 rounded border border-blue-100 bg-blue-50/60 p-3 text-xs text-blue-900">
      <summary className="cursor-pointer font-semibold text-blue-700">
        Historial ({formatted.length})
      </summary>
      <div className="mt-2 space-y-3">
        {formatted.map((revision) => (
          <div key={revision.id} className="rounded bg-white/80 p-2 shadow-sm">
            <p className="font-semibold">
              {formatDate(revision.editedAt)} · {revision.editedByName ?? "Anon"}
            </p>
            {revision.previousStatus && (
              <p className="text-blue-700">Estado previo: {revision.previousStatus}</p>
            )}
            {revision.previousLinkUrl && (
              <p className="text-blue-700">
                Enlace previo: <a href={revision.previousLinkUrl}>{revision.previousLinkUrl}</a>
              </p>
            )}
            <p className="mt-1 whitespace-pre-wrap text-blue-900">{revision.previousBody}</p>
          </div>
        ))}
      </div>
    </details>
  );
}

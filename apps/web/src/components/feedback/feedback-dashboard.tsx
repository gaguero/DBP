"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";

import type { PageComment } from "@/components/feedback/types";

const PAGES = ["home", "dining", "rooms", "experiences", "sustainability", "stories"];

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In progress" },
  { value: "resolved", label: "Resolved" },
];

const PAGE_LABELS: Record<string, string> = {
  home: "Home",
  dining: "Dining",
  rooms: "Rooms",
  experiences: "Experiences",
  sustainability: "Sustainability",
  stories: "Stories",
};

const PAGE_PATHS: Record<string, string> = {
  home: "/",
  dining: "/dining",
  rooms: "/rooms",
  experiences: "/experiences",
  sustainability: "/sustainability",
  stories: "/stories",
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

type DashboardComment = PageComment & { pageId: string };

export function FeedbackDashboard() {
  const [selectedPage, setSelectedPage] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [allComments, setAllComments] = useState<DashboardComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const results = await Promise.all(
        PAGES.map(async (pageId) => {
          try {
            const response = await fetch(`/api/comments/${pageId}`);
            if (!response.ok) {
              return [];
            }
            const data = await response.json();
            return data.comments.map((comment: PageComment) => ({ ...comment, pageId }));
          } catch (error) {
            console.error(`Failed to fetch comments for ${pageId}`, error);
            return [];
          }
        }),
      );
      const flattened = results.flat();
      setAllComments(flattened);
      return flattened;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const filtered = useMemo(() => {
    let result = allComments;

    if (selectedPage !== "all") {
      result = result.filter((c) => c.pageId === selectedPage);
    }

    if (selectedStatus !== "all") {
      result = result.filter((c) => c.status === selectedStatus);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.body.toLowerCase().includes(query) ||
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(query) ||
          (c.elementLabel?.toLowerCase().includes(query) ?? false),
      );
    }

    return result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [allComments, selectedPage, selectedStatus, searchQuery]);

  useEffect(() => {
    if (filtered.length === 0) {
      setSelectedCommentId(null);
      return;
    }
    if (!selectedCommentId || !filtered.some((c) => c.id === selectedCommentId)) {
      setSelectedCommentId(filtered[0].id);
    }
  }, [filtered, selectedCommentId]);

  const selectedComment = filtered.find((c) => c.id === selectedCommentId) ?? null;
  const previewUrl = selectedComment
    ? `${PAGE_PATHS[selectedComment.pageId] ?? "/"}?highlight=${encodeURIComponent(selectedComment.elementId)}`
    : null;

  const stats = useMemo(() => {
    const pending = allComments.filter((c) => c.status === "pending").length;
    const inProgress = allComments.filter((c) => c.status === "in_progress").length;
    const resolved = allComments.filter((c) => c.status === "resolved").length;
    return { pending, inProgress, resolved, total: allComments.length };
  }, [allComments]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadComments();
    setIsRefreshing(false);
  };

  const handleOpenPage = () => {
    if (!selectedComment) return;
    const target = PAGE_PATHS[selectedComment.pageId] ?? "/";
    const url = `${target}?highlight=${encodeURIComponent(selectedComment.elementId)}`;
    window.open(url, "_blank");
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-lg">
        <p className="text-center text-blue-700">Loading comments...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-blue-900">Comments dashboard</h2>
            <p className="text-sm text-blue-700">Review every stakeholder note before launch.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              className="rounded border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              disabled={isRefreshing}
            >
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
            <button
              type="button"
              onClick={handleOpenPage}
              disabled={!selectedComment}
              className="rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              Open page
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <DashboardStat label="Pending" value={stats.pending} tone="yellow" />
          <DashboardStat label="In progress" value={stats.inProgress} tone="blue" />
          <DashboardStat label="Resolved" value={stats.resolved} tone="green" />
          <DashboardStat label="Total" value={stats.total} tone="gray" />
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <FilterControl label="Page">
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="w-full rounded border border-blue-200 px-3 py-2 text-sm"
            >
              <option value="all">All pages</option>
              {PAGES.map((page) => (
                <option key={page} value={page}>
                  {PAGE_LABELS[page] ?? page}
                </option>
              ))}
            </select>
          </FilterControl>

          <FilterControl label="Status">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded border border-blue-200 px-3 py-2 text-sm"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FilterControl>

          <FilterControl label="Search">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Names, sections, notes..."
              className="w-full rounded border border-blue-200 px-3 py-2 text-sm"
            />
          </FilterControl>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px,minmax(0,1fr)]">
        <div className="rounded-xl border border-blue-100 bg-white shadow-sm">
          <div className="border-b border-blue-100 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-800">
              Comments ({filtered.length})
            </p>
            <p className="text-xs text-blue-600">Select a card to preview the exact section.</p>
          </div>
          <div className="max-h-[70vh] space-y-3 overflow-y-auto p-4">
            {filtered.length === 0 ? (
              <p className="text-sm text-blue-700">No comments match the current filters.</p>
            ) : (
              filtered.map((comment) => {
                const isActive = comment.id === selectedCommentId;
                return (
                  <button
                    type="button"
                    key={`${comment.pageId}-${comment.id}`}
                    onClick={() => setSelectedCommentId(comment.id)}
                    className={`w-full rounded-lg border px-3 py-3 text-left ${
                      isActive
                        ? "border-blue-400 bg-blue-50 shadow"
                        : "border-blue-100 bg-white hover:border-blue-300 hover:bg-blue-50/60"
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-800">
                        {PAGE_LABELS[comment.pageId] ?? comment.pageId}
                      </span>
                      <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-700">
                        {comment.elementLabel ?? comment.elementId}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-blue-900">
                      {comment.firstName} {comment.lastName}
                    </p>
                    <p className="mt-1 line-clamp-3 text-sm text-gray-700">{comment.body}</p>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
                      <span>{formatDate(comment.updatedAt)}</span>
                      <StatusPill status={comment.status} />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
          {selectedComment ? (
            <>
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-blue-900">
                <span className="font-semibold">
                  Viewing: {PAGE_LABELS[selectedComment.pageId] ?? selectedComment.pageId}
                </span>
                <span className="text-blue-600">• {selectedComment.elementLabel ?? selectedComment.elementId}</span>
                <span className="text-blue-600">
                  • {selectedComment.firstName} {selectedComment.lastName}
                </span>
              </div>
              <div className="mb-4 rounded border border-blue-100 bg-blue-50/50 p-3 text-sm text-blue-800">
                <p className="font-semibold text-blue-900">Comment</p>
                <p className="whitespace-pre-wrap text-blue-900">{selectedComment.body}</p>
                {selectedComment.linkUrl && (
                  <p className="mt-2 text-xs">
                    Link:{" "}
                    <a href={selectedComment.linkUrl} className="underline" target="_blank" rel="noreferrer">
                      {selectedComment.linkUrl}
                    </a>
                  </p>
                )}
              </div>
              <div className="relative h-[70vh] min-h-[420px] overflow-hidden rounded-lg border border-blue-100 bg-slate-50">
                {previewUrl ? (
                  <iframe
                    key={previewUrl}
                    src={previewUrl}
                    title="Page preview"
                    className="h-full w-full border-0"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-blue-700">
                    Unable to load preview. Try selecting another comment.
                  </div>
                )}
                <div className="pointer-events-none absolute inset-4 rounded border border-dashed border-blue-200"></div>
              </div>
            </>
          ) : (
            <div className="flex h-[70vh] min-h-[420px] flex-col items-center justify-center rounded border border-blue-100 bg-slate-50 text-center text-blue-700">
              <p className="text-lg font-semibold">No comment selected</p>
              <p className="text-sm">Choose a card on the left to preview the referenced section.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "yellow" | "blue" | "green" | "gray";
}) {
  const toneMap = {
    yellow: "border-yellow-200 bg-yellow-50 text-yellow-800",
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    green: "border-green-200 bg-green-50 text-green-800",
    gray: "border-gray-200 bg-gray-50 text-gray-800",
  };
  return (
    <div className={`rounded-lg border p-3 ${toneMap[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-inherit">{value}</p>
    </div>
  );
}

function FilterControl({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex-1 min-w-[200px]">
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-blue-800">{label}</label>
      {children}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-700",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${map[status] ?? map.pending}`}>
      {status.replace("_", " ")}
    </span>
  );
}


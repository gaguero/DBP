"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";

import { FeedbackHistory } from "@/components/feedback/feedback-history";
import { FEEDBACK_PROFILE_STORAGE_KEY } from "@/components/feedback/feedback-context";
import type { PageComment } from "@/components/feedback/types";

const PAGES = ["home", "dining", "rooms", "experiences", "sustainability", "stories"];

const COMMENT_STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In progress" },
  { value: "resolved", label: "Resolved" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_FILTER_OPTIONS = [{ value: "all", label: "All" }, ...COMMENT_STATUS_OPTIONS];

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
type FeedbackProfile = { firstName: string; lastName: string };

export function FeedbackDashboard() {
  const [selectedPage, setSelectedPage] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [allComments, setAllComments] = useState<DashboardComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [profile, setProfile] = useState<FeedbackProfile | null>(null);
  const [profileReady, setProfileReady] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profilePromptAcknowledged, setProfilePromptAcknowledged] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusForm, setStatusForm] = useState({ status: "pending", note: "" });
  const [statusError, setStatusError] = useState<string | null>(null);
  const [isStatusSubmitting, setIsStatusSubmitting] = useState(false);

  function persistProfile(value: FeedbackProfile) {
    setProfile(value);
    if (typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.setItem(FEEDBACK_PROFILE_STORAGE_KEY, JSON.stringify(value));
    } catch (error) {
      console.warn("Unable to persist feedback identity", error);
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const stored = window.localStorage.getItem(FEEDBACK_PROFILE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as FeedbackProfile;
        if (parsed.firstName && parsed.lastName) {
          setProfile(parsed);
        }
      }
    } catch (error) {
      console.warn("Unable to read stored feedback identity", error);
    } finally {
      setProfileReady(true);
    }
  }, []);

  useEffect(() => {
    if (profileReady && !profile && !profilePromptAcknowledged) {
      setProfileModalOpen(true);
    }
  }, [profileReady, profile, profilePromptAcknowledged]);

  useEffect(() => {
    setStatusError(null);
  }, [statusForm.status, statusForm.note]);

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

  const handleOpenStatusModal = () => {
    if (!selectedComment) {
      return;
    }
    setStatusForm({ status: selectedComment.status, note: "" });
    setStatusError(null);
    setStatusModalOpen(true);
  };

  const handleStatusSubmit = async () => {
    if (!selectedComment) {
      return;
    }
    if (!profile) {
      setProfileModalOpen(true);
      setStatusModalOpen(false);
      return;
    }
    if (statusForm.status === selectedComment.status) {
      setStatusError("Select a different status before saving.");
      return;
    }
    if (!statusForm.note.trim()) {
      setStatusError("Add a short note to explain the change.");
      return;
    }

    setIsStatusSubmitting(true);
    setStatusError(null);

    try {
      const response = await fetch(`/api/comments/${selectedComment.pageId}/${selectedComment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: statusForm.status,
          statusNote: statusForm.note.trim(),
          editorFirstName: profile.firstName,
          editorLastName: profile.lastName,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.comment) {
        setStatusError(payload?.message ?? "We could not update the status. Try again.");
        return;
      }

      const normalized: DashboardComment = { ...payload.comment, pageId: payload.comment.pageId };
      setAllComments((prev) => prev.map((item) => (item.id === normalized.id ? normalized : item)));
      setSelectedCommentId(normalized.id);
      setStatusModalOpen(false);
      setStatusForm({ status: normalized.status, note: "" });
    } catch (error) {
      console.error("Failed to update status", error);
      setStatusError("We could not update the status. Try again.");
    } finally {
      setIsStatusSubmitting(false);
    }
  };

  const handleProfileSave = (value: FeedbackProfile) => {
    persistProfile(value);
    setProfilePromptAcknowledged(true);
    setProfileModalOpen(false);
  };

  const stats = useMemo(() => {
    const pending = allComments.filter((c) => c.status === "pending").length;
    const inProgress = allComments.filter((c) => c.status === "in_progress").length;
    const resolved = allComments.filter((c) => c.status === "resolved").length;
    const rejected = allComments.filter((c) => c.status === "rejected").length;
    return { pending, inProgress, resolved, rejected, total: allComments.length };
  }, [allComments]);

  const profileLabel = profile ? `${profile.firstName} ${profile.lastName}` : "Add identity";

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

  if (isLoading && allComments.length === 0) {
    return (
      <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-lg">
        <p className="text-center text-blue-700">Loading comments...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-blue-100 bg-white shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-50 px-6 py-4">
          <div>
            <h2 className="text-2xl font-semibold text-blue-900">Comments dashboard</h2>
            <p className="text-sm text-blue-700">Review every stakeholder note before launch.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setProfileModalOpen(true)}
              className="rounded border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              {profile ? `👤 ${profileLabel}` : "Set identity"}
            </button>
            <button
              type="button"
              onClick={handleRefresh}
              className="rounded border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
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

        <div className="flex flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-wrap gap-4">
            <FilterControl label="Page" className="min-w-[200px] flex-1">
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

            <FilterControl label="Status" className="min-w-[200px] flex-1">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full rounded border border-blue-200 px-3 py-2 text-sm"
              >
                {STATUS_FILTER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FilterControl>

            <FilterControl label="Search" className="min-w-[200px] flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Names, sections, notes..."
                className="w-full rounded border border-blue-200 px-3 py-2 text-sm"
              />
            </FilterControl>
          </div>
          <p className="text-xs text-blue-600">Showing {filtered.length} comment(s)</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(260px,320px),minmax(0,1fr)] lg:min-h-[65vh]">
        <aside className="flex h-full flex-col rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <DashboardStat label="Pending" value={stats.pending} tone="yellow" />
            <DashboardStat label="In progress" value={stats.inProgress} tone="blue" />
            <DashboardStat label="Resolved" value={stats.resolved} tone="green" />
            <DashboardStat label="Rejected" value={stats.rejected} tone="red" />
            <DashboardStat label="Total" value={stats.total} tone="gray" />
          </div>

          <div className="mt-4 border-t border-blue-100 pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-800">
              Comments ({filtered.length})
            </p>
            <p className="text-xs text-blue-600">Select a card to preview the exact section.</p>
          </div>

          <div className="mt-3 flex-1 min-h-0 space-y-3 overflow-y-auto pr-1">
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
                    <div className="mb-2 flex items-center justify-between gap-2 text-[11px]">
                      <span className="rounded bg-blue-100 px-2 py-0.5 font-semibold text-blue-800">
                        {PAGE_LABELS[comment.pageId] ?? comment.pageId}
                      </span>
                      <StatusPill status={comment.status} />
                    </div>
                    <p className="text-xs font-semibold uppercase text-blue-800">
                      {comment.elementLabel ?? comment.elementId}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-blue-900">
                      {comment.firstName} {comment.lastName}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-gray-700">{comment.body}</p>
                    <p className="mt-2 text-[11px] text-gray-500">{formatDate(comment.updatedAt)}</p>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        <section className="flex h-full flex-col rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
          {selectedComment ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-100 pb-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-800">
                    {PAGE_LABELS[selectedComment.pageId] ?? selectedComment.pageId}
                  </p>
                  <p className="text-lg font-semibold text-blue-900">
                    {selectedComment.elementLabel ?? selectedComment.elementId}
                  </p>
                  <p className="text-sm text-blue-700">
                    {selectedComment.firstName} {selectedComment.lastName} · {formatDate(selectedComment.updatedAt)}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill status={selectedComment.status} />
                  <button
                    type="button"
                    onClick={handleOpenStatusModal}
                    className="rounded border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                  >
                    Update status
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-1 flex-col gap-4 overflow-hidden">
                <div className="rounded border border-blue-100 bg-blue-50/60 p-4 text-sm text-blue-900">
                  <p className="mb-2 font-semibold text-blue-900">Comment</p>
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

                <FeedbackHistory revisions={selectedComment.revisions} />

                <div className="flex-1">
                  <div className="relative h-full min-h-[420px] overflow-hidden rounded-lg border border-blue-100 bg-slate-50">
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
                    <div className="pointer-events-none absolute inset-4 rounded border border-dashed border-blue-200" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded border border-blue-100 bg-slate-50 text-center text-blue-700">
              <p className="text-lg font-semibold">No comment selected</p>
              <p className="text-sm">Choose a card on the left to preview the referenced section.</p>
            </div>
          )}
        </section>
      </section>

      {statusModalOpen && selectedComment && (
        <StatusUpdateModal
          open={statusModalOpen}
          comment={selectedComment}
          status={statusForm.status}
          note={statusForm.note}
          onStatusChange={(value) => setStatusForm((prev) => ({ ...prev, status: value }))}
          onNoteChange={(value) => setStatusForm((prev) => ({ ...prev, note: value }))}
          onClose={() => {
            setStatusModalOpen(false);
            setStatusError(null);
          }}
          onSubmit={handleStatusSubmit}
          isSubmitting={isStatusSubmitting}
          error={statusError}
        />
      )}

      {profileModalOpen && (
        <ProfileModal
          open={profileModalOpen}
          initialValue={profile}
          onSave={handleProfileSave}
          onClose={() => {
            setProfilePromptAcknowledged(true);
            setProfileModalOpen(false);
          }}
        />
      )}
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
  tone: "yellow" | "blue" | "green" | "gray" | "red";
}) {
  const toneMap = {
    yellow: "border-yellow-200 bg-yellow-50 text-yellow-800",
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    green: "border-green-200 bg-green-50 text-green-800",
    gray: "border-gray-200 bg-gray-50 text-gray-800",
    red: "border-red-200 bg-red-50 text-red-700",
  };
  return (
    <div className={`rounded-lg border p-3 ${toneMap[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-inherit">{value}</p>
    </div>
  );
}

function FilterControl({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  const containerClass = ["min-w-[200px]", "flex-1", className].filter(Boolean).join(" ");
  return (
    <div className={containerClass}>
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
    rejected: "bg-red-100 text-red-700",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${map[status] ?? map.pending}`}>
      {status.replace("_", " ")}
    </span>
  );
}

type StatusUpdateModalProps = {
  open: boolean;
  comment: DashboardComment;
  status: string;
  note: string;
  onStatusChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => Promise<void> | void;
  isSubmitting: boolean;
  error: string | null;
};

function StatusUpdateModal({
  open,
  comment,
  status,
  note,
  onStatusChange,
  onNoteChange,
  onClose,
  onSubmit,
  isSubmitting,
  error,
}: StatusUpdateModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 space-y-1">
          <h3 className="text-lg font-semibold text-blue-900">Update status</h3>
          <p className="text-sm text-blue-700">
            {PAGE_LABELS[comment.pageId] ?? comment.pageId} · {comment.elementLabel ?? comment.elementId}
          </p>
        </div>

        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await onSubmit();
          }}
          className="space-y-4 text-sm"
        >
          <div>
            <label className="mb-1 block text-xs font-semibold text-blue-800">New status</label>
            <select
              value={status}
              onChange={(event) => onStatusChange(event.target.value)}
              className="w-full rounded border border-blue-200 px-3 py-2"
            >
              {COMMENT_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-blue-800">Status note</label>
            <textarea
              value={note}
              onChange={(event) => onNoteChange(event.target.value)}
              className="w-full rounded border border-blue-200 px-3 py-2"
              rows={4}
              placeholder="Explain why the status is changing"
            />
            <p className="mt-1 text-[11px] text-blue-600">Required when switching to a different status.</p>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-4 py-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save status"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type ProfileModalProps = {
  open: boolean;
  initialValue: FeedbackProfile | null;
  onSave: (value: FeedbackProfile) => void;
  onClose: () => void;
};

function ProfileModal({ open, initialValue, onSave, onClose }: ProfileModalProps) {
  const [firstName, setFirstName] = useState(initialValue?.firstName ?? "");
  const [lastName, setLastName] = useState(initialValue?.lastName ?? "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setFirstName(initialValue?.firstName ?? "");
      setLastName(initialValue?.lastName ?? "");
      setError(null);
    }
  }, [open, initialValue]);

  if (!open) return null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    if (!trimmedFirst || !trimmedLast) {
      setError("Please share your first and last name to continue.");
      return;
    }
    onSave({ firstName: trimmedFirst, lastName: trimmedLast });
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 space-y-2">
          <h3 className="text-xl font-semibold text-blue-900">Stakeholder workspace identity</h3>
          <p className="text-sm text-blue-700">
            Add your name so every status update and edit is properly attributed in the history.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="space-y-1 text-sm font-semibold text-blue-800">
              First name
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="w-full rounded border border-blue-200 px-3 py-2"
                placeholder="Jane"
              />
            </label>
            <label className="space-y-1 text-sm font-semibold text-blue-800">
              Last name
              <input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="w-full rounded border border-blue-200 px-3 py-2"
                placeholder="Doe"
              />
            </label>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-4 py-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              Maybe later
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Save name
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


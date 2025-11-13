"use client";

import { useMemo, useState, useEffect } from "react";

import { PageComment } from "@/components/feedback/types";

const PAGES = ["home", "dining", "rooms", "experiences", "sustainability", "stories"];

const STATUS_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "pending", label: "Pendiente" },
  { value: "in_progress", label: "En progreso" },
  { value: "resolved", label: "Resuelto" },
];

function formatDate(value: string) {
  return new Date(value).toLocaleString("es-PA", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function FeedbackDashboard() {
  const [selectedPage, setSelectedPage] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [allComments, setAllComments] = useState<Array<PageComment & { pageId: string }>>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAllComments() {
      setIsLoading(true);
      const comments: Array<PageComment & { pageId: string }> = [];

      for (const pageId of PAGES) {
        try {
          const response = await fetch(`/api/comments/${pageId}`);
          if (response.ok) {
            const data = await response.json();
            data.comments.forEach((comment: PageComment) => {
              comments.push({ ...comment, pageId });
            });
          }
        } catch (error) {
          console.error(`Failed to fetch comments for ${pageId}`, error);
        }
      }

      setAllComments(comments);
      setIsLoading(false);
    }

    fetchAllComments();
  }, []);

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

  const stats = useMemo(() => {
    const pending = allComments.filter((c) => c.status === "pending").length;
    const inProgress = allComments.filter((c) => c.status === "in_progress").length;
    const resolved = allComments.filter((c) => c.status === "resolved").length;
    return { pending, inProgress, resolved, total: allComments.length };
  }, [allComments]);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-lg">
        <p className="text-center text-blue-700">Cargando comentarios...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-blue-900">Dashboard de Comentarios</h2>

        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <p className="text-xs font-semibold text-yellow-800">Pendientes</p>
            <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <p className="text-xs font-semibold text-blue-800">En progreso</p>
            <p className="text-2xl font-bold text-blue-900">{stats.inProgress}</p>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
            <p className="text-xs font-semibold text-green-800">Resueltos</p>
            <p className="text-2xl font-bold text-green-900">{stats.resolved}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <p className="text-xs font-semibold text-gray-800">Total</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="mb-1 block text-xs font-semibold text-blue-800">Página</label>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="w-full rounded border border-blue-200 px-3 py-2 text-sm"
            >
              <option value="all">Todas las páginas</option>
              {PAGES.map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="mb-1 block text-xs font-semibold text-blue-800">Estado</label>
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
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="mb-1 block text-xs font-semibold text-blue-800">Buscar</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en comentarios..."
              className="w-full rounded border border-blue-200 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-6 text-center text-blue-700">
            No hay comentarios que coincidan con los filtros seleccionados.
          </div>
        ) : (
          filtered.map((comment) => (
            <div
              key={`${comment.pageId}-${comment.id}`}
              className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                  {comment.pageId}
                </span>
                <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                  {comment.elementLabel ?? comment.elementId}
                </span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    comment.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : comment.status === "in_progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {comment.status.replace("_", " ")}
                </span>
                <span className="ml-auto text-xs text-gray-600">{formatDate(comment.updatedAt)}</span>
              </div>

              <p className="mb-2 font-semibold text-blue-900">
                {comment.firstName} {comment.lastName}
              </p>
              <p className="mb-2 whitespace-pre-wrap text-sm text-gray-700">{comment.body}</p>
              {comment.linkUrl && (
                <p className="mb-2 text-xs text-blue-700">
                  Enlace: <a href={comment.linkUrl} className="underline">{comment.linkUrl}</a>
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}


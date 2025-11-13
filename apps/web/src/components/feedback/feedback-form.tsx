"use client";

import { useEffect, useMemo, useState } from "react";

import { useFeedbackContext } from "@/components/feedback/feedback-context";
import { PageComment, UpdateCommentInput } from "@/components/feedback/types";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pendiente" },
  { value: "in_progress", label: "En progreso" },
  { value: "resolved", label: "Resuelto" },
];

type FormState = {
  firstName: string;
  lastName: string;
  comment: string;
  linkUrl: string;
  status: string;
  elementLabel: string;
  editorFirstName: string;
  editorLastName: string;
};

function buildInitialState(activeForm: ReturnType<typeof useFeedbackContext>["activeForm"]): FormState {
  if (!activeForm) {
    return {
      firstName: "",
      lastName: "",
      comment: "",
      linkUrl: "",
      status: "pending",
      elementLabel: "",
      editorFirstName: "",
      editorLastName: "",
    };
  }

  if (activeForm.mode === "edit") {
    const comment = activeForm.comment;
    return {
      firstName: comment.firstName,
      lastName: comment.lastName,
      comment: comment.body,
      linkUrl: comment.linkUrl ?? "",
      status: comment.status,
      elementLabel: comment.elementLabel ?? "",
      editorFirstName: "",
      editorLastName: "",
    };
  }

  return {
    firstName: "",
    lastName: "",
    comment: "",
    linkUrl: "",
    status: "pending",
    elementLabel: activeForm.elementLabel ?? "",
    editorFirstName: "",
    editorLastName: "",
  };
}

export function FeedbackForm() {
  const { activeForm, closeForm, createComment, updateComment } = useFeedbackContext();
  const [state, setState] = useState<FormState>(() => buildInitialState(activeForm));
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setState(buildInitialState(activeForm));
    setError(null);
    setSubmitting(false);
  }, [activeForm]);

  const title = useMemo(() => {
    if (!activeForm) return null;
    return activeForm.mode === "create" ? "Nuevo comentario" : "Editar comentario";
  }, [activeForm]);

  if (!activeForm) {
    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!activeForm) {
      setError("No hay formulario activo");
      setSubmitting(false);
      return;
    }

    try {
      if (activeForm.mode === "create") {
        if (!state.firstName.trim() || !state.lastName.trim() || !state.comment.trim()) {
          setError("Nombre, apellido y comentario son obligatorios");
          setSubmitting(false);
          return;
        }

        await createComment({
          elementId: activeForm.elementId,
          elementLabel: state.elementLabel || activeForm.elementLabel || null,
          firstName: state.firstName.trim(),
          lastName: state.lastName.trim(),
          body: state.comment.trim(),
          linkUrl: state.linkUrl.trim() ? state.linkUrl.trim() : null,
        });
      } else {
        const comment = activeForm.comment;
        if (!state.comment.trim()) {
          setError("El comentario no puede estar vacío");
          setSubmitting(false);
          return;
        }

        const payload: UpdateCommentInput = { commentId: comment.id };
        let hasChanges = false;

        if (state.firstName.trim() && state.firstName.trim() !== comment.firstName) {
          payload.firstName = state.firstName.trim();
          hasChanges = true;
        }
        if (state.lastName.trim() && state.lastName.trim() !== comment.lastName) {
          payload.lastName = state.lastName.trim();
          hasChanges = true;
        }
        if (state.comment.trim() !== comment.body) {
          payload.body = state.comment.trim();
          hasChanges = true;
        }
        if (state.linkUrl.trim() !== (comment.linkUrl ?? "")) {
          payload.linkUrl = state.linkUrl.trim() ? state.linkUrl.trim() : null;
          hasChanges = true;
        }
        if (state.elementLabel.trim() !== (comment.elementLabel ?? "")) {
          payload.elementLabel = state.elementLabel.trim() || null;
          hasChanges = true;
        }
        if (state.status !== comment.status) {
          payload.status = state.status as UpdateCommentInput["status"];
          hasChanges = true;
        }

        if (!hasChanges) {
          setError("Realiza al menos un cambio antes de guardar");
          setSubmitting(false);
          return;
        }

        payload.editorFirstName = state.editorFirstName.trim() || undefined;
        payload.editorLastName = state.editorLastName.trim() || undefined;

        if (!payload.editorFirstName || !payload.editorLastName) {
          setError("Indica nombre y apellido de quien edita");
          setSubmitting(false);
          return;
        }

        await updateComment(payload);
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Error guardando comentario");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">{title}</h3>
            <p className="text-xs text-blue-700">
              {activeForm.mode === "create"
                ? "Completa los detalles para registrar el feedback del stakeholder."
                : "Actualiza el comentario y deja constancia de los cambios."}
            </p>
          </div>
          <button
            type="button"
            onClick={closeForm}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
            disabled={isSubmitting}
          >
            Cerrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-blue-800">Nombre *</label>
              <input
                type="text"
                value={state.firstName}
                onChange={(event) => setState((prev) => ({ ...prev, firstName: event.target.value }))}
                className="w-full rounded border border-blue-200 px-3 py-2"
                placeholder="Nombre del autor" 
                required={activeForm.mode === "create"}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-blue-800">Apellido *</label>
              <input
                type="text"
                value={state.lastName}
                onChange={(event) => setState((prev) => ({ ...prev, lastName: event.target.value }))}
                className="w-full rounded border border-blue-200 px-3 py-2"
                placeholder="Apellido del autor"
                required={activeForm.mode === "create"}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-blue-800">Comentario *</label>
            <textarea
              value={state.comment}
              onChange={(event) => setState((prev) => ({ ...prev, comment: event.target.value }))}
              className="w-full rounded border border-blue-200 px-3 py-2"
              rows={5}
              required
              placeholder="Describe el feedback"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-blue-800">Enlace (opcional)</label>
            <input
              type="url"
              value={state.linkUrl}
              onChange={(event) => setState((prev) => ({ ...prev, linkUrl: event.target.value }))}
              className="w-full rounded border border-blue-200 px-3 py-2"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-blue-800">Etiqueta visible</label>
            <input
              type="text"
              value={state.elementLabel}
              onChange={(event) => setState((prev) => ({ ...prev, elementLabel: event.target.value }))}
              className="w-full rounded border border-blue-200 px-3 py-2"
              placeholder="Ej. Sección Hero"
            />
          </div>

          {activeForm.mode === "edit" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-blue-800">Estado</label>
                <select
                  value={state.status}
                  onChange={(event) => setState((prev) => ({ ...prev, status: event.target.value }))}
                  className="w-full rounded border border-blue-200 px-3 py-2"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-blue-800">
                  Quién edita (nombre y apellido)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={state.editorFirstName}
                    onChange={(event) =>
                      setState((prev) => ({ ...prev, editorFirstName: event.target.value }))
                    }
                    className="w-full rounded border border-blue-200 px-2 py-2"
                    placeholder="Nombre"
                  />
                  <input
                    type="text"
                    value={state.editorLastName}
                    onChange={(event) =>
                      setState((prev) => ({ ...prev, editorLastName: event.target.value }))
                    }
                    className="w-full rounded border border-blue-200 px-2 py-2"
                    placeholder="Apellido"
                  />
                </div>
              </div>
            </div>
          )}

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="rounded px-4 py-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
              onClick={closeForm}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : activeForm.mode === "create" ? "Guardar comentario" : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

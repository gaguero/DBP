"use client";

import { useEffect, useMemo, useState } from "react";

import { useFeedbackContext } from "@/components/feedback/feedback-context";
import { UpdateCommentInput } from "@/components/feedback/types";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In progress" },
  { value: "resolved", label: "Resolved" },
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

function buildInitialState(
  activeForm: ReturnType<typeof useFeedbackContext>["activeForm"],
  userProfile: ReturnType<typeof useFeedbackContext>["userProfile"],
): FormState {
  const profileFirstName = userProfile?.firstName ?? "";
  const profileLastName = userProfile?.lastName ?? "";

  if (!activeForm) {
    return {
      firstName: profileFirstName,
      lastName: profileLastName,
      comment: "",
      linkUrl: "",
      status: "pending",
      elementLabel: "",
      editorFirstName: profileFirstName,
      editorLastName: profileLastName,
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
      editorFirstName: profileFirstName,
      editorLastName: profileLastName,
    };
  }

  return {
    firstName: profileFirstName,
    lastName: profileLastName,
    comment: "",
    linkUrl: "",
    status: "pending",
    elementLabel: activeForm.elementLabel ?? "",
    editorFirstName: profileFirstName,
    editorLastName: profileLastName,
  };
}

export function FeedbackForm() {
  const { activeForm, closeForm, createComment, updateComment, userProfile } = useFeedbackContext();
  const [state, setState] = useState<FormState>(() => buildInitialState(activeForm, userProfile));
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setState(buildInitialState(activeForm, userProfile));
    setError(null);
    setSubmitting(false);
  }, [activeForm, userProfile]);

  const title = useMemo(() => {
    if (!activeForm) return null;
    return activeForm.mode === "create" ? "New comment" : "Edit comment";
  }, [activeForm]);

  if (!activeForm) {
    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (activeForm.mode === "create") {
        if (!state.firstName.trim() || !state.lastName.trim() || !state.comment.trim()) {
          setError("First name, last name, and comment are required.");
          setSubmitting(false);
          return;
        }

        const trimmedLink = state.linkUrl.trim();

        await createComment({
          elementId: activeForm.elementId,
          elementLabel: state.elementLabel || activeForm.elementLabel || null,
          firstName: state.firstName.trim(),
          lastName: state.lastName.trim(),
          body: state.comment.trim(),
          linkUrl: trimmedLink ? trimmedLink : null,
        });
      } else {
        const comment = activeForm.comment;
        if (!state.comment.trim()) {
          setError("The comment cannot be empty.");
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
        const trimmedLink = state.linkUrl.trim();
        if (trimmedLink !== (comment.linkUrl ?? "")) {
          payload.linkUrl = trimmedLink ? trimmedLink : null;
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
          setError("Make at least one change before saving.");
          setSubmitting(false);
          return;
        }

        payload.editorFirstName = state.editorFirstName.trim() || undefined;
        payload.editorLastName = state.editorLastName.trim() || undefined;

        if (!payload.editorFirstName || !payload.editorLastName) {
          setError("Share who edited the comment (first and last name).");
          setSubmitting(false);
          return;
        }

        await updateComment(payload);
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "We could not save the comment. Please try again.");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="space-y-1 text-xs text-blue-700">
            <h3 className="text-lg font-semibold text-blue-900">{title}</h3>
            <p>
              {activeForm.mode === "create"
                ? "Capture the stakeholder feedback linked to the selected element."
                : "Update the comment and keep the revision summary complete."}
            </p>
          </div>
          <button
            type="button"
            onClick={closeForm}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
            disabled={isSubmitting}
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-blue-800">First name *</label>
              <input
                type="text"
                value={state.firstName}
                onChange={(event) => setState((prev) => ({ ...prev, firstName: event.target.value }))}
                className="w-full rounded border border-blue-200 px-3 py-2"
                placeholder="Author first name"
                required={activeForm.mode === "create"}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-blue-800">Last name *</label>
              <input
                type="text"
                value={state.lastName}
                onChange={(event) => setState((prev) => ({ ...prev, lastName: event.target.value }))}
                className="w-full rounded border border-blue-200 px-3 py-2"
                placeholder="Author last name"
                required={activeForm.mode === "create"}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-blue-800">Comment *</label>
            <textarea
              value={state.comment}
              onChange={(event) => setState((prev) => ({ ...prev, comment: event.target.value }))}
              className="w-full rounded border border-blue-200 px-3 py-2"
              rows={5}
              required
              placeholder="Share the feedback or requested change"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-blue-800">Link (optional)</label>
            <input
              type="url"
              value={state.linkUrl}
              onChange={(event) => setState((prev) => ({ ...prev, linkUrl: event.target.value }))}
              className="w-full rounded border border-blue-200 px-3 py-2"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-blue-800">Visible label</label>
            <input
              type="text"
              value={state.elementLabel}
              onChange={(event) => setState((prev) => ({ ...prev, elementLabel: event.target.value }))}
              className="w-full rounded border border-blue-200 px-3 py-2"
              placeholder="e.g. Hero section"
            />
          </div>

          {activeForm.mode === "edit" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-blue-800">Status</label>
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
                  Who is editing (first & last name)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={state.editorFirstName}
                    onChange={(event) =>
                      setState((prev) => ({ ...prev, editorFirstName: event.target.value }))
                    }
                    className="w-full rounded border border-blue-200 px-2 py-2"
                    placeholder="First name"
                  />
                  <input
                    type="text"
                    value={state.editorLastName}
                    onChange={(event) =>
                      setState((prev) => ({ ...prev, editorLastName: event.target.value }))
                    }
                    className="w-full rounded border border-blue-200 px-2 py-2"
                    placeholder="Last name"
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
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : activeForm.mode === "create" ? "Save comment" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

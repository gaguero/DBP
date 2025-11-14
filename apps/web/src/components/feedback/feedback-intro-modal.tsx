"use client";

import { useEffect, useMemo, useState } from "react";

import { useFeedbackContext } from "@/components/feedback/feedback-context";

export function FeedbackIntroModal() {
  const { userProfile, profileReady, saveUserProfile, featureAvailable } = useFeedbackContext();
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const heading = useMemo(() => "Stakeholder Feedback Workspace", []);

  useEffect(() => {
    if (!featureAvailable) {
      setOpen(false);
      return;
    }
    if (!profileReady) {
      return;
    }
    if (!userProfile) {
      setOpen(true);
      setFirstName("");
      setLastName("");
    } else {
      setOpen(false);
    }
  }, [featureAvailable, profileReady, userProfile]);

  if (!open) {
    return null;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    if (!trimmedFirst || !trimmedLast) {
      setError("Please share both your first name and last name to continue.");
      return;
    }
    saveUserProfile({ firstName: trimmedFirst, lastName: trimmedLast });
    setOpen(false);
  }

  function handleSkip() {
    setOpen(false);
    setError(null);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 space-y-2">
          <h2 className="text-xl font-semibold text-blue-900">{heading}</h2>
          <p className="text-sm text-blue-800">
            This development-only layer lets every reviewer tag on-page elements, leave shared comments, and keep a
            visible history of edits. Emails will notify stakeholders whenever a comment is created or updated.
          </p>
          <p className="text-sm text-blue-800">
            Please introduce yourself so we can attribute your feedback clearly. You can change these details later
            inside any comment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="space-y-1 text-sm font-medium text-blue-800">
              First name
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="w-full rounded border border-blue-200 px-3 py-2 text-sm"
                placeholder="Jane"
                autoFocus
              />
            </label>
            <label className="space-y-1 text-sm font-medium text-blue-800">
              Last name
              <input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="w-full rounded border border-blue-200 px-3 py-2 text-sm"
                placeholder="Doe"
              />
            </label>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex flex-wrap justify-end gap-3 text-sm">
            <button
              type="button"
              onClick={handleSkip}
              className="rounded px-4 py-2 font-semibold text-blue-700 hover:text-blue-900"
            >
              I will add this later
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Save and continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


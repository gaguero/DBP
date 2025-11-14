"use client";

import clsx from "clsx";

import { useFeedbackContext } from "@/components/feedback/feedback-context";

export function FeedbackToggle() {
  const { selectionMode, setSelectionMode, featureAvailable } = useFeedbackContext();

  if (!featureAvailable) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => setSelectionMode(!selectionMode)}
      className={clsx(
        "fixed bottom-6 right-6 z-50 rounded-full px-4 py-3 text-sm font-semibold shadow-lg transition",
        selectionMode ? "bg-blue-700 text-white" : "bg-white text-blue-700",
      )}
    >
      {selectionMode ? "Exit selection mode" : "Feedback mode"}
    </button>
  );
}

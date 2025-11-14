"use client";

import { FeedbackProvider } from "@/components/feedback/feedback-context";
import { FeedbackForm } from "@/components/feedback/feedback-form";
import { FeedbackIntroModal } from "@/components/feedback/feedback-intro-modal";
import { FeedbackPanel } from "@/components/feedback/feedback-panel";
import { FeedbackToggle } from "@/components/feedback/feedback-toggle";

export function FeedbackRoot({ pageId, children }: { pageId: string; children: React.ReactNode }) {
  return (
    <FeedbackProvider pageId={pageId}>
      <FeedbackIntroModal />
      {children}
      <div className="mx-auto mt-6 max-w-5xl">
        <FeedbackPanel />
      </div>
      <FeedbackForm />
      <FeedbackToggle />
    </FeedbackProvider>
  );
}

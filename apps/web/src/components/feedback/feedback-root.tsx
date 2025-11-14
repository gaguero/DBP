"use client";

import { FeedbackProvider } from "@/components/feedback/feedback-context";
import { FeedbackForm } from "@/components/feedback/feedback-form";
import { FeedbackIntroModal } from "@/components/feedback/feedback-intro-modal";
import { FeedbackToggle } from "@/components/feedback/feedback-toggle";

export function FeedbackRoot({
  pageId,
  children,
}: {
  pageId: string;
  children: React.ReactNode;
}) {
  return (
    <FeedbackProvider pageId={pageId}>
      <FeedbackIntroModal />
      {children}
      <FeedbackForm />
      <FeedbackToggle />
    </FeedbackProvider>
  );
}

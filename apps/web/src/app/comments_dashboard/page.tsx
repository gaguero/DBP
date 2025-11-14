import type { Metadata } from "next";

import { FeedbackDashboard } from "@/components/feedback/feedback-dashboard";
import { isCommentsFeatureEnabled } from "@/lib/feature-flags";

export const metadata: Metadata = {
  title: "Comments dashboard",
  description: "Central workspace for stakeholder feedback review.",
};

export default function CommentsDashboardPage() {
  const enabled = isCommentsFeatureEnabled();

  if (!enabled) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">Feedback dashboard disabled</h1>
        <p className="mt-3 text-sm text-slate-600">
          Enable the COMMENTS_FEATURE_ENABLED environment variable to access this workspace.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <FeedbackDashboard />
      </div>
    </main>
  );
}


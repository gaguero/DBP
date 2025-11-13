import { env } from "@/lib/env";

export function isCommentsFeatureEnabled() {
  return env.COMMENTS_FEATURE_ENABLED === "true";
}

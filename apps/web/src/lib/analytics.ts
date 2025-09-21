export type AnalyticsEvent = {
  event: string;
  data?: Record<string, unknown>;
};

export function trackEvent(analyticsEvent: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: analyticsEvent.event, ...analyticsEvent.data });
}

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

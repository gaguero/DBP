"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  children: ReactNode;
  trackingEvent?: string;
  trackingData?: Record<string, unknown>;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

export function TrackedLink({
  href,
  children,
  trackingEvent,
  trackingData,
  onClick,
  ...anchorProps
}: TrackedLinkProps) {
  return (
    <Link
      {...anchorProps}
      href={href}
      onClick={(event) => {
        if (trackingEvent) {
          trackEvent({ event: trackingEvent, data: trackingData });
        }
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}

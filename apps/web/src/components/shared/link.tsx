import Link from "next/link";
import clsx from "clsx";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
  className?: string;
  trackingEvent?: string;
  trackingData?: Record<string, unknown>;
  external?: boolean;
}

export function StyledLink({
  href,
  children,
  className,
  trackingEvent,
  trackingData,
  external = false,
  ...props
}: LinkProps) {
  const handleClick = () => {
    if (trackingEvent) {
      trackEvent({ event: trackingEvent, data: trackingData });
    }
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={clsx("text-[var(--color-ocean)] hover:underline", className)}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx("text-[var(--color-ocean)] hover:underline", className)}
      {...props}
    >
      {children}
    </Link>
  );
}






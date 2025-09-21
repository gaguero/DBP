import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type ButtonProps = {
  variant?: "primary" | "secondary";
  href?: string;
  children: ReactNode;
  trackingEvent?: string;
  trackingData?: Record<string, unknown>;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

const styles = {
  primary: "button-primary",
  secondary: "button-secondary",
} as const;

export function Button({
  variant = "primary",
  href,
  children,
  className,
  trackingEvent,
  trackingData,
  onClick,
  type,
  ...buttonProps
}: ButtonProps) {
  const classes = clsx(styles[variant], className);

  const handleInteraction: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (event) => {
    if (trackingEvent) {
      trackEvent({ event: trackingEvent, data: trackingData });
    }
    onClick?.(event);
  };

  if (href) {
    return (
      <Link href={href} className={classes} onClick={handleInteraction}>
        {children}
      </Link>
    );
  }

  const buttonType = type ?? "button";

  return (
    <button
      {...buttonProps}
      type={buttonType}
      onClick={handleInteraction as MouseEventHandler<HTMLButtonElement>}
      className={classes}
    >
      {children}
    </button>
  );
}

"use client";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";
import clsx from "clsx";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type CommonProps = {
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
  trackingEvent?: string;
  trackingData?: Record<string, unknown>;
};

type AnchorButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "onClick" | "href"> & {
    href: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "onClick"> & {
    href?: undefined;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };

type ButtonProps = AnchorButtonProps | NativeButtonProps;

const styles = {
  primary: "button-primary",
  secondary: "button-secondary",
} as const;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    children,
    className,
    trackingEvent,
    trackingData,
    ...rest
  } = props;

  const classes = clsx(styles[variant], className);

  const emitAnalytics = () => {
    if (trackingEvent) {
      trackEvent({ event: trackingEvent, data: trackingData });
    }
  };

  if ("href" in rest && rest.href) {
    const { href, onClick, ...anchorProps } = rest as AnchorButtonProps;

    const handleInteraction: MouseEventHandler<HTMLAnchorElement> = (event) => {
      emitAnalytics();
      onClick?.(event);
    };

    return (
      <Link
        {...anchorProps}
        href={href}
        className={classes}
        onClick={handleInteraction}
      >
        {children}
      </Link>
    );
  }

  const { onClick, type, ...buttonProps } = rest as NativeButtonProps;
  const buttonType = type ?? "button";

  const handleInteraction: MouseEventHandler<HTMLButtonElement> = (event) => {
    emitAnalytics();
    onClick?.(event);
  };

  return (
    <button
      {...buttonProps}
      type={buttonType}
      onClick={handleInteraction}
      className={classes}
    >
      {children}
    </button>
  );
}




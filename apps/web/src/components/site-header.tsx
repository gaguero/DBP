"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Story" },
  { href: "/rooms", label: "Rooms" },
  { href: "/dining", label: "Dining" },
  { href: "/experiences", label: "Experiences" },
  { href: "/sustainability", label: "Impact" },
  { href: "/contact", label: "Contact" },
];

function toSpanishPath(pathname: string | null) {
  if (!pathname) return "/es/hogar";
  const mappings: Record<string, string> = {
    "/": "/es/hogar",
    "/about": "/es/historia",
    "/rooms": "/es/habitaciones",
    "/dining": "/es/restaurante",
    "/experiences": "/es/experiencias",
    "/sustainability": "/es/impacto",
    "/contact": "/es/contacto",
  };
  for (const [key, value] of Object.entries(mappings)) {
    if (pathname === key) return value;
    if (pathname.startsWith(`${key}/`)) {
      const remainder = pathname.replace(key, "");
      return `${value}${remainder}`;
    }
  }
  if (pathname.startsWith("/es")) {
    return pathname;
  }
  return "/es/hogar";
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__main">
        <Link href="/" className="site-header__logo-link">
          <Image
            src="/images/DBP_logo_round_only_dolphin-removebg-preview.png"
            alt="Dolphin Blue Paradise"
            width={44}
            height={44}
            className="site-header__logo-icon"
          />
          <div className="site-header__logo-text">
            <div className="site-header__logo-line1">
              <span className="site-header__logo-dolphin">DOLPHIN</span>
            </div>
            <div className="site-header__logo-line2">
              <span className="site-header__logo-blue">BLUE</span>
            </div>
            <div className="site-header__logo-line3">
              <span className="site-header__logo-paradise">PARADISE</span>
            </div>
          </div>
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          className="site-header__toggle"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
        <nav className="site-header__nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`site-header__link ${isActive ? "site-header__link--active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href={toSpanishPath(pathname)} className="site-header__link site-header__link--lang">
            ES
          </Link>
        </nav>
      </div>
      {open ? (
        <nav id="main-navigation" className="site-header__mobile">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`site-header__mobile-link ${isActive ? "site-header__mobile-link--active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href={toSpanishPath(pathname)} className="site-header__mobile-link" onClick={() => setOpen(false)}>
            Espanol
          </Link>
        </nav>
      ) : null}
    </header>
  );
}

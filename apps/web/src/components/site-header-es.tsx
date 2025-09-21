"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const linksEs = [
  { href: "/es/hogar", label: "Inicio" },
  { href: "/es/habitaciones", label: "Habitaciones" },
  { href: "/es/restaurante", label: "Restaurante" },
  { href: "/es/experiencias", label: "Experiencias" },
  { href: "/es/impacto", label: "Impacto" },
  { href: "/es/planifica-tu-viaje", label: "Planifica" },
  { href: "/es/historias", label: "Historias" },
  { href: "/es/contacto", label: "Contacto" },
];

function toEnglishPath(pathname: string | null) {
  if (!pathname) return "/";
  if (!pathname.startsWith("/es")) return pathname;
  const rest = pathname.replace("/es", "") || "/";
  return rest === "/hogar" ? "/" : rest;
}

export function SiteHeaderEs() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/85 backdrop-blur">
      <div className="container flex flex-col gap-4 py-4 md:py-6">
        <div className="flex flex-col items-start gap-2 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            Llamadas/WhatsApp: <a href="tel:+50763460605" className="font-semibold">+507 6346 0605</a>
          </p>
          <p>
            Email: <a href="mailto:contact@dolphinblueparadise.com" className="font-semibold">contact@dolphinblueparadise.com</a>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Link href="/es/hogar" className="text-2xl font-semibold tracking-wider uppercase text-[var(--color-navy)]">
            Dolphin Blue Paradise
          </Link>
          <div className="flex items-center gap-3 md:hidden">
            <Link href="#booking" className="button-primary text-xs px-4 py-2">
              Reservar
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="main-navigation-es"
              className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--color-navy)] text-[var(--color-navy)]"
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="sr-only">Abrir menú</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                )}
              </svg>
            </button>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
              {linksEs.map((link) => {
                const activo = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative pb-1 transition-colors hover:text-[var(--color-ocean)] ${activo ? "text-[var(--color-ocean)]" : ""}`}
                  >
                    {link.label}
                    {activo ? <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[var(--color-gold)]" /> : null}
                  </Link>
                );
              })}
              <Link href={toEnglishPath(pathname)} className="ms-4 text-[var(--color-navy)]">
                EN
              </Link>
            </nav>
            <Link href="#booking" className="button-primary">
              Reservar
            </Link>
          </div>
        </div>
        {open ? (
          <nav
            id="main-navigation-es"
            className="flex flex-col gap-3 rounded-2xl border border-black/5 bg-white p-6 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)] md:hidden"
          >
            {linksEs.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between rounded-md px-2 py-2 transition hover:bg-[var(--color-sand)] ${pathname === link.href ? "text-[var(--color-ocean)]" : ""}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
                <span aria-hidden>→</span>
              </Link>
            ))}
            <Link href={toEnglishPath(pathname)} className="text-[var(--color-navy)]" onClick={() => setOpen(false)}>
              English
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
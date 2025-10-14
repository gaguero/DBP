import Link from "next/link";

const columnas = [
  {
    titulo: "Resort",
    items: [
      { label: "Habitaciones", href: "/es/habitaciones" },
      { label: "Restaurante", href: "/es/restaurante" },
      { label: "Experiencias", href: "/es/experiencias" },
    ],
  },
  {
    titulo: "Planifica",
    items: [
      { label: "Planifica tu viaje", href: "/es/planifica-tu-viaje" },
      { label: "Impacto", href: "/es/impacto" },
      { label: "Voluntariado", href: "/es/voluntariado" },
    ],
  },
  {
    titulo: "Conecta",
    items: [
      { label: "Historias", href: "/es/historias" },
      { label: "Galeria", href: "/es/galeria" },
      { label: "Contacto", href: "/es/contacto" },
    ],
  },
];

export function SiteFooterEs() {
  return (
    <footer className="bg-[var(--color-navy)] text-white">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">Dolphin Blue Paradise</p>
          <p className="text-lg font-semibold">Paraiso entre la selva y el mar.</p>
          <p className="max-w-sm text-sm text-white/70">Isla San Cristobal – Bahia Delfines – Bocas del Toro – Panama</p>
          <div className="flex gap-3">
            {["Facebook", "Instagram", "Pinterest"].map((red) => (
              <span key={red} className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
                {red[0]}
              </span>
            ))}
          </div>
        </div>
        {columnas.map((columna) => (
          <div key={columna.titulo} className="space-y-3">
            <h3 className="text-sm uppercase tracking-[0.24em] text-[var(--color-gold)]">{columna.titulo}</h3>
            <ul className="space-y-2 text-sm text-white/80">
              {columna.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container flex flex-col gap-2 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Dolphin Blue Paradise. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacy">Privacidad</Link>
            <Link href="/terms">Terminos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
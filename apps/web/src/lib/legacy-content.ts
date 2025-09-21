import fs from "node:fs";
import path from "node:path";

type LegacyKey =
  | "home"
  | "rooms"
  | "dining"
  | "experiences"
  | "plan"
  | "sustainability"
  | "volunteering"
  | "contact"
  | "facilities"
  | "es_hogar"
  | "es_habitaciones"
  | "es_restaurante"
  | "es_experiencias"
  | "es_plan"
  | "es_impacto"
  | "es_voluntariado"
  | "es_contacto"
  | "es_instalaciones";

type LegacySource = {
  file: string;
  label: string;
};

const CAPTURE_DATE = "2025-09-20";

const candidateRoots = (() => {
  const roots: string[] = [];
  const envRoot = process.env.LEGACY_CONTENT_ROOT;
  if (envRoot) {
    roots.push(envRoot);
  }
  roots.push(
    path.resolve(process.cwd(), "dolphinblueparadis-1", "d"),
    path.resolve(process.cwd(), "..", "dolphinblueparadis-1", "d"),
    path.resolve(process.cwd(), "..", "..", "dolphinblueparadis-1", "d"),
    path.resolve(process.cwd(), "..", "..", "..", "dolphinblueparadis-1", "d")
  );
  return roots;
})();

const legacyRoot = candidateRoots.find((candidate) => {
  try {
    return fs.existsSync(candidate);
  } catch {
    return false;
  }
});

if (!legacyRoot) {
  console.warn("Legacy content root not found", candidateRoots);
}

const legacySources: Record<LegacyKey, LegacySource> = {
  home: {
    file: "www.dolphinblueparadise.com-home.txt",
    label: "Legacy Home Page",
  },
  rooms: {
    file: "www.dolphinblueparadise.com-rooms.txt",
    label: "Legacy Rooms Page",
  },
  dining: {
    file: "www.dolphinblueparadise.com-restaurant.txt",
    label: "Legacy Restaurant Page",
  },
  experiences: {
    file: "www.dolphinblueparadise.com-activity-brochure.txt",
    label: "Legacy Activities Brochure",
  },
  plan: {
    file: "www.dolphinblueparadise.com-finding-dbp.txt",
    label: "Legacy Travel Logistics Page",
  },
  sustainability: {
    file: "www.dolphinblueparadise.com-your-impact.txt",
    label: "Legacy Your Impact Page",
  },
  volunteering: {
    file: "www.dolphinblueparadise.com-volunteering-in-an-indigenous-village.txt",
    label: "Legacy Volunteering Page",
  },
  contact: {
    file: "www.dolphinblueparadise.com-reservation.txt",
    label: "Legacy Reservation Page",
  },
  facilities: {
    file: "www.dolphinblueparadise.com-facilities.txt",
    label: "Legacy Facilities Page",
  },
  es_hogar: {
    file: "www.dolphinblueparadise.com-hogar.txt",
    label: "Legado Hogar",
  },
  es_habitaciones: {
    file: "www.dolphinblueparadise.com-habitaciones.txt",
    label: "Legado Habitaciones",
  },
  es_restaurante: {
    file: "www.dolphinblueparadise.com-menus.txt",
    label: "Legado Restaurante",
  },
  es_instalaciones: {
    file: "www.dolphinblueparadise.com-instalaciones.txt",
    label: "Legado Instalaciones",
  },
  es_experiencias: {
    file: "www.dolphinblueparadise.com-spanish-activity-brochure.txt",
    label: "Legado Experiencias",
  },
  es_plan: {
    file: "www.dolphinblueparadise.com-finding-dbp.txt",
    label: "Legado Planifica tu Viaje",
  },
  es_impacto: {
    file: "www.dolphinblueparadise.com-your-impact.txt",
    label: "Legado Impacto",
  },
  es_voluntariado: {
    file: "www.dolphinblueparadise.com-volunteering-in-an-indigenous-village.txt",
    label: "Legado Voluntariado",
  },
  es_contacto: {
    file: "www.dolphinblueparadise.com-reservation.txt",
    label: "Legado Contacto",
  },
};

const cache = new Map<LegacyKey, string[]>();

function readLegacyFile(file: string) {
  if (!legacyRoot) {
    return null;
  }
  const filePath = path.join(legacyRoot, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`Legacy content file not found: ${filePath}`);
    return null;
  }
  return fs.readFileSync(filePath, "utf8");
}

function normaliseParagraph(paragraph: string) {
  return paragraph
    .replace(/\u00a0/g, " ")
    .replace(/\u2013|\u2014/g, "-")
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201c|\u201d/g, '"')
    .replace(/\t+/g, " ")
    .replace(/ {2,}/g, " ")
    .trim();
}

export function getLegacyContent(key: LegacyKey) {
  if (cache.has(key)) {
    return cache.get(key)!;
  }

  const source = legacySources[key];
  const raw = readLegacyFile(source.file);
  if (!raw) {
    cache.set(key, []);
    return [];
  }

  const normalised = raw.replace(/\r\n/g, "\n").replace(/\uFEFF/g, "");

  const paragraphs = normalised
    .split(/\n{2,}/)
    .map((section) => normaliseParagraph(section))
    .filter(Boolean);

  cache.set(key, paragraphs);
  return paragraphs;
}

export function getLegacySourceMeta(key: LegacyKey) {
  const source = legacySources[key];
  return {
    label: source.label,
    captureDate: CAPTURE_DATE,
  };
}

export type { LegacyKey };
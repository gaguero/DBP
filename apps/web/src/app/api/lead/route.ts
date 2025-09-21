import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";

const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  language: z.string().optional(),
  arrival: z.string().optional(),
  departure: z.string().optional(),
  interests: z.array(z.string()).optional(),
  message: z.string().min(1),
  consent: z.string().optional(),
  locale: z.enum(["en", "es"]).optional(),
});

function toArray(value: FormDataEntryValue | FormDataEntryValue[] | null): string[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === "string" ? item : ""));
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return undefined;
}

function redirectPath(locale: string | undefined, error?: boolean) {
  if (locale === "es") {
    return error ? "/es/contacto?error=submit" : "/es/gracias";
  }
  return error ? "/contact?error=submit" : "/thank-you";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const data = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() || undefined,
    language: formData.get("language")?.toString() || undefined,
    arrival: formData.get("arrival")?.toString() || undefined,
    departure: formData.get("departure")?.toString() || undefined,
    interests: toArray(formData.getAll("interests")),
    message: formData.get("message")?.toString() ?? "",
    consent: formData.get("consent")?.toString() || undefined,
    locale: formData.get("locale")?.toString() as "en" | "es" | undefined,
  };

  const parsed = leadSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.redirect(redirectPath(data.locale, true));
  }

  if (!env.ESPOCRM_URL || !env.ESPOCRM_API_KEY) {
    console.warn("Lead submission skipped: missing EspoCRM configuration");
    return NextResponse.redirect(redirectPath(parsed.data.locale));
  }

  try {
    const response = await fetch(`${env.ESPOCRM_URL}/Lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": env.ESPOCRM_API_KEY,
      },
      body: JSON.stringify({
        name: parsed.data.name,
        emailAddress: parsed.data.email,
        phoneNumber: parsed.data.phone,
        preferredLanguage: parsed.data.language,
        arrivalDate: parsed.data.arrival,
        departureDate: parsed.data.departure,
        description: parsed.data.message,
        leadSource: "Website",
        interestsWeb: parsed.data.interests,
        consentMarketing: parsed.data.consent === "on" || parsed.data.consent === "true",
      }),
    });

    if (!response.ok) {
      console.error("EspoCRM error", response.status, await response.text());
      return NextResponse.redirect(redirectPath(parsed.data.locale, true));
    }

    return NextResponse.redirect(redirectPath(parsed.data.locale));
  } catch (error) {
    console.error("Lead submission failed", error);
    return NextResponse.redirect(redirectPath(parsed.data.locale, true));
  }
}


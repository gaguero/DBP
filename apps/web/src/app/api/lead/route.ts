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
  partySize: z.string().optional(),
  interests: z.array(z.string()).optional(),
  message: z.string().optional(),
  consent: z.string().optional(),
  locale: z.enum(["en", "es"]).optional(),
  formType: z.string().optional(), // "news-offers" or "personalized-assistance"
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

function determineFormSource(formType: string | undefined, hasDates: boolean, hasMessage: boolean): string {
  // If formType is explicitly set, use it
  if (formType === "news-offers") {
    return "News and Offers Form";
  }
  if (formType === "personalized-assistance") {
    return "Get Personalized Assistance Form";
  }
  
  // Otherwise, determine by fields present
  if (hasDates && hasMessage) {
    return "Get Personalized Assistance Form";
  }
  
  // Default to News and Offers for backward compatibility
  return "News and Offers Form";
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
    partySize: formData.get("partySize")?.toString() || undefined,
    interests: toArray(formData.getAll("interests")),
    message: formData.get("message")?.toString() || undefined,
    consent: formData.get("consent")?.toString() || undefined,
    locale: formData.get("locale")?.toString() as "en" | "es" | undefined,
    formType: formData.get("formType")?.toString() || undefined,
  };

  const parsed = leadSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.redirect(redirectPath(data.locale, true));
  }

  if (!env.ESPOCRM_URL || !env.ESPOCRM_API_KEY) {
    console.warn("Lead submission skipped: missing EspoCRM configuration");
    return NextResponse.redirect(redirectPath(parsed.data.locale));
  }

  // Determine form source
  const hasDates = !!(parsed.data.arrival && parsed.data.departure);
  const hasMessage = !!parsed.data.message && parsed.data.message.length > 0;
  const formSource = determineFormSource(parsed.data.formType, hasDates, hasMessage);

  // Build payload for EspoCRM
  const payload: Record<string, unknown> = {
    name: parsed.data.name,
    emailAddress: parsed.data.email,
    phoneNumber: parsed.data.phone,
    preferredLanguage: parsed.data.language,
    leadSource: "Website",
    formSource: formSource,
    formSubmissionDate: new Date().toISOString(),
    interestsWeb: parsed.data.interests,
    consentMarketing: parsed.data.consent === "on" || parsed.data.consent === "true",
  };

  // Add fields specific to Get Personalized Assistance form
  if (formSource === "Get Personalized Assistance Form") {
    payload.arrivalDate = parsed.data.arrival;
    payload.departureDate = parsed.data.departure;
    payload.partySize = parsed.data.partySize ? parseInt(parsed.data.partySize, 10) : undefined;
    payload.description = parsed.data.message;
  } else {
    // For News and Offers, use a default message if none provided
    payload.description = parsed.data.message || "Interested in news and special offers";
  }

  try {
    const response = await fetch(`${env.ESPOCRM_URL}/Lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": env.ESPOCRM_API_KEY,
      },
      body: JSON.stringify(payload),
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


import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";

const payloadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("A valid email is required"),
  phone: z.string().optional(),
});

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) {
    return { firstName: "", lastName: "" };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }
  const [firstName, ...rest] = parts;
  return {
    firstName,
    lastName: rest.join(" "),
  };
}

export async function POST(request: Request) {
  let parsedBody: ReturnType<typeof payloadSchema.parse>;

  try {
    const body = await request.json();
    const result = payloadSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid data", details: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    parsedBody = result.data;
  } catch (error) {
    console.error("Failed to parse newsletter payload", error);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!env.ESPOCRM_URL || !env.ESPOCRM_API_KEY) {
    console.warn("Newsletter signup skipped: missing EspoCRM configuration");
    return NextResponse.json(
      { error: "CRM integration is not configured" },
      { status: 500 },
    );
  }

  const { firstName, lastName } = splitName(parsedBody.name);

  const normalizedPhone = parsedBody.phone ? parsedBody.phone.replace(/[^\d+]/g, "") : undefined;
  const phoneValue = normalizedPhone && normalizedPhone.length >= 5 ? normalizedPhone : undefined;

  try {
    const crmResponse = await fetch(`${env.ESPOCRM_URL}/Lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": env.ESPOCRM_API_KEY,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        name: parsedBody.name,
        emailAddress: parsedBody.email,
        ...(phoneValue ? { phoneNumber: phoneValue } : {}),
        description: "Subscribed to newsletter via website popup",
        source: "Web Site",
        inquiryChannel: "Website Form",
        consentEmail: true,
      }),
    });

    if (!crmResponse.ok) {
      const errorText = await crmResponse.text();
      console.error("EspoCRM newsletter error", crmResponse.status, errorText);
      return NextResponse.json(
        { error: "Failed to create contact" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Newsletter CRM request failed", error);
    return NextResponse.json(
      { error: "Unexpected error creating contact" },
      { status: 500 },
    );
  }
}

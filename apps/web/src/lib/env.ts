import { z } from "zod";

const envSchema = z.object({
  ESPOCRM_URL: z.string().url(),
  ESPOCRM_API_KEY: z.string().min(1),
  CHATWOOT_BASE_URL: z.string().url(),
  CHATWOOT_TOKEN: z.string().min(1),
  GTM_ID: z.string().min(1),
});

const parsed = envSchema.safeParse({
  ESPOCRM_URL: process.env.ESPOCRM_URL,
  ESPOCRM_API_KEY: process.env.ESPOCRM_API_KEY,
  CHATWOOT_BASE_URL: process.env.CHATWOOT_BASE_URL,
  CHATWOOT_TOKEN: process.env.CHATWOOT_TOKEN,
  GTM_ID: process.env.GTM_ID,
});

if (!parsed.success) {
  console.error("Invalid environment variables", parsed.error.flatten().fieldErrors);
  throw new Error("Environment validation failed");
}

export const env = parsed.data;

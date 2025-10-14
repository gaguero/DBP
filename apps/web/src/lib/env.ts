import { z } from "zod";

const envSchema = z.object({
  ESPOCRM_URL: z.string().url().optional(),
  ESPOCRM_API_KEY: z.string().min(1).optional(),
  CHATWOOT_BASE_URL: z.string().url().optional(),
  CHATWOOT_TOKEN: z.string().min(1).optional(),
  GTM_ID: z.string().min(1).optional(),
});

type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse({
  ESPOCRM_URL: process.env.ESPOCRM_URL,
  ESPOCRM_API_KEY: process.env.ESPOCRM_API_KEY,
  CHATWOOT_BASE_URL: process.env.CHATWOOT_BASE_URL,
  CHATWOOT_TOKEN: process.env.CHATWOOT_TOKEN,
  GTM_ID: process.env.GTM_ID,
});

if (!parsed.success) {
  console.warn("Invalid environment variables", parsed.error.flatten().fieldErrors);
}

export const env: Env = parsed.success ? parsed.data : {};

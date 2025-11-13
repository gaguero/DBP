import { z } from "zod";

const envSchema = z.object({
  ESPOCRM_URL: z.string().url().optional(),
  ESPOCRM_API_KEY: z.string().min(1).optional(),
  CHATWOOT_BASE_URL: z.string().url().optional(),
  CHATWOOT_TOKEN: z.string().min(1).optional(),
  GTM_ID: z.string().min(1).optional(),
  DATABASE_URL: z.string().url().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(1).optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().min(8).optional(),
  COMMENTS_FEATURE_ENABLED: z.enum(["true", "false"]).optional(),
  COMMENTS_NOTIFY_TO: z.string().min(1).optional(),
  SMTP_HOST: z.string().min(1).optional(),
  SMTP_PORT: z.string().min(1).optional(),
  SMTP_SECURITY: z.string().min(1).optional(),
  SMTP_USER: z.string().email().optional(),
  SMTP_PASSWORD: z.string().min(1).optional(),
});

type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse({
  ESPOCRM_URL: process.env.ESPOCRM_URL,
  ESPOCRM_API_KEY: process.env.ESPOCRM_API_KEY,
  CHATWOOT_BASE_URL: process.env.CHATWOOT_BASE_URL,
  CHATWOOT_TOKEN: process.env.CHATWOOT_TOKEN,
  GTM_ID: process.env.GTM_ID,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  COMMENTS_FEATURE_ENABLED: process.env.COMMENTS_FEATURE_ENABLED,
  COMMENTS_NOTIFY_TO: process.env.COMMENTS_NOTIFY_TO,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_SECURITY: process.env.SMTP_SECURITY,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
});

if (!parsed.success) {
  console.warn("Invalid environment variables", parsed.error.flatten().fieldErrors);
}

export const env: Env = parsed.success ? parsed.data : {} as Env;

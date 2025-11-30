import { z } from "zod";

const envSchema = z.object({
    // Database & CMS
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, "Sanity Project ID is required"),
    NEXT_PUBLIC_SANITY_DATASET: z.string().min(1, "Sanity Dataset is required"),
    NEXT_PUBLIC_SANITY_API_VERSION: z.string().default("2023-05-03"),
    SANITY_SECRET_TOKEN: z.string().min(1, "Sanity Token is required"),

    // Authentication
    WORKOS_API_KEY: z.string().min(1, "WorkOS API Key is required"),
    WORKOS_CLIENT_ID: z.string().min(1, "WorkOS Client ID is required"),
    WORKOS_REDIRECT_URI: z.string().url("WorkOS Redirect URI must be a valid URL"),

    // Payment Providers
    STRIPE_SECRET_KEY: z.string().min(1, "Stripe Secret Key is required"),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1, "Stripe Publishable Key is required"),
    PAYSTACK_SECRET_KEY: z.string().min(1, "Paystack Secret Key is required"),
    PAYSTACK_TEST_SECRET_KEY: z.string().min(1, "Paystack Test Secret Key is required"),
    PAYSTACK_WEBHOOK_SECRET: z.string().min(1, "Paystack Webhook Secret is required"),

    // File Storage
    UPLOADTHING_SECRET: z.string().min(1, "UploadThing Secret is required"),
    UPLOADTHING_APP_ID: z.string().min(1, "UploadThing App ID is required"),
    IMAGEKIT_PUBLIC_KEY: z.string().min(1, "ImageKit Public Key is required"),
    IMAGEKIT_PRIVATE_KEY: z.string().min(1, "ImageKit Private Key is required"),
    IMAGEKIT_URL_ENDPOINT: z.string().url("ImageKit URL must be a valid URL"),

    // Optional
    NEXT_PUBLIC_NEWS_DATA_API_KEY: z.string().optional(),
    PEXELS_API_KEY: z.string().optional(),
    NEXT_PUBLIC_SERVER_URL: z.string().optional(),
});

// Validate and export
// We use safeParse to avoid crashing the build if env vars are missing in CI/CD (unless needed)
// But for runtime safety, we want to know.
// For now, let's parse and let it throw if invalid, so we fail fast.
export const env = envSchema.parse(process.env);

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;

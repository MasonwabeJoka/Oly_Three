# 🚨 Critical Fixes Checklist

## Immediate Actions (Do Before Next Deployment)

### 1. Fix ESLint Configuration ⚠️
**Current Issue:** ESLint 9.x incompatible with `.eslintrc.json` format

**Option A - Downgrade ESLint (Recommended for quick fix):**
```bash
npm install eslint@^8.57.0 --save-dev
npm run lint
```

**Option B - Upgrade to Flat Config:**
```bash
npm install @eslint/eslintrc --save-dev
```
Then create `eslint.config.js` (see CODE_REVIEW.md for full config)

---

### 2. Add Environment Variable Validation ⚠️

**Create:** `lib/env.ts`
```typescript
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
  SANITY_SECRET_TOKEN: z.string().min(1),
  WORKOS_API_KEY: z.string().min(1),
  WORKOS_CLIENT_ID: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  PAYSTACK_SECRET_KEY: z.string().min(1),
  UPLOADTHING_SECRET: z.string().min(1),
  IMAGEKIT_PRIVATE_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
```

**Update all files** that use `process.env` to import from `lib/env.ts`

---

### 3. Remove Console.log Statements ⚠️

**Create:** `lib/logger.ts`
```typescript
const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  info: (...args: any[]) => isDev && console.info(...args),
  warn: (...args: any[]) => isDev && console.warn(...args),
  error: (...args: any[]) => console.error(...args),
  debug: (...args: any[]) => isDev && console.debug(...args),
};
```

**Files to update:**
- [ ] `extract-variables.js` (lines 38, 110)
- [ ] `app/api/uploadthing/core.ts` (lines 21, 23, 42, 44, 61, 63)
- [ ] Search and replace all `console.log` with `logger.debug`

---

### 4. Secure File Uploads ⚠️

**Update:** `app/api/uploadthing/core.ts`

Replace anonymous uploads with authenticated uploads:
```typescript
.middleware(async ({ req }) => {
  const { user } = await withAuth();
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  return { 
    uploadedBy: user.id,
    uploadedAt: new Date().toISOString()
  };
})
```

---

### 5. Clean Up TypeScript Config ⚠️

**Update:** `tsconfig.json`

Remove duplicate entries and simplify:
```json
{
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "build/dev/types/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    ".next",
    "out",
    "build"
  ]
}
```

---

### 6. Remove Unused Import ⚠️

**File:** `app/(root)/layout.tsx`

Remove line 8:
```typescript
import Layout from "../(articles)/layout"; // DELETE THIS LINE
```

---

### 7. Add Build Validation ⚠️

**Update:** `package.json`

Add type checking to build:
```json
{
  "scripts": {
    "build": "npm run extract-variables && tsc --noEmit && next build",
    "vercel-build": "npm run extract-variables && tsc --noEmit && next build"
  }
}
```

---

### 8. Create Production Environment Template ⚠️

**Create:** `.env.production.example`
```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
SANITY_SECRET_TOKEN=

# WorkOS Authentication
WORKOS_API_KEY=
WORKOS_CLIENT_ID=
WORKOS_REDIRECT_URI=

# Stripe Payment
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Paystack Payment
PAYSTACK_SECRET_KEY=
PAYSTACK_TEST_SECRET_KEY=
PAYSTACK_WEBHOOK_SECRET=

# UploadThing
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# ImageKit
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=

# Server
NEXT_PUBLIC_SERVER_URL=
```

---

## Quick Commands

### Run Linting (after fixing ESLint)
```bash
npm run lint
```

### Check TypeScript Errors
```bash
npx tsc --noEmit
```

### Build for Production
```bash
npm run build
```

### Test Build Locally
```bash
npm run build && npm start
```

---

## Verification Checklist

Before deploying to production, verify:

- [ ] ESLint runs without errors
- [ ] TypeScript compiles without errors
- [ ] All environment variables are set in Vercel
- [ ] No console.log statements in production code
- [ ] File uploads require authentication
- [ ] Build completes successfully
- [ ] App runs locally with production build
- [ ] All API routes are tested
- [ ] Error boundaries are in place

---

## Files Modified

Track your progress:

- [ ] `.eslintrc.json` or `eslint.config.js`
- [ ] `lib/env.ts` (new file)
- [ ] `lib/logger.ts` (new file)
- [ ] `extract-variables.js`
- [ ] `app/api/uploadthing/core.ts`
- [ ] `app/(root)/layout.tsx`
- [ ] `tsconfig.json`
- [ ] `package.json`
- [ ] `.env.production.example` (new file)

---

## Estimated Time

- ESLint fix: 15 minutes
- Environment validation: 30 minutes
- Logger implementation: 45 minutes
- File upload security: 20 minutes
- TypeScript cleanup: 10 minutes
- Other fixes: 15 minutes

**Total: ~2.5 hours**

---

## Need Help?

Refer to the detailed `CODE_REVIEW.md` for:
- Full code examples
- Detailed explanations
- Additional recommendations
- Long-term improvements

---

*Last Updated: 2025-11-30*

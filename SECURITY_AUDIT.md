# 🔒 Security Audit & Recommendations

## Overview
This document outlines security concerns found during the code review and provides actionable recommendations.

---

## 🔴 Critical Security Issues

### 1. Unauthenticated File Uploads
**Severity:** CRITICAL  
**File:** `app/api/uploadthing/core.ts`

**Current State:**
```typescript
.middleware(async ({ req }) => {
  // Authentication removed - allowing all uploads
  return { uploadedBy: "anonymous" };
})
```

**Risks:**
- Anyone can upload files to your storage
- Potential for abuse (spam, malware, illegal content)
- Storage costs can spiral out of control
- Legal liability for hosted content

**Fix:**
```typescript
import { withAuth } from "@workos-inc/authkit-nextjs";

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 20 } })
    .middleware(async ({ req }) => {
      const { user } = await withAuth();
      
      if (!user) {
        throw new Error("Unauthorized - Please sign in to upload files");
      }
      
      // Optional: Add rate limiting per user
      // await checkUserUploadLimit(user.id);
      
      return { 
        uploadedBy: user.id,
        uploadedAt: new Date().toISOString(),
        userEmail: user.email
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Log upload for audit trail
      await logFileUpload({
        userId: metadata.uploadedBy,
        fileUrl: file.url,
        fileName: file.name,
        fileSize: file.size,
        timestamp: metadata.uploadedAt
      });
      
      return { uploadedBy: metadata.uploadedBy };
    }),
};
```

---

### 2. Missing Environment Variable Validation
**Severity:** HIGH

**Current State:**
Environment variables accessed directly without validation:
```typescript
process.env.PAYSTACK_SECRET_KEY
process.env.STRIPE_SECRET_KEY
process.env.SANITY_SECRET_TOKEN
```

**Risks:**
- Silent failures in production
- Undefined behavior if variables are missing
- Difficult to debug issues
- Potential security vulnerabilities

**Fix:**
Create `lib/env.ts`:
```typescript
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
  STRIPE_SECRET_KEY: z.string().startsWith("sk_", "Invalid Stripe Secret Key"),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith("pk_", "Invalid Stripe Publishable Key"),
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
});

// Validate and export
export const env = envSchema.parse(process.env);

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;
```

**Usage:**
```typescript
// Instead of: process.env.STRIPE_SECRET_KEY
// Use: 
import { env } from '@/lib/env';
const stripeKey = env.STRIPE_SECRET_KEY;
```

---

### 3. Webhook Security
**Severity:** HIGH  
**File:** `app/api/paystack/paymentConfirmationWebook/route.ts`

**Current Implementation:**
```typescript
const secret = process.env.PAYSTACK_WEBHOOK_SECRET;
```

**Recommendations:**

1. **Verify Webhook Signatures:**
```typescript
import crypto from 'crypto';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('x-paystack-signature');
  
  if (!signature) {
    return new Response('No signature provided', { status: 401 });
  }
  
  // Verify signature
  const hash = crypto
    .createHmac('sha512', env.PAYSTACK_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');
  
  if (hash !== signature) {
    return new Response('Invalid signature', { status: 401 });
  }
  
  // Process webhook
  const event = JSON.parse(body);
  // ... handle event
}
```

2. **Implement Idempotency:**
```typescript
// Store processed webhook IDs to prevent duplicate processing
const processedWebhooks = new Set<string>();

if (processedWebhooks.has(event.id)) {
  return new Response('Already processed', { status: 200 });
}

processedWebhooks.add(event.id);
// Process event...
```

3. **Add Rate Limiting:**
```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
});

const { success } = await ratelimit.limit(request.headers.get('x-forwarded-for') || 'anonymous');

if (!success) {
  return new Response('Too many requests', { status: 429 });
}
```

---

### 4. API Route Protection
**Severity:** MEDIUM

**Issue:**
Many API routes lack proper authentication and authorization checks.

**Recommendation:**
Create a middleware wrapper:

```typescript
// lib/api-middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@workos-inc/authkit-nextjs';

export function withApiAuth(
  handler: (req: NextRequest, user: any) => Promise<Response>
) {
  return async (req: NextRequest) => {
    try {
      const { user } = await withAuth();
      
      if (!user) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
      
      return await handler(req, user);
    } catch (error) {
      console.error('Auth error:', error);
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}

// Usage in API routes
export const POST = withApiAuth(async (req, user) => {
  // Your handler code with authenticated user
  const data = await req.json();
  // ... process request
});
```

---

## 🟡 Medium Priority Security Issues

### 5. CORS Configuration
**Severity:** MEDIUM

**Recommendation:**
Add CORS headers to API routes:

```typescript
// lib/cors.ts
export function corsHeaders(origin?: string) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

// In API routes
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request.headers.get('origin') || undefined),
  });
}
```

---

### 6. Input Validation
**Severity:** MEDIUM

**Issue:**
No consistent input validation across API routes.

**Recommendation:**
Use Zod for all API input validation:

```typescript
// Example: app/api/listing/create/route.ts
import { z } from 'zod';

const createListingSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(5000),
  price: z.number().positive(),
  category: z.string(),
  images: z.array(z.string().url()).min(1).max(20),
  location: z.object({
    city: z.string(),
    country: z.string(),
  }),
});

export const POST = withApiAuth(async (req, user) => {
  const body = await req.json();
  
  // Validate input
  const result = createListingSchema.safeParse(body);
  
  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: result.error.issues },
      { status: 400 }
    );
  }
  
  // Process validated data
  const listing = await createListing(result.data, user.id);
  return NextResponse.json(listing);
});
```

---

### 7. SQL Injection Prevention
**Severity:** MEDIUM

**Current State:**
Using Sanity CMS (NoSQL) - lower risk but still important.

**Recommendations:**
1. Always use parameterized queries
2. Sanitize user input before GROQ queries
3. Use Sanity's built-in query builder

```typescript
// Good - Using parameters
const query = `*[_type == "listing" && slug.current == $slug][0]`;
const listing = await client.fetch(query, { slug: userInput });

// Bad - String concatenation
const query = `*[_type == "listing" && slug.current == "${userInput}"][0]`;
```

---

### 8. XSS Prevention
**Severity:** MEDIUM

**Recommendations:**

1. **Sanitize Rich Text Content:**
```typescript
import DOMPurify from 'isomorphic-dompurify';

function sanitizeHTML(dirty: string) {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target'],
  });
}
```

2. **Use Content Security Policy:**
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel.app;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https: blob:;
      font-src 'self' data:;
      connect-src 'self' *.sanity.io *.stripe.com;
    `.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

## 🟢 Best Practices & Recommendations

### 9. Secrets Management

**Current State:**
Secrets in `.env` files (good for development).

**Production Recommendations:**

1. **Use Vercel Environment Variables:**
   - Store all secrets in Vercel dashboard
   - Use different values for preview/production
   - Enable "Sensitive" flag for secret values

2. **Rotate Secrets Regularly:**
   - API keys: Every 90 days
   - Webhook secrets: Every 180 days
   - Database credentials: Every 90 days

3. **Audit Secret Access:**
   - Log when secrets are accessed
   - Monitor for unusual patterns
   - Set up alerts for failed authentication

---

### 10. Rate Limiting

**Recommendation:**
Implement rate limiting on all public endpoints:

```typescript
// lib/rate-limit.ts
import { LRUCache } from 'lru-cache';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;

        return isRateLimited ? reject() : resolve();
      }),
  };
}

// Usage in API routes
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500,
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  
  try {
    await limiter.check(10, ip); // 10 requests per minute
  } catch {
    return new Response('Rate limit exceeded', { status: 429 });
  }
  
  // Process request...
}
```

---

### 11. Logging & Monitoring

**Recommendation:**
Implement comprehensive logging:

```typescript
// lib/logger.ts
import { env } from './env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  userId?: string;
  requestId?: string;
}

class Logger {
  private isDev = process.env.NODE_ENV === 'development';
  
  private log(level: LogLevel, message: string, context?: Record<string, any>) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };
    
    if (this.isDev) {
      console[level](message, context);
    } else {
      // Send to logging service (e.g., Sentry, LogRocket, DataDog)
      this.sendToLoggingService(entry);
    }
  }
  
  private sendToLoggingService(entry: LogEntry) {
    // Implement your logging service integration
    // Example: Sentry, LogRocket, DataDog, etc.
  }
  
  debug(message: string, context?: Record<string, any>) {
    if (this.isDev) {
      this.log('debug', message, context);
    }
  }
  
  info(message: string, context?: Record<string, any>) {
    this.log('info', message, context);
  }
  
  warn(message: string, context?: Record<string, any>) {
    this.log('warn', message, context);
  }
  
  error(message: string, context?: Record<string, any>) {
    this.log('error', message, context);
  }
  
  // Security-specific logging
  security(event: string, context?: Record<string, any>) {
    this.log('warn', `SECURITY: ${event}`, {
      ...context,
      securityEvent: true,
    });
  }
}

export const logger = new Logger();
```

---

### 12. Error Handling

**Recommendation:**
Never expose internal errors to users:

```typescript
// lib/error-handler.ts
import { logger } from './logger';

export function handleApiError(error: unknown) {
  logger.error('API Error', {
    error: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
  });
  
  // Never expose internal errors
  return new Response(
    JSON.stringify({ error: 'An unexpected error occurred' }),
    { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

// Usage
export async function POST(request: Request) {
  try {
    // Your code
  } catch (error) {
    return handleApiError(error);
  }
}
```

---

## 📋 Security Checklist

Before deploying to production:

- [ ] All file uploads require authentication
- [ ] Environment variables are validated
- [ ] Webhook signatures are verified
- [ ] API routes have authentication
- [ ] Input validation on all endpoints
- [ ] Rate limiting implemented
- [ ] CORS properly configured
- [ ] CSP headers set
- [ ] Secrets stored securely (not in code)
- [ ] Error messages don't expose internals
- [ ] Logging system in place
- [ ] HTTPS enforced
- [ ] Dependencies audited (`npm audit`)
- [ ] No hardcoded credentials
- [ ] Session management secure
- [ ] File upload size limits enforced
- [ ] SQL injection prevention (if applicable)
- [ ] XSS prevention measures
- [ ] CSRF protection (Next.js handles this)

---

## 🔍 Security Audit Tools

Run these regularly:

```bash
# Check for vulnerable dependencies
npm audit

# Fix automatically fixable vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated

# Scan for secrets in code
npx secretlint "**/*"

# TypeScript type checking
npx tsc --noEmit

# ESLint security rules
npm install eslint-plugin-security --save-dev
```

---

## 📞 Incident Response Plan

If a security breach occurs:

1. **Immediate Actions:**
   - Disable affected endpoints
   - Rotate all API keys and secrets
   - Review access logs
   - Notify affected users (if applicable)

2. **Investigation:**
   - Identify the vulnerability
   - Determine scope of breach
   - Document timeline
   - Preserve evidence

3. **Remediation:**
   - Fix the vulnerability
   - Deploy patch
   - Verify fix
   - Update security measures

4. **Post-Incident:**
   - Conduct post-mortem
   - Update security policies
   - Improve monitoring
   - Train team on lessons learned

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [Vercel Security](https://vercel.com/docs/security)
- [Sanity Security](https://www.sanity.io/docs/security)

---

*Last Updated: 2025-11-30*

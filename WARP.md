# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Build and Development Commands

### Development
```powershell
npm run dev              # Start Next.js dev server with Turbo
npm run serve            # Run production server (server.js)
```

### Building
```powershell
npm run build            # Full build: extract SCSS variables → TypeScript check → Next.js build
npm run vercel-build     # Vercel deployment build (same as build)
```

**CRITICAL**: The build pipeline runs three steps in sequence:
1. `npm run extract-variables` - Compiles SCSS and generates TypeScript constants
2. `tsc --noEmit` - TypeScript must be 100% error-free for build to proceed
3. `next build` - Builds the Next.js application

### Type Checking & Linting
```powershell
npx tsc --noEmit --pretty false    # Check TypeScript without emitting files
npm run lint                        # Run ESLint
```

### Sanity CMS
```powershell
npm run typegen                     # Extract Sanity schema and generate types
npm run sync-articles               # Sync articles using ts-node ESM loader
npm run sync-articles-now           # Immediate article sync (CJS version)
npm run sync-articles-cron          # Cron-based article sync
```

Access Sanity Studio at: `/studio` (after starting dev server)

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 16 (App Router) with Turbo mode
- **Language**: TypeScript 5.8.3 (strict mode)
- **React**: v19.2.0 with React 19 types
- **Styling**: SCSS (modern-compiler API) + Tailwind CSS
- **CMS**: Sanity v4 (headless CMS with custom studio at `/studio`)
- **Database**: Xata (PostgreSQL-compatible)
- **Auth**: WorkOS AuthKit
- **Payments**: Stripe + Paystack
- **Image Management**: ImageKit (primary), UploadThing (uploads)
- **State Management**: Zustand + React Query (@tanstack/react-query)
- **Forms**: React Hook Form + Zod validation

### Path Alias
- `@/*` resolves to project root (defined in `tsconfig.json`)
- Example: `@/components/Button` → `C:\...\oly\components\Button`

### App Structure (Next.js App Router)
```
app/
├── (admin)/           # Admin routes (route group)
├── (articles)/        # Article routes
├── (auth)/            # Authentication routes
├── (dashboard)/       # Dashboard routes
├── (oly-auto)/        # Auto marketplace feature
├── (oly-hiring)/      # Job listings feature
├── (oly-properties)/  # Real estate feature
├── (oly-services)/    # Services marketplace
├── (oly-shops)/       # E-commerce shops
├── (root)/            # Public pages
├── api/               # API routes
├── actions/           # Server actions
└── global-styles/     # Global CSS/SCSS
```

**Route Groups**: Directories wrapped in `()` don't affect URL structure; they organize related routes.

### Key Directories
- `components/` - Shared React components
- `features/` - Feature-specific components (e.g., `features/messages/`)
- `lib/` - Utilities and configurations
  - `lib/validations/` - Zod schemas for form validation
  - `lib/price-range/` - Price range utilities
- `hooks/` - Custom React hooks
- `sanity/` - Sanity CMS schema, queries, and configuration
- `types/` - TypeScript type definitions and module declarations
- `utils/` - Helper functions and server actions
  - `utils/serverActions/` - Next.js server actions
  - `utils/typescript-variables/` - Auto-generated SCSS variable exports

### Custom Image Component
**Always use** `@/components/Image` instead of `next/image`:
- Automatically routes to ImageKit when URL matches `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`
- Falls back to Next.js Image for other sources
- Accepts loose props including `transformation` for ImageKit transforms

### Data Fetching Patterns
- **Server Components**: Direct Sanity/Xata queries using `@sanity/client` or Xata SDK
- **Client Components**: React Query for caching + server actions for mutations
- **tRPC**: Minimal mock setup exists (`trpc/client.ts`) but not actively used

## TypeScript Configuration

### Strict Mode with Custom Type Shims
The project uses `strict: true` but employs strategic type shims to handle React 19 migration and third-party library issues.

### Type Definition Files (types/)

#### `types/react-fixes.d.ts`
**Purpose**: Provides loose React module augmentations to avoid "Namespace 'react' has no exported member" errors.

**What's included**:
- Extended `HTMLAttributes<T>` with `className`, `value`, `onChange`, `tw`
- Loose type aliases: `ReactNode`, `ReactElement`, `Ref`, `RefObject`, etc.
- Event types: `ChangeEvent`, `MouseEvent`, `FocusEvent`, etc. (all typed as `any`)
- Hooks: `useState`, `useEffect`, `useRef`, `useCallback`, `useMemo`, `useActionState`
- APIs: `forwardRef`, `memo`, `createContext`, `useContext`, `cloneElement`, `Suspense`

**When to extend**: If you encounter missing React APIs, add small, loose (`any`-based) definitions here instead of modifying core React types.

#### `types/modules.d.ts`
**Purpose**: Module stubs for third-party libraries and internal modules with missing/incompatible types.

**Current stubs**:
- `@/lib/validations/formValidations` - Exports Zod schemas as `any`
- `@/lib/mongoose` - Database connection
- `react-webcam`, `@react-google-maps/api`, `react-masonry-css` - Third-party JSX components
- Various local component modules (Icon, BidInput, navButton*, etc.)

**When to extend**: For third-party packages that don't work as JSX components under the React shim, add `declare module` stubs here.

### TypeScript Philosophy
- **Minimize refactoring**: Prefer type-only fixes (`as any`, union types, optional properties) over structural changes
- **Preserve runtime behavior**: Never change logic to satisfy TypeScript
- **Loose over strict**: When official types conflict with codebase patterns, use loose shims
- **Local fixes**: Add parameter type annotations (`param: any`) rather than rewriting function signatures

## Environment Variables

### Required for Development
```env
# Sanity CMS (required)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19
SANITY_SECRET_TOKEN=

# WorkOS Auth (required)
WORKOS_CLIENT_ID=
WORKOS_API_KEY=
WORKOS_COOKIE_PASSWORD=
NEXT_PUBLIC_WORKOS_REDIRECT_URI=http://localhost:3000/api/auth/callback

# ImageKit (required for images)
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_ID=
```

### Payment Providers
- **Stripe**: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Paystack**: `PAYSTACK_TEST_SECRET_KEY`, `PAYSTACK_WEBHOOK_SECRET`

### Optional Services
- UploadThing (file uploads)
- Unsplash (stock photos)
- NewsData API (news content)

See `.env.example` for complete list.

## SCSS to TypeScript Variable Pipeline

### How It Works
1. `extract-variables.js` compiles `utils/variables.scss`
2. Parses SCSS variables and converts to camelCase
3. Generates `utils/typescript-variables/variables.ts` with typed exports
4. **Runs automatically** during `npm run build`

### Usage in Code
```typescript
import { variables } from '@/utils/typescript-variables/variables';

const primaryColor = variables.primaryColor;
const maxMobile = variables.maxMobile;
```

### Path Alias Support
The extractor supports `@/` imports in SCSS files via custom Sass importer.

## Sanity CMS Integration

### Schema Location
- `sanity/schemaTypes/` - Document and object schemas
- `sanity/structure-config.ts` - Custom desk structure
- `sanity/initialValueTemplates.ts` - Document templates

### Studio Configuration
- Base path: `/studio`
- Plugins: Desk Tool, Vision (query playground)
- Unsplash integration available

### Querying Sanity
```typescript
import { client } from '@/sanity/lib/client';

const data = await client.fetch(query, params);
```

### Type Generation
Run `npm run typegen` after schema changes to regenerate types in `sanity/types.ts`.

## Common Patterns

### Form Validation
Use Zod schemas from `@/lib/validations/formValidations`:
```typescript
import { searchFormSchema } from '@/lib/validations/formValidations';
// All schemas typed as `any` in types/modules.d.ts
```

### Image Rendering
```tsx
import Image from '@/components/Image';

<Image 
  src="https://ik.imagekit.io/..."
  alt="Description"
  width={800}
  height={600}
  transformation={[{ width: "800", height: "600" }]}
/>
```

### Server Actions
Located in `utils/serverActions/`:
- `postActions.ts` - Post/article operations
- `sanityMigration.ts` - Sanity data migrations

### Multi-Tenant Features
The app supports multiple marketplaces via route groups:
- `(oly-auto)` - Vehicle listings
- `(oly-properties)` - Real estate
- `(oly-services)` - Service providers
- `(oly-shops)` - E-commerce products
- `(oly-hiring)` - Job postings

Each has dedicated schemas in Sanity and route-specific components.

## Testing

Test setup exists (`@testing-library/react`, `jest`) but tests are not currently in active use. Test files should be co-located with components when added.

## Known Issues & Workarounds

### TypeScript Build Requirements
- Must pass `tsc --noEmit` with zero errors for `npm run build` to succeed
- If you see React namespace errors, check `types/react-fixes.d.ts` first
- If third-party components fail JSX validation, add stubs to `types/modules.d.ts`

### Windows-Specific
- Project uses PowerShell as primary shell
- Path separators in configs use forward slashes (works cross-platform)
- Sharp binary: `@img/sharp-win32-x64` in optionalDependencies

### Package Overrides
The project enforces specific versions via `overrides` in `package.json`:
- `@types/react` and `@types/react-dom` pinned to 19.2.2
- `axios` pinned to ^1.6.2 for security
- `glob` and `inflight` updated to avoid vulnerabilities

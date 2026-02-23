You are an AI coding assistant helping me finish TypeScript and build error fixes in a Next.js + TypeScript + React 19 project.

Overall goal
Get the project to a clean TypeScript build (no errors from npx tsc --noEmit --pretty false) and a successful npm run build, using minimal, targeted fixes that preserve existing runtime behavior. Prefer type-only / any-based adjustments and small local changes over big refactors.

Project context
Stack: Next.js (App Router), TypeScript 5, React 19, @types/react@19.2.2.
Build pipeline (important for priorities):
npm run build → runs npm run extract-variables && tsc --noEmit && next build
So TypeScript must be 100% clean for build to pass.
TS config highlights:
strict: true, noEmit: true, jsx: "react-jsx", skipLibCheck: true
Path alias: @/* → project root.
Important existing fixes you MUST keep
Do not undo or aggressively tighten these; only extend/adjust as needed.

React type shim – types/react-fixes.d.ts
This file contains very loose, any-heavy augmentations for the React module to avoid “Namespace 'react' has no exported member …” errors.
It currently:
Extends React.HTMLAttributes<T> with className, value, onChange, tw.
Provides aliases: ReactNode, ReactElement, ReactPortal, Ref, RefObject, ElementRef, ComponentProps, ComponentPropsWithoutRef, PropsWithChildren, FC, CSSProperties.
Defines very loose event types: ChangeEvent, MouseEvent, FocusEvent, KeyboardEvent, FormEvent, DragEvent, AnimationEvent, TransitionEvent.
Defines loose hooks/APIs: forwardRef, memo, useState, useEffect, useRef, useCallback, useMemo, use, useId, useActionState.
Adds basic state helpers: Dispatch, SetStateAction.
Declares a loose Suspense: FC<any> and context helpers: createContext, useContext.
Guideline: If React APIs are missing (e.g. cloneElement), add small, loose definitions here, instead of touching core React typings elsewhere.
Module and library stubs – types/modules.d.ts
Contains declare module stubs for various modules that otherwise cause TS errors, for example:
@/lib/validations/formValidations with several schemas exposed as any (currently includes detailsFormSchema, searchFormSchema, feedbackFormSchema, multiStepFormSchema).
@/lib/mongoose with connectToDatabase.
Several relative modules like ./VerificationFormWrapper, ./BidInput, ./store/usePaymentProcessingStore, ../../../components/Buttons, etc.
A stub for "react-masonry-css" with a default Masonry: any.
Guideline: For third‑party components that don’t behave nicely as JSX components under our React shim (e.g. react-webcam, @react-google-maps/api), prefer adding/expanding module stubs here to make them any or React.ComponentType<any>.
Oly Image wrapper – components/Image.tsx
This is a shared Image component that wraps next/image and @imagekit/next.
The props have already been simplified to a permissive interface:
Required: src: string | { url(): string } | null | undefined
Optional: alt, className, width, height, fill, sizes, priority, loading, unoptimized, transformation?, plus [key: string]: any
It converts src to a string (src or src.url()), then either:
Renders NextImage directly, or
If NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is set and the URL starts with it, uses ImageKit with a stripped src.
Guideline: Keep OlyImageProps loose and backward‑compatible; do not re‑tighten it.
Scroll hook – hooks/useScrollAdjustments.ts
Already updated to import RefObject from React and use it in the parameter type.
Guideline: This file should compile; if you change it, preserve runtime behavior.
Other cleaned‑up pieces
components/Buttons.tsx was lightly cleaned up (props destructuring, tabIndex={disabled ? -1 : (tabIndex ?? 0)}).
lib/unsplash.tsx, utils/serverActions/postActions.ts, components/YouTubeVideo.tsx, components/ui/table.tsx, components/VerifyEmail.tsx were formatted / slightly adjusted already; keep those changes.
Current state and remaining errors (high‑level)
When npx tsc --noEmit --pretty false was last run, it still reported many errors, grouped roughly into these buckets:

React environment gaps
Example: Property 'cloneElement' does not exist on type 'typeof import("react")' in CreateAListingClient.tsx.
Action: Add a loose cloneElement signature in types/react-fixes.d.ts (e.g. export function cloneElement(...args: any[]): any;).
Missing schema exports from @/lib/validations/formValidations
Already stubbed: detailsFormSchema, searchFormSchema, feedbackFormSchema, multiStepFormSchema.
New errors: missing passwordSchema, profileSchema, and possibly others.
Action: Extend the ambient module in types/modules.d.ts to export those as any.
Third‑party JSX components that TypeScript rejects
react-webcam: Webcam used as <Webcam ... /> in selfie components; TS says it’s not a valid JSX element type.
@react-google-maps/api: GoogleMap and Marker in components/Map.tsx have similar issues.
Action: In types/modules.d.ts add:
declare module "react-webcam" { const Webcam: any; export default Webcam; }
declare module "@react-google-maps/api" { export const GoogleMap: any; export const Marker: any; export const useJsApiLoader: any; }
Keep these definitions very loose; the runtime behavior is already correct.
Sanity types and migration
sanity/types.ts: duplicate mapping for an Oly homepage query string (same key declared twice with OlyHomepageQueryResult) → TS2717.
utils/serverActions/sanityMigration.ts: client.fetch(query, params) errors with “Expected 1 arguments, but got 2.”
Actions:
In sanity/types.ts, remove or comment out one of the duplicate property declarations for the Oly homepage query key.
In sanityMigration.ts, keep the call shape but cast through any, e.g. const clientAny = client as any; return clientAny.fetch(query, params);.
Validation / React Hook Form / Zod display types
Many components are passing FieldError or FieldErrors into props typed as ReactNode (e.g. in forms and hero/search components).
Action: Where errors show up, wrap error objects in String(...) or otherwise coerce to string/ReactNode; or relax the prop type to any when easier.
Domain‑specific typing mismatches
Examples:
Accessing properties that don’t exist on domain types (_id, vehicleVariant, ads, imageUrls, etc.).
Passing string | number to props expecting string.
Many parameters implicitly typed as any (TS7006).
Image gallery / slider components with mismatches between string[], custom Image types, and GalleryImage[].
viewsData being null | number but used as plain number.
Guideline: Fix these locally and minimally:
Prefer as any casts, unions, or nullable types over redesigning core domain models.
For TS7006 implicit any, annotate parameters as any unless a specific safe type is obvious.
Misc module‑not‑found and prop‑shape issues
Some components reference modules like ./Icon, ./navButtonRight, ./navButtonLeft, etc. If they truly exist, adjust imports; if not, create small placeholder components/types or declare module stubs.
Button usage in several places passes style and other props; ensure ButtonProps in components/Buttons.tsx allows style?: React.CSSProperties (if TS complains).
How I want you to work
Start by re‑running TypeScript and summarizing errors
From the project root, run:
npx tsc --noEmit --pretty false
Group the errors by category (React env, missing modules, Sanity, validation schemas, domain types, etc.) and tell me the main buckets.
Prioritize and fix in this order a. Global / environment‑level issues
Fill any missing React APIs in types/react-fixes.d.ts (e.g. cloneElement).
Add/extend module stubs in types/modules.d.ts for:
@/lib/validations/formValidations (add passwordSchema, profileSchema, etc. as needed).
Third‑party JSX components: react-webcam, @react-google-maps/api, and any others TypeScript complains about.
Fix Sanity duplication in sanity/types.ts.
Loosen client.fetch typing in utils/serverActions/sanityMigration.ts using any.
b. High‑leverage, repeated component issues

Button props (style, etc.) in components/Buttons.tsx.
Repeated form error display issues (FieldError vs ReactNode).
Widely‑used domain components (listings, galleries, pagination) where small type relaxations unblock many errors.
c. Remaining local/domain errors

Fix remaining TS errors in a smallest‑change way:
Add explicit any for callback params where needed.
Adjust obvious nullability (e.g. viewsData ?? 0).
Use safe casts (as any) where you’re confident about runtime behavior.
After each batch of fixes
Re‑run npx tsc --noEmit --pretty false and show the new error summary.
When TypeScript is clean:
Run npm run build.
Tell me whether it succeeded and include any key warnings/errors if it failed.
Style guidelines
Preserve existing behavior; do not refactor components unless absolutely necessary for type safety.
Prefer:
Local type tweaks, casts, and optional properties.
Extending the existing React shim and module stubs.
Minimal, targeted edits over broad cross‑file changes.
Clearly explain:
What you changed,
Why it fixes the specific TS error,
Any trade‑offs (e.g. using any or loosening types).
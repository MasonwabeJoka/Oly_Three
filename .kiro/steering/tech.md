---
inclusion: always
---

# Technical Stack & Conventions

## Core Technologies

- **Next.js 15.5.0** with App Router - Use server components by default, add `'use client'` only when needed
- **React 18.3.1** - Prefer functional components with hooks
- **TypeScript 5.8.3** - Strict mode enabled, use proper typing
- **SCSS/CSS Modules** - Component-scoped styling pattern (`.module.scss`)

## Authentication & Data

- **Clerk** - Handle all user authentication, use `@clerk/nextjs` hooks
- **Sanity CMS** - Content management, run `npm run typegen` after schema changes
- **Zustand** - Global state management, keep stores focused and minimal

## Styling Guidelines

- **CSS Modules** - Every component should have a corresponding `.module.scss` file
- **Tailwind CSS** - Use when absolutely necessary prioritize sass. Example when using Schadcn components
- **SCSS Variables** - Import from `utils/variables.scss`, run `npm run extract-variables` after changes
- **Responsive Design** - Use breakpoints from `utils/breakpoints.scss`

## Component Patterns

- **File Structure** - `ComponentName.tsx` + `ComponentName.module.scss`
- **Client Components** - Mark with `'use client'` directive at top of file
- **Props Interface** - Define TypeScript interfaces for all component props
- **CSS Classes** - Use camelCase for CSS module class names

## File Handling

- **UploadThing** - I've not yet made up my mind about its use. Important considerations are cost, use Sanity as much as possible but only if its a good and proper solution to the task.
- **Video Handling** - Use Next Video for video content

## Development Workflow

```bash
# Start development
npm run dev

# Before committing
npm run lint
npm run build

# After Sanity schema changes
npm run typegen

# After SCSS variable changes
npm run extract-variables
```

## Code Quality Rules

- Use TypeScript strict mode - no `any` types
- Implement proper error boundaries
- Follow Next.js App Router conventions
- Use server components for data fetching
- Implement proper loading and error states
- Use React Hook Form with Zod validation for forms

## Build Dependencies

1. SCSS variable extraction (`extract-variables.js`)
2. TypeScript compilation with strict checks
3. Sanity type generation
4. Next.js optimization and bundling

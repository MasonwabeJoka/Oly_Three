# Project Structure

## App Router Organization

- `app/` - Next.js App Router with route groups
  - `(root)/` - Main public pages
  - `(auth)/` - Authentication pages
  - `(dashboard)/` - User dashboard
  - `(oly-*)` - Feature-specific route groups (auto, hiring, properties, services, shops)
  - `api/` - API routes
  - `admin/` - Admin interface
  - `studio/` - Sanity Studio CMS

## Component Architecture

- `components/` - Reusable UI components
  - Each component has `.tsx` + `.module.scss` files
  - Organized by feature: `buttons/`, `cards/`, `forms/`, `layouts/`, `modals/`
  - Client components marked with `'use client'` directive

## Data & State

- `data/` - Static data, configurations, and mock data
- `store/` - Zustand state management stores
- `hooks/` - Custom React hooks
- `lib/` - Utility libraries and configurations
- `utils/` - Helper functions and utilities

## Content Management

- `sanity/` - Sanity CMS configuration
  - `schemaTypes/` - Content schemas
  - `lib/` - Sanity utilities
- `features/` - Feature-specific logic (messages, feed, settings)

## Styling Conventions

- CSS Modules pattern: `Component.module.scss`
- Global styles in `app/global-styles/`
- SCSS variables in `utils/variables.scss`
- Responsive breakpoints in `utils/breakpoints.scss`

## File Naming

- Components: PascalCase (`NavBar.tsx`)
- Styles: Component name + `.module.scss`
- Pages: lowercase with hyphens for routes
- Utilities: camelCase

## Import Patterns

- Absolute imports using `@/` alias
- Component + styles imported together
- Type-only imports marked with `import type`

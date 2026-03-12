# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 application using the App Router architecture with HeroUI v2 components. The site appears to be an e-commerce platform for art market prints, integrated with Sanity CMS for content management.

Key technologies:
- Next.js 14 (App Directory)
- HeroUI v2 component library
- Tailwind CSS for styling
- TypeScript for type safety
- Sanity CMS for content management
- React Server Components and Server Actions

## Common Development Commands

### Development
```bash
npm run dev
```
Starts the development server with Turbopack.

### Building
```bash
npm run build
```
Builds the production version of the application.

### Linting
```bash
npm run lint
```
Runs ESLint with automatic fixing of issues.

### Start Production Server
```bash
npm run start
```
Starts the production server.

## Project Architecture

### Directory Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable UI components
- `sanity/` - Sanity CMS integration and schemas
- `lib/` - Utility functions and shared logic
- `hooks/` - Custom React hooks
- `public/` - Static assets
- `styles/` - Global styles and Tailwind configuration

### Key Patterns
1. **App Router Structure**: Uses Next.js 14 App Router with route groups like `(app)` and `(store)`
2. **Server Components**: Heavy use of React Server Components for data fetching
3. **Sanity Integration**: Content managed through Sanity CMS with typed schemas
4. **HeroUI Components**: UI built with HeroUI v2 component library
5. **TypeScript**: Strict typing throughout with path aliases (`@/*`)

### Data Flow
1. Content is managed in Sanity CMS
2. Data is fetched using `next-sanity` client
3. Server Components handle data fetching
4. Client Components handle interactivity
5. Server Actions handle mutations and form submissions

## Development Guidelines

### Component Organization
- Use HeroUI v2 components as the primary UI library
- Separate shared components in `components/shared/`
- UI-specific components in `components/ui/`
- Layout components in `components/layout/`

### Styling
- Use Tailwind CSS with Tailwind Variants for consistent styling
- Leverage the existing theme configuration
- Use clsx/tailwind-merge for conditional classnames

### Content Management
- All content schemas are defined in `sanity/schemas/`
- Use the Sanity client in `sanity/client.ts` for data fetching
- Server Components should handle most data fetching needs

### Testing
Currently, there's no explicit testing setup mentioned in the configuration files. When adding tests, follow Next.js testing recommendations with Jest and React Testing Library.

## Important Configuration Files

- `next.config.js` - Next.js configuration with Sanity image optimization
- `tsconfig.json` - TypeScript configuration with path aliases
- `tailwind.config.js` - Tailwind CSS configuration
- `sanity/client.ts` - Sanity CMS client configuration
- `.eslintrc.json` - ESLint configuration with strict rules

## Environment Variables

The application uses Sanity CMS, so ensure these environment variables are set:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_TOKEN`
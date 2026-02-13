# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shelfie App — a React Native reading list manager built with Expo (managed workflow). Users authenticate, then create/view/delete books on their personal shelf. Real-time sync keeps data current across sessions.

## Commands

```bash
npx expo start          # Start dev server (press i for iOS, a for Android, w for web)
npx expo start --ios    # Start directly on iOS simulator
npx expo start --android # Start directly on Android emulator
npx expo start --web    # Start in browser
```

No test runner or linter is configured.

## Architecture

**Routing**: Expo Router (file-based, under `app/`). Root layout wraps the app in context providers. Two route groups:
- `(auth)/` — login and register screens, guarded by `NotLoggedInUserOnly` (redirects authenticated users away)
- `(dashboard)/` — tab navigator (profile, books, create) with dynamic route `books/[id]` for details

**State management**: React Context API with two providers:
- `UserContext` — auth state, login/register/logout functions, session persistence
- `BooksContext` — CRUD operations, Appwrite real-time subscriptions for live updates

Access contexts via `useUser()` and `useBooks()` hooks in `hooks/`.

**Backend**: Appwrite (BaaS) configured in `lib/appwrite.ts`. Handles auth (email/password), database (books collection with userId, title, author, description), and real-time subscriptions on the books collection.

**Theming**: Themed component wrappers (`components/Themed*.tsx`) adapt to device dark/light mode using color constants from `constants/colors.ts`.

**Auth guards**: `components/auth/LoggedInUserOnly.tsx` and `NotLoggedInUserOnly.tsx` conditionally render children based on auth state.

## Key Files

- `app/_layout.tsx` — root layout, wraps providers
- `lib/appwrite.ts` — Appwrite client, database/collection IDs
- `context/UserContext.tsx` — auth logic
- `context/BooksContext.tsx` — book CRUD + real-time sync
- `constants/colors.ts` — theme color definitions

## TypeScript

Strict mode enabled. Types live in `types/`. Extends `expo/tsconfig.base`.


# Expo-Specific Constraints

Claude must respect the Expo managed workflow.

### DO NOT:

-   Add native modules that require ejecting without explicit instruction
-   Modify ios/ or android/ folders (unless project uses prebuild intentionally)
-   Suggest bare React Native solutions
-   Add libraries incompatible with Expo

### When Adding Dependencies:

-   Prefer Expo-compatible libraries
-   Prefer `expo-*` packages when available
-   If a library requires config plugins, document it clearly

* * *

# Architecture

## Folder Structure

```
src/
  app/                # If using Expo Router
  components/
  screens/            # If not using Expo Router
  hooks/
  services/
  store/
  utils/
  theme/
  constants/
  types/
```

* * *

## Architectural Rules

-   Functional components only
-   Use hooks for logic extraction
-   Screens should be thin
-   No API calls inside components
-   Business logic belongs in:
    
    -   hooks/
    -   services/
-   Shared logic must not live inside screens

* * *

# Navigation

If using **Expo Router**:

-   Follow file-based routing
-   Do not manually configure navigation unless necessary
-   Use typed route params
-   Keep layout files clean and minimal

If using **React Navigation**:

-   All navigation config lives in `src/navigation`
-   Use typed navigation params
-   Avoid inline navigation objects inside screens

* * *

# State Management

### Global State

Use global state only when necessary.

Good use cases:

-   Authentication
-   User preferences
-   Theme mode

Avoid:

-   Duplicating server state
-   Overusing global state

* * *

### Server State

-   Must use TanStack Query
-   Never duplicate server data in Zustand/Redux
-   Always define query keys clearly
-   Always handle loading + error states

* * *

# Networking

-   All API logic goes in `src/services`
-   Centralized API client
-   Environment-based baseURL
-   Typed request + response models
-   Errors must propagate upward
-   No silent catches

* * *

# Environment Variables

Use Expo environment handling:

-   `app.config.ts` or `app.json`
-   `process.env.EXPO_PUBLIC_*` for public values
-   Never hardcode secrets

Never commit sensitive values.

* * *

# Styling

-   Use `StyleSheet.create`
-   No large inline style objects
-   Use centralized theme tokens
-   No hardcoded colors
-   Respect spacing scale
-   Support dark mode if enabled

* * *

# Performance Rules

-   Use `FlatList` properly (keyExtractor required)
-   Avoid inline functions inside large lists
-   Memoize heavy components
-   Avoid unnecessary re-renders
-   Lazy load heavy screens when possible

* * *

# Assets

-   Store static assets in `/assets`
-   Use `expo-asset` if needed
-   Optimize images
-   Prefer SVG where appropriate

* * *

# Permissions

When adding permissions:

-   Use Expo APIs (Camera, Location, etc.)
-   Add required config in `app.json`
-   Provide user-facing permission explanations

Never request unnecessary permissions.

* * *

# EAS & Builds

-   Do not modify build profiles without instruction
-   Keep changes compatible with EAS
-   If adding native features, confirm they work with Expo prebuild

* * *

# Testing

-   Jest
-   React Native Testing Library
-   Test behavior, not implementation
-   Mock network requests
-   Avoid snapshot overuse

* * *

# Accessibility

-   All touchables must have accessibilityLabel
-   Support screen readers
-   Respect font scaling
-   Ensure sufficient color contrast

* * *

# Error Handling Philosophy

-   User-friendly error messages
-   Technical logs in development only
-   Never expose raw backend errors
-   Always handle loading and error states

* * *

# When Making Changes

Claude must:

-   Keep changes minimal and scoped
-   Preserve architectural consistency
-   Avoid introducing new dependencies casually
-   Not refactor unrelated code
-   Follow existing patterns
-   Prefer consistency over cleverness

* * *

# When Adding Features

1.  Define types
2.  Add service layer logic
3.  Add query hook (if server data)
4.  Add UI components
5.  Integrate into screen/router
6.  Add tests

* * *

# Things To Avoid

-   Large refactors without request
-   Mixing UI and business logic
-   Deep prop drilling
-   Overengineering simple features
-   Introducing native-only solutions
-   Suggesting ejecting from Expo without explicit instruction

* * *

# Code Quality Rules

-   Strict TypeScript
-   No `any`
-   Explicit return types for exported functions
-   Named exports preferred
-   Async/await over raw promises
-   ESLint + Prettier enforced

* * *

# If Unsure

When unclear:

-   Follow existing patterns in the codebase
-   Ask for clarification before major architectural changes
-   Do not guess about build configuration


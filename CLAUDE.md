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

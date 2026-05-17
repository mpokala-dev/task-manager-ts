# Task Manager — TypeScript + React

A production-quality task management app built with modern TypeScript and React 19.

🔗 **Live Demo:** https://task-manager-ts-gamma.vercel.app

## TypeScript concepts demonstrated
- `const` object pattern with `as const` (modern alternative to enums)
- `import type` with `verbatimModuleSyntax`
- Interfaces, union types, utility types (`Partial`, `Omit`)
- Generic typed `useState` hooks
- Strict null checks and type guards

## Tech stack
- React 19
- TypeScript 5.9 (strict mode)
- Vite 6 + SWC
- Tailwind CSS v4
- localStorage persistence

## Features
- Add tasks with title, description and priority
- Mark tasks complete / pending
- Filter by status and priority
- Persists across page refreshes
- Fully typed — zero `any` in the codebase

## Run locally
npm install
npm run dev

## Tests
- 17+ tests with Vitest + React Testing Library
- 91% statement coverage across hooks, components and types
- Run tests: `npm test`
- Run coverage: `npm run coverage`

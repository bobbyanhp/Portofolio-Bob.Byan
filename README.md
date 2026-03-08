# Bob Byan Portfolio

Personal portfolio website built with Next.js App Router, React, TypeScript, and Tailwind CSS v4.

## Tech Stack

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 4

## Prerequisites

- Node.js 20 LTS (recommended)
- npm (bundled with Node.js)

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build for Production

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push project ke GitHub.
2. Import repo di Vercel.
3. Framework preset: `Next.js`.
4. Build command: `npm run build`.
5. Output setting: default (otomatis oleh Next.js).

## Project Structure

```text
app/
  components/
    sections/
      AboutSection.tsx
      CareerSection.tsx
      HeroSection.tsx
      PortfolioSection.tsx
    ui/
      Sprinkles.tsx
  lib/
    portfolio-data.ts
  layout.tsx
  page.tsx
```

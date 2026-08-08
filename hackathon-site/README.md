# Hackathon Site

A Next.js App Router project built for hackathon submission with mobile-first design, animations, and optional 3D accents.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Route Map

| Route | Description |
|-------|-------------|
| `/` | Home / Landing page |
| `/dashboard` | Dashboard view |
| `/day/12` | Day 12 detail view |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (mobile-first)
- **Animations**: Motion (Framer Motion successor)
- **3D**: Three.js, React Three Fiber, React Three Drei
- **Linting**: ESLint (Next.js config)

## Project Structure

```
app/
├── globals.css          # Global styles & design tokens
├── layout.tsx           # Root layout (Server Component)
├── page.tsx             # Home route (/)
├── dashboard/
│   └── page.tsx         # Dashboard route (/dashboard)
└── day/
    └── 12/
        └── page.tsx     # Day 12 route (/day/12)
```

## Design System

Design tokens defined in `tailwind.config.ts`:
- **Colors**: Primary, Neutral, Accent palettes
- **Typography**: Fluid scale with clamp()
- **Spacing**: Consistent 4px base unit
- **Radii**: 6-step scale
- **Elevation**: 7-step shadow scale
- **Breakpoints**: xs (390px), sm, md, lg, xl, 2xl

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Deployment

Deploy easily on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app).
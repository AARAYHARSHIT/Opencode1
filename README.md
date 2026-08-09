# ABTalks — 60-Day Coding Challenge

A mobile-first hackathon platform built with Next.js 16 (App Router), designed to help developers build a daily coding habit through a 60-day challenge with streak tracking, XP progression, achievements, and a 3D-powered landing experience.

## Getting Started

```bash

# Change directory
cd hackathon-site
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
open http://localhost:3000
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero section, 3D accent, how-it-works, testimonials, CTA |
| `/dashboard` | Personal dashboard with stats, streaks, progress timeline, achievements |
| `/achievements` | Full achievements gallery with category filtering and progress tracking |
| `/day/[day]` | Individual day detail with task info, submission form, coach messages |
| `/day/12` | Static Day 12 detail view (overrides dynamic route) |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.3.0 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Motion v13 (Framer Motion successor) |
| 3D | Three.js, React Three Fiber, React Three Drei |
| Linting | ESLint 9 (Next.js config) |

## Project Structure

```
hackathon-site/
├── app/
│   ├── globals.css              # Global styles, design tokens, utilities
│   ├── layout.tsx               # Root layout (Server Component, Geist fonts)
│   ├── page.tsx                 # Landing page (/)
│   ├── dashboard/
│   │   └── page.tsx             # Dashboard (/dashboard)
│   ├── achievements/
│   │   └── page.tsx             # Achievements gallery (/achievements)
│   └── day/
│       ├── [day]/
│       │   └── page.tsx         # Dynamic day route (/day/:day)
│       └── 12/
│           └── page.tsx         # Static day 12 view (/day/12)
├── components/
│   ├── animations.tsx           # ScrollReveal, StaggerContainer, HoverLift
│   ├── scene3d-wrapper.tsx      # SSR-safe 3D wrapper with capability detection
│   ├── three-scene.tsx          # Three.js 3D coding-themed scene
│   └── ui/
│       ├── badge.tsx            # Badge, StatusBadge
│       ├── button.tsx           # Button (5 variants, 4 sizes)
│       ├── card.tsx             # Card, CardHeader, CardTitle, etc.
│       ├── empty-state.tsx      # EmptyState + 6 specialized variants
│       ├── mobile-nav.tsx       # MobileNav, MobileHeader, DesktopHeader
│       ├── progress.tsx         # Progress, CircularProgress, StepProgress
│       ├── section-header.tsx   # SectionHeader, PageHeader, DayHeader
│       └── streak-display.tsx   # StreakDisplay, StreakFlame
├── data/
│   └── challenge.json           # Mock data (4 variants: default, fresh, missed-day, empty-profile)
├── lib/
│   ├── coach.ts                 # Motivational message generation
│   ├── data.ts                  # Data access layer (17 query functions)
│   └── types.ts                 # TypeScript interfaces (16 types)
├── tailwind.config.ts           # Design system tokens (colors, typography, spacing)
└── package.json
```

## Design System

Tokens defined in `tailwind.config.ts`:

- **Colors**: Primary (orange), Neutral (slate), Accent (yellow), Green, Red, Amber — each with 50–950 shades
- **Typography**: Fluid scale using `clamp()` for display/heading sizes
- **Spacing**: 4px base unit
- **Border Radii**: 8-step scale (none → full)
- **Shadows**: 10-step scale including glow effects
- **Breakpoints**: xs (390px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Custom Utilities**: `glass`, `glass-strong`, `bg-grid`, `text-gradient`, `glow-ring`

## Data Layer

The app uses static mock data with 4 variants to demonstrate different user states:

| Variant | Description |
|---------|-------------|
| `default` | Active user with 18 days completed, 7-day streak, level 3 |
| `fresh` | New user with zero progress |
| `missed-day` | User who missed a day (streak reset) |
| `empty-profile` | User with no profile data |

Data functions in `lib/data.ts` provide typed accessors for profiles, tasks, submissions, streaks, achievements, and dashboard stats.

## 3D Scene

The landing page features a coding-themed 3D scene with:
- Animated code bracket mesh with orange glow
- Wireframe outer shell with yellow accent
- Floating particles representing data/code flow
- Auto-rotation with orbit controls
- Capability detection (WebGL, device tier, reduced-motion)
- Graceful SVG fallback for unsupported devices

## Development

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint
```



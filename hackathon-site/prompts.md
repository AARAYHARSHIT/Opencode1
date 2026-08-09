# AI Usage Log — ABTalks Hackathon Site

This document logs all AI-assisted prompts used to build the 60-Day Coding Challenge hackathon website.

---

## Session 1: Project Scaffolding & Initial Build

### Prompt 1
> Create a Next.js 16 App Router project with TypeScript, Tailwind CSS v4, and a hackathon landing page for a 60-day coding challenge called "ABTalks".

**AI Output:** Project scaffolding with `app/page.tsx`, `app/layout.tsx`, `tailwind.config.ts`, `package.json`, and initial design system tokens.

---

### Prompt 2
> Add a dashboard page at `/dashboard` with stat cards (streak, XP, completion), a 60-day progress timeline, today's task, coach messages, and recent achievements.

**AI Output:** `app/dashboard/page.tsx` with stat cards, StepProgress timeline, coach banner, task card, and achievement grid using mock data from `lib/data.ts`.

---

### Prompt 3
> Create a data layer with mock data for 4 user variants (default, fresh, missed-day, empty-profile) including profile, tasks, submissions, streaks, and achievements.

**AI Output:** `data/challenge.json` with 254 lines of structured mock data, `lib/data.ts` with 17 query functions, and `lib/types.ts` with 16 TypeScript interfaces.

---

### Prompt 4
> Build a reusable UI component library with Button, Card, Badge, Progress, CircularProgress, StepProgress, StreakDisplay, SectionHeader, EmptyState, and MobileNav.

**AI Output:** 9 component files under `components/ui/` with barrel exports in `index.ts`, supporting 5 button variants, 4 sizes, glass morphism styling, and responsive mobile navigation.

---

### Prompt 5
> Add a day detail page at `/day/[day]` with task info, acceptance criteria, coach card, submission form with GitHub/LinkedIn URL validation, and prev/next navigation.

**AI Output:** `app/day/[day]/page.tsx` with LockedDayView, CoachCard, SubmissionForm sub-components, URL regex validation, and dynamic routing.

---

### Prompt 6
> Add scroll animations using Motion (Framer Motion successor) with ScrollReveal, StaggerContainer, StaggerItem, HoverLift, and GestureCard components.

**AI Output:** `components/animations.tsx` with 5 animation wrapper components using IntersectionObserver and Motion's `whileInView` API.

---

## Session 2: 3D Scene & Polish

### Prompt 7
> Add an interactive 3D scene to the landing page using Three.js, React Three Fiber, and React Three Drei with capability detection for low-end devices.

**AI Output:** `components/three-scene.tsx` with torus knot mesh, `components/scene3d-wrapper.tsx` with WebGL/WebGL2 detection, reduced-motion check, and SVG fallback.

---

### Prompt 8
> Improve the 3D scene to be coding-themed instead of a generic torus knot. Use geometric shapes that represent code/data with floating particles and an orange/yellow color scheme matching the brand.

**AI Output:** Replaced torus knot with octahedron (inner crystal), icosahedron (wireframe shell), dodecahedron (core glow), 80 floating particles with color gradient, and adjusted lighting for depth.

---

### Prompt 9
> Add a coach system that generates motivational messages based on streak status, completion percentage, and time of day.

**AI Output:** `lib/coach.ts` with `generateCoachMessage()` function producing context-aware titles, messages, and action buttons based on user progress state.

---

## Session 3: Improvements & Missing Pages

### Prompt 10
> Improve the README with correct Next.js 16 version, complete project structure including all routes, full tech stack table, data layer documentation, and 3D scene description.

**AI Output:** Rewrote `README.md` from 83 lines of generic content to comprehensive documentation with accurate version numbers, complete file tree, design system tokens, data variant table, and development commands.

---

### Prompt 11
> Add dummy values for the Progress section in the dashboard. Make the XP and Completion cards show additional context like percentage to next level and days remaining.

**AI Output:** Enhanced dashboard stat cards with percentage-to-next-level text under XP Progress bar and days-remaining text under Completion Progress bar.

---

### Prompt 12
> Create an achievements page at `/achievements` with category filtering, a progress overview card showing unlocked/locked/ready-to-claim counts, and a grid of achievement cards with progress bars.

**AI Output:** `app/achievements/page.tsx` with 12 additional dummy achievements across 4 categories (streak, completion, xp, special), category filter buttons, stat overview card, and staggered grid layout.

---

### Prompt 13
> Add a back button to the dashboard so users can return to the homepage.

**AI Output:** Added `showBack={true}` and `backHref="/"` props to the MobileHeader component in `app/dashboard/page.tsx`, enabling the existing back arrow navigation.

---

## Session 4: Progress Page & Bug Fixes

### Prompt 14
> Create a progress page at `/progress` that shows progress overview when there is progress, or "Currently No Progress" message with tasks remaining when there's no progress. Include a return button to dashboard.

**AI Output:** `app/progress/page.tsx` with completion stats, XP tracking, streak display, 60-day journey timeline, missed tasks section, upcoming tasks section, and return to dashboard button. Handles empty profile and no progress states gracefully.

---

### Prompt 15
> Fix the mobile nav Today link to use actual day number instead of hardcoded day 12. Fix the 3D element cropping by repositioning it to blend into the website properly without showing edges.

**AI Output:** Updated `components/ui/mobile-nav.tsx` to dynamically link to today's day. Repositioned 3D scene in `components/scene3d-wrapper.tsx` as absolute overlay with reduced opacity. Removed Html overlay from `components/three-scene.tsx` and adjusted camera settings for better integration.

---

## Summary

| Metric | Count |
|--------|-------|
| Total Prompts | 15 |
| Files Created | 13 |
| Files Modified | 6 |
| Lines of Code | ~2,900+ |
| Components Built | 15+ |
| Pages Implemented | 6 |

### Tools Used
- **AI Model:** opencode/mimo-v2-5-free
- **Framework:** Next.js 16.3.0 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Motion v13
- **3D:** Three.js + React Three Fiber + React Three Drei
- **Languages:** TypeScript, CSS

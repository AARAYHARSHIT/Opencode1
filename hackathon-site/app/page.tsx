import { ScrollReveal, StaggerContainer, StaggerItem, HoverLift } from "@/components/animations";
import { Scene3DWrapper } from "@/components/scene3d-wrapper";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-palette-neutral-50 dark:bg-palette-neutral-950">
      <header className="border-b border-palette-neutral-200 dark:border-palette-neutral-800">
        <nav className="container mx-auto px-4 xs:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-heading-md font-semibold text-palette-neutral-900 dark:text-palette-neutral-50">
            Hackathon Site
          </h1>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-body-sm font-medium text-palette-primary-600 dark:text-palette-primary-400 hover:underline"
            >
              Dashboard
            </Link>
            <Link
              href="/day/12"
              className="text-body-sm font-medium text-palette-primary-600 dark:text-palette-primary-400 hover:underline"
            >
              Day 12
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 xs:px-6 lg:px-8 py-12 xs:py-16 lg:py-24">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-display-xl font-semibold text-palette-neutral-900 dark:text-palette-neutral-50 tracking-tight">
              Build Faster with a Solid Foundation
            </h2>
            <p className="mt-4 xs:mt-6 text-body-lg text-palette-neutral-600 dark:text-palette-neutral-400 max-w-2xl mx-auto">
              Next.js App Router + Tailwind CSS + Motion + Three.js — mobile-first, performant, and ready for hackathon speed.
            </p>
          </div>
        </ScrollReveal>

        <Scene3DWrapper />

        <StaggerContainer staggerDelay={0.1} className="mt-12 xs:mt-16 lg:mt-20">
          <StaggerItem>
            <HoverLift className="bg-white dark:bg-palette-neutral-900 rounded-xl p-6 xs:p-8 shadow-sm border border-palette-neutral-200 dark:border-palette-neutral-800">
              <h3 className="text-heading-lg font-semibold text-palette-neutral-900 dark:text-palette-neutral-50 mb-3">
                Mobile-First Design
              </h3>
              <p className="text-body-md text-palette-neutral-600 dark:text-palette-neutral-400">
                Designed for 390px baseline with fluid scaling. Desktop is a progressive enhancement.
              </p>
            </HoverLift>
          </StaggerItem>

          <StaggerItem>
            <HoverLift className="bg-white dark:bg-palette-neutral-900 rounded-xl p-6 xs:p-8 shadow-sm border border-palette-neutral-200 dark:border-palette-neutral-800">
              <h3 className="text-heading-lg font-semibold text-palette-neutral-900 dark:text-palette-neutral-50 mb-3">
                Design Tokens
              </h3>
              <p className="text-body-md text-palette-neutral-600 dark:text-palette-neutral-400">
                Colors, typography, spacing, radii, shadows — all in tailwind.config.ts, accessible via palette-*.
              </p>
            </HoverLift>
          </StaggerItem>

          <StaggerItem>
            <HoverLift className="bg-white dark:bg-palette-neutral-900 rounded-xl p-6 xs:p-8 shadow-sm border border-palette-neutral-200 dark:border-palette-neutral-800">
              <h3 className="text-heading-lg font-semibold text-palette-neutral-900 dark:text-palette-neutral-50 mb-3">
                Animations & 3D Ready
              </h3>
              <p className="text-body-md text-palette-neutral-600 dark:text-palette-neutral-400">
                Motion for transitions, R3F for 3D accents. All client components marked &ldquo;use client&rdquo;.
              </p>
            </HoverLift>
          </StaggerItem>
        </StaggerContainer>

        <ScrollReveal direction="up" delay={0.3} className="mt-16 xs:mt-20 lg:mt-24 text-center">
          <div className="flex flex-col xs:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 text-body-md font-medium text-white bg-palette-primary-600 rounded-lg hover:bg-palette-primary-700 transition-colors w-full xs:w-auto"
            >
              View Dashboard
            </Link>
            <Link
              href="/day/12"
              className="inline-flex items-center justify-center px-6 py-3 text-body-md font-medium text-palette-primary-600 dark:text-palette-primary-400 border-2 border-palette-primary-600 dark:border-palette-primary-400 rounded-lg hover:bg-palette-primary-50 dark:hover:bg-palette-primary-950/20 transition-colors w-full xs:w-auto"
            >
              View Day 12
            </Link>
          </div>
        </ScrollReveal>
      </main>

      <footer className="border-t border-palette-neutral-200 dark:border-palette-neutral-800 py-8">
        <div className="container mx-auto px-4 xs:px-6 lg:px-8 text-center">
          <p className="text-body-sm text-palette-neutral-500 dark:text-palette-neutral-400">
            Built for hackathon submission · Next.js 15 · Tailwind CSS v4
          </p>
        </div>
      </footer>
    </div>
  );
}
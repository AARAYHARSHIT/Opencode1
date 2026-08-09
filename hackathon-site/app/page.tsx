"use client";

import { useEffect, useState } from "react";
import { ScrollReveal, StaggerContainer, StaggerItem, HoverLift } from "@/components/animations";
import { Scene3DWrapper } from "@/components/scene3d-wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/ui/section-header";

function DeviceCapabilityCheck() {
  const [canRun3D, setCanRun3D] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkCapability = () => {
      if (typeof window === "undefined") return;
      
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      const hasWebGL = !!gl;
      const hasWebGL2 = !!window.WebGL2RenderingContext;
      const dpr = window.devicePixelRatio || 1;
      const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      const canRun = hasWebGL && hasWebGL2 && dpr <= 2 && !isLowEnd && !prefersReducedMotion;
      setCanRun3D(canRun);
      setChecked(true);
    };

    if (document.readyState === "complete") {
      checkCapability();
    } else {
      window.addEventListener("load", checkCapability);
      return () => window.removeEventListener("load", checkCapability);
    }
  }, []);

  if (!checked) return null;
  if (!canRun3D) return null;

  return <Scene3DWrapper />;
}

const howItWorks = [
  { step: "01", title: "Join the Challenge", description: "Create your profile and commit to 60 days of daily coding. No experience required — just consistency." },
  { step: "02", title: "Daily Proof of Work", description: "Each day: complete a coding task, push a GitHub commit, and share a LinkedIn post about what you learned." },
  { step: "03", title: "Build in Public", description: "Your streak, commits, and posts are visible. Accountability drives progress. The community sees your growth." },
  { step: "04", title: "Transform in 60 Days", description: "Habit formed. Portfolio grown. Network expanded. You're now a developer who ships daily." },
];

const socialProof = [
  { name: "Sarah Chen", role: "Frontend Engineer", company: "Vercel", quote: "The 60-day challenge forced me to code daily. My GitHub graph went from sparse to solid green. Got promoted 3 months later." },
  { name: "Marcus Johnson", role: "Full Stack Dev", company: "Stripe", quote: "Posting on LinkedIn daily felt awkward at first. Now I have 5K+ followers and recruiters reach out weekly. Best career investment." },
  { name: "Priya Patel", role: "Software Engineer", company: "Airbnb", quote: "Missed day 23, thought I failed. The recovery nudge brought me back. Finished 60 days. The streak mechanic works." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-palette-neutral-50 dark:bg-palette-neutral-950">
      <header className="border-b border-palette-neutral-200 dark:border-palette-neutral-800">
        <nav className="container mx-auto px-4 xs:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="ABTalks Home">
            <svg className="w-8 h-8 text-palette-primary-600 dark:text-palette-primary-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-heading-lg font-bold text-palette-neutral-900 dark:text-palette-neutral-50">ABTalks</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hidden sm:inline-flex text-body-sm font-medium text-palette-primary-600 dark:text-palette-primary-400 hover:underline">
              Dashboard
            </Link>
            <Link href="/day/1" className="inline-flex items-center justify-center px-4 py-2 text-body-sm font-medium text-white bg-palette-primary-600 rounded-lg hover:bg-palette-primary-700 transition-colors">
              Start Challenge
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative">
        <section className="relative min-h-[70vh] xs:min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-palette-primary-50 via-white to-palette-neutral-50 dark:from-palette-primary-950/20 dark:via-palette-neutral-950 dark:to-palette-neutral-950" />
          <DeviceCapabilityCheck />
          
          <div className="relative container mx-auto px-4 xs:px-6 lg:px-8 py-16 xs:py-24 lg:py-32 z-10">
            <ScrollReveal direction="up">
              <div className="text-center max-w-4xl mx-auto">
                <Badge variant="primary" size="lg" className="mb-6 inline-flex">
                  <span className="mr-1">🚀</span> 60-Day Coding Challenge
                </Badge>
                <h1 className="text-display-xl xs:text-display-lg lg:text-display-xl font-semibold text-palette-neutral-900 dark:text-palette-neutral-50 tracking-tight leading-tight">
                  Build the habit of <span className="text-palette-primary-600 dark:text-palette-primary-400">daily proof of work</span>
                </h1>
                <p className="mt-6 xs:mt-8 text-body-lg xs:text-body-xl text-palette-neutral-600 dark:text-palette-neutral-400 max-w-2xl mx-auto leading-relaxed">
                  60 days. One coding task daily. Two proofs: a GitHub commit + a LinkedIn post. 
                  Transform from sporadic coder to consistent builder. Join 1,000+ developers shipping in public.
                </p>
                <div className="mt-8 xs:mt-10 flex flex-col xs:flex-row items-center justify-center gap-4">
                  <Link href="/day/1">
                    <Button size="xl" className="w-full xs:w-auto">
                      Start Day 1 →
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button variant="outline" size="xl" className="w-full xs:w-auto">
                      How It Works
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="mt-16 xs:mt-20">
              <div className="flex flex-col xs:flex-row items-center justify-center gap-8 text-center xs:text-left">
                <div className="flex flex-col xs:flex-row items-center xs:items-center gap-6 xs:gap-8">
                  <div>
                    <p className="text-display-md font-bold text-palette-primary-600 dark:text-palette-primary-400 tabular-nums">1,247</p>
                    <p className="text-body-sm text-palette-neutral-500 dark:text-palette-neutral-400">Active Builders</p>
                  </div>
                  <div className="border-l border-palette-neutral-200 dark:border-palette-neutral-700 pl-6 xs:pl-8">
                    <p className="text-display-md font-bold text-palette-accent-600 dark:text-palette-accent-400 tabular-nums">89%</p>
                    <p className="text-body-sm text-palette-neutral-500 dark:text-palette-neutral-400">Completion Rate</p>
                  </div>
                  <div className="border-l border-palette-neutral-200 dark:border-palette-neutral-700 pl-6 xs:pl-8">
                    <p className="text-display-md font-bold text-palette-green-600 dark:text-palette-green-400 tabular-nums">4.8</p>
                    <p className="text-body-sm text-palette-neutral-500 dark:text-palette-neutral-400">Avg Rating</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="how-it-works" className="py-16 xs:py-24 lg:py-32 bg-white dark:bg-palette-neutral-950">
          <div className="container mx-auto px-4 xs:px-6 lg:px-8">
            <SectionHeader
              title="How It Works"
              description="Four simple steps to build a daily coding habit that sticks"
              variant="default"
              delay={0}
            />

            <StaggerContainer staggerDelay={0.1} className="mt-12">
              {howItWorks.map((item, index) => (
                <StaggerItem key={item.step}>
                  <HoverLift className="bg-palette-neutral-50 dark:bg-palette-neutral-900 rounded-2xl p-6 xs:p-8 border border-palette-neutral-200 dark:border-palette-neutral-800">
                    <div className="flex flex-col xs:flex-row xs:items-start gap-4 xs:gap-6">
                      <div className="flex-shrink-0 w-14 h-14 xs:w-16 xs:h-16 rounded-xl bg-palette-primary-100 dark:bg-palette-primary-900/30 flex items-center justify-center">
                        <span className="text-display-sm font-bold text-palette-primary-600 dark:text-palette-primary-400 font-mono">{item.step}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-heading-lg font-semibold text-palette-neutral-900 dark:text-palette-neutral-50">{item.title}</h3>
                        <p className="mt-2 text-body-md text-palette-neutral-600 dark:text-palette-neutral-400">{item.description}</p>
                      </div>
                    </div>
                  </HoverLift>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="py-16 xs:py-24 lg:py-32 bg-palette-neutral-50 dark:bg-palette-neutral-950">
          <div className="container mx-auto px-4 xs:px-6 lg:px-8">
            <SectionHeader
              title="What Builders Say"
              description="Real developers. Real results. No marketing fluff."
              variant="default"
              delay={0}
            />

            <StaggerContainer staggerDelay={0.1} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {socialProof.map((item, index) => (
                <StaggerItem key={item.name}>
                  <Card variant="elevated" padding="lg" className="h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-palette-primary-100 dark:bg-palette-primary-900/30 flex items-center justify-center">
                        <span className="text-heading-md font-bold text-palette-primary-600 dark:text-palette-primary-400">
                          {item.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-body-sm font-medium text-palette-neutral-900 dark:text-palette-neutral-50">{item.name}</p>
                        <p className="text-caption text-palette-neutral-500 dark:text-palette-neutral-400">{item.role} @ {item.company}</p>
                      </div>
                    </div>
                    <p className="text-body-md text-palette-neutral-700 dark:text-palette-neutral-300 italic">&ldquo;{item.quote}&rdquo;</p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="py-16 xs:py-24 lg:py-32 bg-palette-primary-600 dark:bg-palette-primary-700">
          <div className="container mx-auto px-4 xs:px-6 lg:px-8 text-center">
            <ScrollReveal direction="up">
              <h2 className="text-display-md xs:text-display-lg font-semibold text-white tracking-tight">
                Ready to build your daily coding habit?
              </h2>
              <p className="mt-4 xs:mt-6 text-body-lg xs:text-body-xl text-palette-primary-100 max-w-2xl mx-auto">
                Day 1 takes 30 minutes. No setup required. Just you, a task, and the commitment to show up tomorrow too.
              </p>
              <div className="mt-8 xs:mt-10 flex flex-col xs:flex-row items-center justify-center gap-4">
                <Link href="/day/1">
                  <Button size="xl" variant="secondary" className="w-full xs:w-auto bg-white text-palette-primary-600 hover:bg-palette-primary-50">
                    Start Your 60-Day Challenge →
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="xl" variant="outline" className="w-full xs:w-auto border-white text-white hover:bg-white/10">
                    See Demo Dashboard
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <footer className="border-t border-palette-neutral-200 dark:border-palette-neutral-800 py-12 bg-white dark:bg-palette-neutral-950">
          <div className="container mx-auto px-4 xs:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="md:col-span-2">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <svg className="w-8 h-8 text-palette-primary-600 dark:text-palette-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span className="text-heading-lg font-bold text-palette-neutral-900 dark:text-palette-neutral-50">ABTalks</span>
                </Link>
                <p className="text-body-md text-palette-neutral-600 dark:text-palette-neutral-400 max-w-xs">
                  60 days of daily proof of work. GitHub commits + LinkedIn posts. Build in public. Grow in private.
                </p>
              </div>
              <div>
                <h4 className="text-body-sm font-semibold text-palette-neutral-900 dark:text-palette-neutral-50 uppercase tracking-wider mb-4">Quick Links</h4>
                <nav className="space-y-2">
                  <Link href="/day/1" className="block text-body-sm text-palette-neutral-600 dark:text-palette-neutral-400 hover:text-palette-primary-600 dark:hover:text-palette-primary-400 transition-colors">Start Challenge</Link>
                  <Link href="/dashboard" className="block text-body-sm text-palette-neutral-600 dark:text-palette-neutral-400 hover:text-palette-primary-600 dark:hover:text-palette-primary-400 transition-colors">Dashboard Demo</Link>
                  <Link href="#how-it-works" className="block text-body-sm text-palette-neutral-600 dark:text-palette-neutral-400 hover:text-palette-primary-600 dark:hover:text-palette-primary-400 transition-colors">How It Works</Link>
                </nav>
              </div>
              <div>
                <h4 className="text-body-sm font-semibold text-palette-neutral-900 dark:text-palette-neutral-50 uppercase tracking-wider mb-4">Resources</h4>
                <nav className="space-y-2">
                  <Link href="#" className="block text-body-sm text-palette-neutral-600 dark:text-palette-neutral-400 hover:text-palette-primary-600 dark:hover:text-palette-primary-400 transition-colors">GitHub Template</Link>
                  <Link href="#" className="block text-body-sm text-palette-neutral-600 dark:text-palette-neutral-400 hover:text-palette-primary-600 dark:hover:text-palette-primary-400 transition-colors">LinkedIn Guide</Link>
                  <Link href="#" className="block text-body-sm text-palette-neutral-600 dark:text-palette-neutral-400 hover:text-palette-primary-600 dark:hover:text-palette-primary-400 transition-colors">Streak Rules</Link>
                </nav>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-palette-neutral-200 dark:border-palette-neutral-800 text-center">
              <p className="text-body-sm text-palette-neutral-500 dark:text-palette-neutral-400">
                Built for hackathon submission &middot; Next.js 15 &middot; Tailwind CSS v4 &middot; Motion &middot; Three.js
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
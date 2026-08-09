"use client";

import { useEffect, useState } from "react";
import { ScrollReveal, StaggerContainer, StaggerItem, HoverLift } from "@/components/animations";
import { Scene3DWrapper } from "@/components/scene3d-wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { StreakFlame } from "@/components/ui/streak-display";

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
    <div className="min-h-screen">
      <header className="glass-strong border-b border-white/10 sticky top-0 z-40">
        <nav className="container mx-auto px-4 xs:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" aria-label="ABTalks Home">
            <svg className="w-8 h-8 text-palette-primary-400 transition-transform group-hover:scale-110 duration-200 drop-shadow-[0_0_12px_rgba(249,115,22,0.5)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-heading-lg font-bold text-palette-neutral-50">AB<GradientText>Talks</GradientText></span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden sm:inline-flex text-body-sm font-medium text-palette-neutral-300 hover:text-palette-primary-400 transition-colors px-3 py-2 rounded-lg hover:bg-white/5">
              Dashboard
            </Link>
            <Link href="/day/1">
              <Button size="md" className="px-5">
                Start Challenge
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative">
        {/* Hero — gradient + grid + glow */}
        <section className="relative min-h-[70vh] xs:min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute inset-0 bg-gradient-to-b from-palette-primary-500/15 via-transparent to-transparent" />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[120%] h-[500px] rounded-full bg-gradient-to-r from-palette-primary-600/30 via-palette-secondary-500/20 to-palette-accent-400/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-palette-primary-400/60 to-transparent" />
          <DeviceCapabilityCheck />
          
          <div className="relative container mx-auto px-4 xs:px-6 lg:px-8 py-16 xs:py-24 lg:py-32 z-10">
            <ScrollReveal direction="up">
              <div className="text-center max-w-4xl mx-auto">
                <Badge variant="primary" size="lg" className="mb-6 inline-flex shadow-glow-sm">
                  <span className="mr-1">🚀</span> 60-Day Coding Challenge
                </Badge>
                <h1 className="text-display-xl xs:text-display-lg lg:text-display-xl font-semibold text-palette-neutral-50 tracking-tight leading-tight text-balance">
                  Build the habit of{" "}
                  <GradientText>daily proof of work</GradientText>
                </h1>
                <p className="mt-6 xs:mt-8 text-body-lg xs:text-body-xl text-palette-neutral-400 max-w-2xl mx-auto leading-relaxed">
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
              <div className="flex flex-col xs:flex-row items-center justify-center gap-4 xs:gap-6">
                <HoverLift className="glass rounded-2xl px-6 xs:px-8 py-5 shadow-lg shadow-palette-neutral-950/40">
                  <div className="text-center">
                    <p className="text-display-md font-bold text-gradient tabular-nums">1,247</p>
                    <p className="text-body-sm text-palette-neutral-400 mt-1">Active Builders</p>
                  </div>
                </HoverLift>
                <HoverLift className="glass rounded-2xl px-6 xs:px-8 py-5 shadow-lg shadow-palette-neutral-950/40">
                  <div className="text-center">
                    <p className="text-display-md font-bold text-gradient tabular-nums">89%</p>
                    <p className="text-body-sm text-palette-neutral-400 mt-1">Completion Rate</p>
                  </div>
                </HoverLift>
                <HoverLift className="glass rounded-2xl px-6 xs:px-8 py-5 shadow-lg shadow-palette-neutral-950/40">
                  <div className="text-center">
                    <p className="text-display-md font-bold text-gradient tabular-nums">4.8</p>
                    <p className="text-body-sm text-palette-neutral-400 mt-1">Avg Rating</p>
                  </div>
                </HoverLift>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="how-it-works" className="py-16 xs:py-24 lg:py-32">
          <div className="container mx-auto px-4 xs:px-6 lg:px-8">
            <SectionHeader
              title="How It Works"
              description="Four simple steps to build a daily coding habit that sticks"
              variant="default"
              align="center"
              delay={0}
              badge={<Badge variant="secondary">The Method</Badge>}
            />

            <StaggerContainer staggerDelay={0.1} className="mt-12 grid gap-6 sm:grid-cols-2">
              {howItWorks.map((item) => (
                <StaggerItem key={item.step}>
                  <HoverLift className="glass rounded-2xl p-6 xs:p-8 shadow-lg shadow-palette-neutral-950/40 hover:border-palette-primary-400/50">
                    <div className="flex flex-col xs:flex-row xs:items-start gap-4 xs:gap-6">
                      <div className="flex-shrink-0 w-14 h-14 xs:w-16 xs:h-16 rounded-2xl bg-gradient-to-br from-palette-primary-500 to-palette-secondary-400 shadow-glow-sm flex items-center justify-center">
                        <span className="text-display-sm font-bold text-white font-mono">{item.step}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-heading-lg font-semibold text-palette-neutral-50">{item.title}</h3>
                        <p className="mt-2 text-body-md text-palette-neutral-400">{item.description}</p>
                      </div>
                    </div>
                  </HoverLift>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="py-16 xs:py-24 lg:py-32">
          <div className="container mx-auto px-4 xs:px-6 lg:px-8">
            <SectionHeader
              title="What Builders Say"
              description="Real developers. Real results. No marketing fluff."
              variant="default"
              align="center"
              delay={0}
              badge={<Badge variant="primary">Winners</Badge>}
            />

            <StaggerContainer staggerDelay={0.1} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {socialProof.map((item) => (
                <StaggerItem key={item.name}>
                  <Card variant="elevated" padding="lg" hover className="h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-palette-primary-500 to-palette-accent-400 flex items-center justify-center ring-2 ring-palette-primary-400/30">
                        <span className="text-heading-md font-bold text-white">
                          {item.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-body-sm font-medium text-palette-neutral-50">{item.name}</p>
                        <p className="text-caption text-palette-neutral-500">{item.role} @ {item.company}</p>
                      </div>
                      <div className="ml-auto flex gap-0.5 text-palette-accent-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l2.6 6.3 6.9.5-5.3 4.5 1.6 6.7L12 16.9l-5.8 3.1 1.6-6.7L2.5 8.8l6.9-.5L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-body-md text-palette-neutral-300 italic">“{item.quote}”</p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="py-16 xs:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-palette-primary-950/60 via-palette-secondary-900/40 to-palette-neutral-950/60" />
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[80%] h-[400px] rounded-full bg-gradient-to-r from-palette-primary-500/30 via-palette-secondary-400/25 to-palette-accent-400/30 blur-[100px]" />
          <div className="relative container mx-auto px-4 xs:px-6 lg:px-8 text-center">
            <ScrollReveal direction="up">
              <div className="glass rounded-3xl p-8 xs:p-12 lg:p-16 shadow-2xl shadow-palette-neutral-950/60 max-w-4xl mx-auto">
                <StreakFlame count={12} size="lg" />
                <h2 className="mt-4 text-display-md xs:text-display-lg font-semibold text-palette-neutral-50 tracking-tight">
                  Ready to build your <span className="text-gradient">daily coding habit</span>?
                </h2>
                <p className="mt-4 xs:mt-6 text-body-lg xs:text-body-xl text-palette-neutral-400 max-w-2xl mx-auto">
                  Day 1 takes 30 minutes. No setup required. Just you, a task, and the commitment to show up tomorrow too.
                </p>
                <div className="mt-8 xs:mt-10 flex flex-col xs:flex-row items-center justify-center gap-4">
                  <Link href="/day/1">
                    <Button size="xl" className="w-full xs:w-auto">
                      Start Your 60-Day Challenge →
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="xl" variant="outline" className="w-full xs:w-auto">
                      See Demo Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <footer className="border-t border-palette-neutral-800 py-12 bg-palette-neutral-950/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 xs:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="md:col-span-2">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <svg className="w-8 h-8 text-palette-primary-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span className="text-heading-lg font-bold text-palette-neutral-50">AB<GradientText>Talks</GradientText></span>
                </Link>
                <p className="text-body-md text-palette-neutral-400 max-w-xs">
                  60 days of daily proof of work. GitHub commits + LinkedIn posts. Build in public. Grow in private.
                </p>
              </div>
              <div>
                <h4 className="text-body-sm font-semibold text-palette-neutral-200 uppercase tracking-wider mb-4">Quick Links</h4>
                <nav className="space-y-2">
                  <Link href="/day/1" className="block text-body-sm text-palette-neutral-400 hover:text-palette-primary-400 transition-colors">Start Challenge</Link>
                  <Link href="/dashboard" className="block text-body-sm text-palette-neutral-400 hover:text-palette-primary-400 transition-colors">Dashboard Demo</Link>
                  <Link href="#how-it-works" className="block text-body-sm text-palette-neutral-400 hover:text-palette-primary-400 transition-colors">How It Works</Link>
                </nav>
              </div>
              <div>
                <h4 className="text-body-sm font-semibold text-palette-neutral-200 uppercase tracking-wider mb-4">Resources</h4>
                <nav className="space-y-2">
                  <Link href="#" className="block text-body-sm text-palette-neutral-400 hover:text-palette-primary-400 transition-colors">GitHub Template</Link>
                  <Link href="#" className="block text-body-sm text-palette-neutral-400 hover:text-palette-primary-400 transition-colors">LinkedIn Guide</Link>
                  <Link href="#" className="block text-body-sm text-palette-neutral-400 hover:text-palette-primary-400 transition-colors">Streak Rules</Link>
                </nav>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-palette-neutral-800 text-center">
              <p className="text-body-sm text-palette-neutral-500">
                Built for hackathon submission &middot; Next.js &middot; Tailwind CSS v4 &middot; Motion &middot; Three.js
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`text-gradient ${className}`}>{children}</span>;
}
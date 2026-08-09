"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { StreakFlame } from "@/components/ui/streak-display";
import { getStreakInfo } from "@/lib/data";

export interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
}

export function MobileHeader({
  title,
  subtitle,
  showStreak = true,
  showBack = false,
  backHref = "/dashboard",
  action,
  className = "",
}: {
  title: string;
  subtitle?: string;
  showStreak?: boolean;
  showBack?: boolean;
  backHref?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const streakInfo = getStreakInfo("default");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className={`sticky top-0 z-40 glass-strong border-b border-white/10 px-4 py-3 safe-area-top ${className}`}>
      <div className="flex items-center justify-between gap-4 h-12 xs:h-14">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {showBack && (
            <Link
              href={backHref}
              className="flex items-center justify-center w-10 h-10 rounded-xl text-palette-neutral-400 hover:bg-white/10 hover:text-palette-neutral-200 transition-all duration-200 active:scale-95"
              aria-label="Go back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          <div className="min-w-0">
            <h1 className="text-heading-md xs:text-heading-lg font-semibold text-palette-neutral-50 truncate">{title}</h1>
            {subtitle && <p className="text-body-sm text-palette-neutral-400 truncate">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {showStreak && (
            <div className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 bg-palette-accent-400/10 border border-palette-accent-400/30 rounded-full backdrop-blur-sm">
              <StreakFlame count={streakInfo.current} size="sm" animated={false} />
              <span className="text-body-sm font-bold text-palette-accent-300 tabular-nums">
                {streakInfo.current}
              </span>
              <span className="text-caption text-palette-accent-300">day streak</span>
            </div>
          )}
          {action}
        </div>
      </div>
    </header>
  );
}

export function DesktopHeader({
  _title,
  _subtitle,
  showStreak = true,
  navigation = true,
  user,
  className = "",
}: {
  _title: string;
  _subtitle?: string;
  showStreak?: boolean;
  navigation?: boolean;
  user?: { name: string; avatar?: string };
  className?: string;
}) {
  const streakInfo = getStreakInfo("default");

  return (
    <header className={`sticky top-0 z-40 glass-strong border-b border-white/10 px-4 xs:px-6 lg:px-8 ${className}`}>
      <div className="container mx-auto h-16 xs:h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 xs:gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <svg className="w-8 h-8 text-palette-primary-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-heading-lg font-bold text-palette-neutral-50 hidden sm:block">Hackathon</span>
          </Link>

          {navigation && (
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {[
                { href: "/dashboard", label: "Home" },
                { href: "/progress", label: "Progress" },
                { href: "/achievements", label: "Awards" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-body-sm font-medium text-palette-neutral-400 hover:text-palette-primary-400 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {showStreak && (
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-palette-accent-400/10 border border-palette-accent-400/30 rounded-full backdrop-blur-sm">
              <StreakFlame count={streakInfo.current} size="sm" animated={false} />
              <span className="text-body-sm font-bold text-palette-accent-300 tabular-nums">
                {streakInfo.current}
              </span>
              <span className="text-caption text-palette-accent-300">day streak</span>
            </div>
          )}

          {user && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-palette-primary-500/15 border border-palette-primary-500/40 flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
                ) : (
                  <span className="text-body-sm font-medium text-palette-primary-300">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="hidden lg:block text-body-sm font-medium text-palette-neutral-300">
                {user.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function PageContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`min-h-screen pt-16 xs:pt-20 lg:pt-24 pb-8 sm:pb-8 lg:pb-8 ${className}`}>
      <main className="container mx-auto px-4 xs:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

export function MobilePageContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`min-h-screen pt-16 xs:pt-20 pb-8 ${className}`}>
      <main className="px-4 xs:px-6">
        {children}
      </main>
    </div>
  );
}

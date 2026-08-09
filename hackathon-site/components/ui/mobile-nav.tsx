"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { StreakFlame } from "@/components/ui/streak-display";
import { getStreakInfo, getTodayDayNumber } from "@/lib/data";

export interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
}

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    href: "/day/12",
    label: "Today",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    badge: getTodayDayNumber("default"),
  },
  {
    href: "/progress",
    label: "Progress",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    href: "/achievements",
    label: "Achievements",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export function MobileNav({ variant = "bottom", className = "" }: { variant?: "bottom" | "top" | "floating"; className?: string }) {
  const pathname = usePathname();
  const mountedRef = useRef(false);
  
  useEffect(() => {
    mountedRef.current = true;
  }, []);
  
  if (!mountedRef.current) {
    return null;
  }
  
  const streakInfo = getStreakInfo("default");
  
  if (variant === "bottom") {
    return (
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 ${className}`}
        aria-label="Mobile navigation"
      >
        <div className="bg-white dark:bg-palette-neutral-900 border-t border-palette-neutral-200 dark:border-palette-neutral-800 px-2 py-2 xs:px-4 safe-area-bottom">
          <div className="flex items-center justify-around h-14 xs:h-16">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href === "/day/12" && pathname?.startsWith("/day/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg min-w-[60px] transition-all duration-200 ${
                    isActive
                      ? "text-palette-primary-600 dark:text-palette-primary-400 bg-palette-primary-50 dark:bg-palette-primary-950/30"
                      : "text-palette-neutral-400 dark:text-palette-neutral-500 hover:text-palette-neutral-600 dark:hover:text-palette-neutral-400 hover:bg-palette-neutral-100 dark:hover:bg-palette-neutral-800"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="text-caption font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold text-palette-primary-600 dark:text-palette-primary-400 bg-palette-primary-100 dark:bg-palette-primary-900/30 px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    );
  }
  
  if (variant === "floating") {
    return (
      <nav
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 ${className}`}
        aria-label="Mobile navigation"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-palette-neutral-900 rounded-full border border-palette-neutral-200 dark:border-palette-neutral-800 shadow-xl px-3 py-1.5 flex items-center gap-1"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === "/day/12" && pathname?.startsWith("/day/"));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-palette-primary-600 text-white"
                    : "text-palette-neutral-500 dark:text-palette-neutral-400 hover:text-palette-neutral-700 dark:hover:text-palette-neutral-300 hover:bg-palette-neutral-100 dark:hover:bg-palette-neutral-800"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="text-base">{item.icon}</span>
                <span className="text-body-sm font-medium hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </motion.div>
      </nav>
    );
  }
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      aria-label="Mobile navigation"
    >
      <div className="bg-white dark:bg-palette-neutral-900 border-b border-palette-neutral-200 dark:border-palette-neutral-800 px-4 py-3 safe-area-top">
        <div className="flex items-center justify-between h-12">
          <h1 className="text-heading-md font-semibold text-palette-neutral-900 dark:text-palette-neutral-50">
            Hackathon
          </h1>
          <div className="flex items-center gap-2">
            <StreakFlame count={streakInfo.current} size="sm" />
            <span className="text-body-sm font-bold text-palette-neutral-900 dark:text-palette-neutral-50 tabular-nums">
              {streakInfo.current}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
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
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-palette-neutral-900 border-b border-palette-neutral-200 dark:border-palette-neutral-800 px-4 py-3 safe-area-top ${className}`}>
      <div className="flex items-center justify-between gap-4 h-12 xs:h-14">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {showBack && (
            <Link
              href={backHref}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-palette-neutral-500 dark:text-palette-neutral-400 hover:bg-palette-neutral-100 dark:hover:bg-palette-neutral-800 transition-colors"
              aria-label="Go back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          <div className="min-w-0">
            <h1 className="text-heading-md xs:text-heading-lg font-semibold text-palette-neutral-900 dark:text-palette-neutral-50 truncate">{title}</h1>
            {subtitle && <p className="text-body-sm text-palette-neutral-500 dark:text-palette-neutral-400 truncate">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {showStreak && (
            <div className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 bg-palette-accent-100 dark:bg-palette-accent-900/30 rounded-full">
              <StreakFlame count={streakInfo.current} size="sm" animated={false} />
              <span className="text-body-sm font-bold text-palette-accent-700 dark:text-palette-accent-300 tabular-nums">
                {streakInfo.current}
              </span>
              <span className="text-caption text-palette-accent-600 dark:text-palette-accent-400">day streak</span>
            </div>
          )}
          {action}
        </div>
      </div>
    </header>
  );
}

export function DesktopHeader({
  title,
  subtitle,
  showStreak = true,
  navigation = true,
  user,
  className = "",
}: {
  title: string;
  subtitle?: string;
  showStreak?: boolean;
  navigation?: boolean;
  user?: { name: string; avatar?: string };
  className?: string;
}) {
  const streakInfo = getStreakInfo("default");
  
  return (
    <header className={`sticky top-0 z-40 bg-white/80 dark:bg-palette-neutral-950/80 backdrop-blur-md border-b border-palette-neutral-200 dark:border-palette-neutral-800 px-4 xs:px-6 lg:px-8 ${className}`}>
      <div className="container mx-auto h-16 xs:h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 xs:gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <svg className="w-8 h-8 text-palette-primary-600 dark:text-palette-primary-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-heading-lg font-bold text-palette-neutral-900 dark:text-palette-neutral-50 hidden sm:block">Hackathon</span>
          </Link>
          
          {navigation && (
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-body-sm font-medium text-palette-neutral-600 dark:text-palette-neutral-400 hover:text-palette-primary-600 dark:hover:text-palette-primary-400 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {showStreak && (
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-palette-accent-100 dark:bg-palette-accent-900/30 rounded-full">
              <StreakFlame count={streakInfo.current} size="sm" animated={false} />
              <span className="text-body-sm font-bold text-palette-accent-700 dark:text-palette-accent-300 tabular-nums">
                {streakInfo.current}
              </span>
              <span className="text-caption text-palette-accent-600 dark:text-palette-accent-400">day streak</span>
            </div>
          )}
          
          {user && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-palette-primary-100 dark:bg-palette-primary-900/30 flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
                ) : (
                  <span className="text-body-sm font-medium text-palette-primary-600 dark:text-palette-primary-400">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="hidden lg:block text-body-sm font-medium text-palette-neutral-700 dark:text-palette-neutral-300">
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
    <div className={`min-h-screen pt-16 xs:pt-20 lg:pt-24 pb-20 xs:pb-24 ${className}`}>
      <main className="container mx-auto px-4 xs:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

export function MobilePageContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`min-h-screen pt-16 xs:pt-20 pb-20 xs:pb-24 ${className}`}>
      <main className="px-4 xs:px-6">
        {children}
      </main>
    </div>
  );
}
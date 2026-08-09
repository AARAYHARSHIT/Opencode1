"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { getTodayDayNumber } from "@/lib/data";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: `/day/${getTodayDayNumber("default")}`,
    label: "Today",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/progress",
    label: "Progress",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    href: "/achievements",
    label: "Awards",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isVisible, isAtTop } = useScrollDirection({ threshold: 10 });
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 sm:hidden">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute bottom-16 right-0 glass-strong rounded-2xl shadow-2xl shadow-palette-neutral-950/60 border border-white/[0.12] p-2 min-w-[180px]"
            >
              {navItems.map((item, index) => {
                const isActive = pathname === item.href || 
                  (item.href.startsWith("/day/") && pathname?.startsWith("/day/"));
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-palette-primary-500/20 to-palette-primary-600/10 text-palette-primary-400 border border-palette-primary-400/30"
                          : "text-palette-neutral-300 hover:bg-white/10 hover:text-palette-neutral-50"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className={isActive ? "text-palette-primary-400" : "text-palette-neutral-500"}>
                        {item.icon}
                      </span>
                      <span className="text-body-sm font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full glass-strong shadow-xl shadow-palette-neutral-950/60 border border-white/[0.12] flex items-center justify-center"
        whileTap={{ scale: 0.92 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-palette-primary-500/20 to-palette-accent-400/20"
          animate={{ opacity: isOpen ? 0.5 : 0.3 }}
        />
        <svg
          className="w-6 h-6 text-palette-primary-400 relative z-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </motion.button>
    </div>
  );
}

export function ContextualNav() {
  const [mounted, setMounted] = useState(false);
  const { isVisible, isAtTop } = useScrollDirection({ threshold: 10 });
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-40 hidden sm:block pb-safe"
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      aria-label="Main navigation"
    >
      <div className="mx-4 mb-4">
        <div className="glass-strong rounded-2xl shadow-2xl shadow-palette-neutral-950/50 border border-white/[0.08] px-2 py-2 max-w-md mx-auto">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href.startsWith("/day/") && pathname?.startsWith("/day/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex flex-col items-center justify-center gap-1 w-[72px] py-2 rounded-xl transition-all duration-200"
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="fab-nav-active"
                      className="absolute inset-0 bg-gradient-to-b from-palette-primary-500/20 to-palette-primary-600/10 border border-palette-primary-400/30 rounded-xl shadow-[0_0_12px_rgba(249,115,22,0.15)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-all duration-200 ${isActive ? "text-palette-primary-400 scale-110" : "text-palette-neutral-500"}`}>
                    {item.icon}
                  </span>
                  <span className={`relative z-10 text-[10px] font-medium leading-none transition-all duration-200 ${isActive ? "text-palette-primary-300" : "text-palette-neutral-500"}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

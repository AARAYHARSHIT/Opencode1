"use client";

import { HTMLAttributes, forwardRef } from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@/components/ui/progress";

export interface StreakDisplayProps extends HTMLAttributes<HTMLDivElement> {
  current: number;
  longest: number;
  isActiveToday?: boolean;
  freezeCount?: number;
  maxFreezes?: number;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "compact" | "detailed" | "circular";
  showLabel?: boolean;
  showFreeze?: boolean;
  animate?: boolean;
}

export const StreakDisplay = forwardRef<HTMLDivElement, StreakDisplayProps>(
  ({
    current,
    longest,
    isActiveToday = false,
    freezeCount = 0,
    maxFreezes = 3,
    size = "md",
    variant = "default",
    showLabel = true,
    showFreeze = true,
    animate = true,
    className = "",
    ...props
  }, ref) => {
    const sizeStyles = {
      sm: { icon: "w-5 h-5", text: "text-heading-md", gap: "gap-1.5", padding: "px-3 py-2" },
      md: { icon: "w-6 h-6", text: "text-heading-lg", gap: "gap-2", padding: "px-4 py-3" },
      lg: { icon: "w-8 h-8", text: "text-heading-xl", gap: "gap-3", padding: "px-6 py-4" },
      xl: { icon: "w-10 h-10", text: "text-display-md", gap: "gap-4", padding: "px-8 py-6" },
    };
    
    const s = sizeStyles[size];
    
    if (variant === "circular") {
      return (
        <div ref={ref} className={`inline-flex flex-col items-center ${className}`} {...props}>
          <CircularProgress
            value={current}
            max={longest || 30}
            size={size === "sm" ? 60 : size === "md" ? 80 : size === "lg" ? 100 : 120}
            strokeWidth={size === "sm" ? 4 : 6}
            variant="success"
            showLabel={showLabel}
            label={showLabel ? "Day Streak" : undefined}
          />
          {showFreeze && freezeCount > 0 && (
            <div className="mt-2 flex items-center gap-1 text-caption text-palette-neutral-500">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>{freezeCount}/{maxFreezes} freezes</span>
            </div>
          )}
        </div>
      );
    }
    
    if (variant === "compact") {
      return (
        <div ref={ref} className={`inline-flex items-center ${s.gap} ${s.padding} bg-palette-accent-400/10 border border-palette-accent-400/30 rounded-full backdrop-blur-sm ${className}`} {...props}>
          <div className={`relative flex items-center ${s.icon} text-palette-accent-400`}>
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            {isActiveToday && animate && (
              <motion.div
                className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-palette-green-400 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>
          <div className="flex flex-col">
            <span className={`${s.text} font-bold text-palette-neutral-50 tabular-nums`}>{current}</span>
            {showLabel && <span className="text-caption text-palette-neutral-400">Day Streak</span>}
          </div>
        </div>
      );
    }
    
    if (variant === "detailed") {
      return (
        <div ref={ref} className={`glass rounded-2xl p-6 ${className}`} {...props}>
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative p-4 bg-palette-accent-400/10 border border-palette-accent-400/30 rounded-xl">
                <svg className="w-8 h-8 text-palette-accent-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                {isActiveToday && animate && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-palette-green-400 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </div>
              <div>
                <span className="text-display-lg font-bold text-gradient tabular-nums">{current}</span>
                <p className="text-body-md text-palette-neutral-400">Day Streak</p>
              </div>
            </div>
            <div className="flex flex-col xs:flex-row xs:items-center gap-4 border-t xs:border-t-0 xs:border-l xs:pl-6 border-palette-neutral-800 pt-4 xs:pt-0">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <span className="text-heading-lg font-bold text-palette-neutral-50 tabular-nums">{longest}</span>
                  <p className="text-caption text-palette-neutral-500">Longest</p>
                </div>
                <div className="w-px h-8 bg-palette-neutral-800" />
                {showFreeze && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-palette-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-body-sm text-palette-neutral-300">
                      {freezeCount}/{maxFreezes} freezes
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div ref={ref} className={`inline-flex items-center ${s.gap} ${s.padding} glass rounded-xl shadow-lg shadow-palette-neutral-950/40 ${className}`} {...props}>
        <div className={`relative flex items-center ${s.icon} text-palette-accent-400`}>
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          {isActiveToday && animate && (
            <motion.div
              className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-palette-green-400 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
        <div className="flex flex-col">
          <span className={`${s.text} font-bold text-palette-neutral-50 tabular-nums`}>{current}</span>
          {showLabel && <span className="text-caption text-palette-neutral-500">Day Streak</span>}
        </div>
        {showFreeze && freezeCount > 0 && (
          <Badge variant="outline" size="sm" dot dotColor="text-palette-amber-400" className="ml-2">
            {freezeCount}/{maxFreezes} freezes
          </Badge>
        )}
      </div>
    );
  }
);

StreakDisplay.displayName = "StreakDisplay";

export interface StreakFlameProps {
  count: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

export function StreakFlame({ count, size = "md", animated = true, className = "" }: StreakFlameProps) {
  const sizeMap = { sm: 16, md: 24, lg: 32 };
  const flameSize = sizeMap[size];
  
  if (count === 0) {
    return (
      <svg className={`${className} text-palette-neutral-600`} width={flameSize} height={flameSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  
  const flames = Math.min(count, 5);
  
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[...Array(flames)].map((_, i) => (
        <motion.svg
          key={i}
          width={flameSize}
          height={flameSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="text-palette-accent-400"
          initial={{ opacity: 0, y: 10, rotate: -20 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <path d="M8.5 14.5c-2.5-3-1-7 2-7s5 2.5 5 5.5c0 2.5-2.5 4-5 5.5-2.5-1.5-4-4-4-5.5z" strokeLinecap="round" strokeLinejoin="round" />
          {animated && (
            <motion.path
              d="M8.5 14.5c-2.5-3-1-7 2-7s5 2.5 5 5.5c0 2.5-2.5 4-5 5.5-2.5-1.5-4-4-4-5.5z"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ pathLength: [0, 1], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          )}
        </motion.svg>
      ))}
      {count > 5 && (
        <span className="text-body-sm font-medium text-palette-accent-400 ml-1">+{count - 5}</span>
      )}
    </div>
  );
}
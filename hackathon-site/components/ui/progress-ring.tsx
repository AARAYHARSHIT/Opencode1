"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
  showLabel?: boolean;
  variant?: "primary" | "success" | "warning" | "accent";
}

const variantColors = {
  primary: {
    stroke: "url(#progressGradient)",
    glow: "drop-shadow(0 0 8px rgba(249,115,22,0.6))",
  },
  success: {
    stroke: "url(#successGradient)",
    glow: "drop-shadow(0 0 8px rgba(34,197,94,0.6))",
  },
  warning: {
    stroke: "url(#warningGradient)",
    glow: "drop-shadow(0 0 8px rgba(245,158,11,0.6))",
  },
  accent: {
    stroke: "url(#accentGradient)",
    glow: "drop-shadow(0 0 8px rgba(250,204,21,0.6))",
  },
};

export function ProgressRing({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  className = "",
  label,
  showLabel = true,
  variant = "primary",
}: ProgressRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedProgress / 100) * circumference;

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimatedProgress(percentage);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, percentage]);

  const colors = variantColors[variant];

  return (
    <div ref={ref} className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        style={{ filter: colors.glow }}
      >
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
          <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
          <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
        <circle
          className="text-palette-neutral-800/80"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.span
              className="font-mono text-heading-xl font-bold text-palette-neutral-50"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {Math.round(animatedProgress)}%
            </motion.span>
            {label && (
              <p className="text-caption text-palette-neutral-400 mt-0.5">{label}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  duration = 1.5,
  prefix = "",
  suffix = "",
  className = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    const num = Number(latest);
    return decimals > 0
      ? num.toFixed(decimals)
      : Math.round(num).toLocaleString();
  });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      });
      return controls.stop;
    }
  }, [isInView, value, duration, motionValue]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return unsubscribe;
  }, [rounded]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

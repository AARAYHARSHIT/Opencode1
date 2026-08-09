"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "motion/react";

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 24 : direction === "down" ? -24 : 0,
      x: direction === "left" ? 24 : direction === "right" ? -24 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
}: StaggerContainerProps) {
  const prefersReduced = usePrefersReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReduced ? 0 : staggerDelay },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HoverLiftProps {
  children: React.ReactNode;
  className?: string;
  lift?: number;
}

export function HoverLift({ children, className = "", lift = -6 }: HoverLiftProps) {
  return (
    <motion.div
      whileHover={{ y: lift, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

import { PanInfo } from "motion/react";

interface GestureCardProps {
  children: React.ReactNode;
  className?: string;
  onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

export function GestureCard({
  children,
  className = "",
  onDragEnd,
}: GestureCardProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
      dragElastic={0.2}
      onDragEnd={onDragEnd}
      whileDrag={{ scale: 1.02 }}
      className={`${className} cursor-grab active:cursor-grabbing`}
    >
      {children}
    </motion.div>
  );
}

import React from "react";

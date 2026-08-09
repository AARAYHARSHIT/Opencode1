"use client";

import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("@/components/three-scene").then((mod) => mod.Scene3D), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-64 xs:h-80 lg:h-96 bg-palette-neutral-100 dark:bg-palette-neutral-900 rounded-xl flex items-center justify-center">
      <p className="text-body-md text-palette-neutral-500 dark:text-palette-neutral-400">
        Loading 3D scene...
      </p>
    </div>
  ),
});

export function Scene3DWrapper() {
  return (
    <ScrollReveal direction="up" delay={0.1}>
      <div className="mt-12 xs:mt-16 lg:mt-20">
        <Scene3D />
      </div>
    </ScrollReveal>
  );
}

import { ScrollReveal } from "@/components/animations";
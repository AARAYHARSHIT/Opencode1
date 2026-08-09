"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ScrollReveal } from "@/components/animations";

const Scene3D = dynamic(() => import("@/components/three-scene").then((mod) => mod.Scene3D), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-full flex items-center justify-center">
      <p className="text-body-md text-palette-neutral-500">
        Loading 3D scene...
      </p>
    </div>
  ),
});

function ThreeDFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="w-24 h-24 text-palette-primary-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  );
}

export function Scene3DWrapper() {
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldLoad3D(false);
      return;
    }

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    const hasWebGL = !!gl;
    const hasWebGL2 = !!window.WebGL2RenderingContext;
    const dpr = window.devicePixelRatio || 1;
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const canRun = hasWebGL && hasWebGL2 && dpr <= 2 && !isLowEnd;

    setShouldLoad3D(canRun);
  }, [prefersReducedMotion]);

  return (
    <ScrollReveal direction="up" delay={0.1}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-full max-w-2xl h-[400px] xs:h-[500px] lg:h-[600px] opacity-60 lg:opacity-80">
          {shouldLoad3D ? <Scene3D /> : <ThreeDFallback />}
        </div>
      </div>
    </ScrollReveal>
  );
}
"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type ScrollDirection = "up" | "down" | null;

export function useScrollDirection({
  threshold = 10,
  initialVisible = true,
}: {
  threshold?: number;
  initialVisible?: boolean;
} = {}) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [isVisible, setIsVisible] = useState(initialVisible);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScrollDirection = useCallback(() => {
    const scrollY = window.scrollY;
    const currentDirection = scrollY > lastScrollY.current ? "down" : "up";
    const atTop = scrollY < threshold;

    setIsAtTop(atTop);

    if (Math.abs(scrollY - lastScrollY.current) < threshold) {
      ticking.current = false;
      return;
    }

    setScrollDirection(currentDirection);

    if (currentDirection === "down" && scrollY > 100) {
      setIsVisible(false);
    } else if (currentDirection === "up" || atTop) {
      setIsVisible(true);
    }

    lastScrollY.current = scrollY > 0 ? scrollY : 0;
    ticking.current = false;
  }, [threshold]);

  const onScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(updateScrollDirection);
      ticking.current = true;
    }
  }, [updateScrollDirection]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return { scrollDirection, isVisible, isAtTop };
}

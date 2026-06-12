"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Apple-style entrance: the block scales from 0.94→1 and its corners relax
 * as it travels through the viewport, driven directly by scroll position.
 */
export default function ScrollScale({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when the top enters the viewport, 1 when centered
      const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.9)));
      const eased = 1 - Math.pow(1 - p, 3);
      el.style.transform = `scale(${0.94 + 0.06 * eased})`;
      el.style.borderRadius = `${32 - 8 * eased}px`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden will-change-transform ${className}`}>
      {children}
    </div>
  );
}

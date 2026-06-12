"use client";

import { useEffect, useRef, useState } from "react";

const phases = [
  {
    name: "Entrenamiento",
    line: "La base. Fuerza con propósito, desde tu primer día.",
  },
  {
    name: "Nutrición",
    line: "El combustible. Comer real, sin dietas milagro.",
  },
  {
    name: "Fisioterapia",
    line: "El soporte. Volver a moverte sin miedo.",
  },
  {
    name: "Psicología",
    line: "El motor. Resultados que se sostienen por dentro.",
  },
];

// plate heights (px) from inner to outer, one per discipline
const PLATES = [150, 122, 96, 72];

export default function BarbellScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setP(Math.min(1, Math.max(0, -rect.top / total)));
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

  // settle phase: bar levels out during the first 12% of the scroll
  const settle = Math.min(1, p / 0.12);
  const rotation = -10 * (1 - settle * (2 - settle)); // ease-out to 0°
  const phase = Math.min(phases.length - 1, Math.floor(p * 5));
  const plateOn = (i: number) => p > 0.16 + i * 0.18;
  const kg = Math.round(20 + 140 * Math.min(1, Math.max(0, (p - 0.12) / 0.76)));

  return (
    <section ref={trackRef} className="relative h-[420vh] bg-ink" aria-label="Nuestro método">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5">
        <p className="text-xs font-semibold tracking-[0.3em] text-brand-light/80">
          EL MÉTODO ENDO
        </p>
        <h2 className="mt-3 max-w-2xl text-center text-3xl font-bold tracking-tight text-white md:text-5xl">
          Cada disciplina suma.
        </h2>

        {/* Barbell */}
        <div
          className="my-14 flex items-center will-change-transform md:my-20"
          style={{ transform: `rotate(${rotation}deg)` }}
          aria-hidden
        >
          {/* left plates (outer → inner) */}
          <div className="flex items-center gap-1.5">
            {[...PLATES].reverse().map((h, idx) => {
              const i = PLATES.length - 1 - idx;
              return (
                <div
                  key={`l${i}`}
                  className="w-3.5 rounded-md bg-gradient-to-b from-brand-light to-brand-dark transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] md:w-4"
                  style={{
                    height: h,
                    opacity: plateOn(i) ? 1 : 0,
                    transform: plateOn(i)
                      ? "scale(1) translateX(0)"
                      : "scale(0.4) translateX(-40px)",
                  }}
                />
              );
            })}
          </div>
          {/* sleeve + bar + sleeve */}
          <div className="h-4 w-5 rounded-sm bg-zinc-400 md:w-7" />
          <div className="h-2.5 w-36 rounded-full bg-zinc-200 sm:w-52 md:w-72" />
          <div className="h-4 w-5 rounded-sm bg-zinc-400 md:w-7" />
          {/* right plates (inner → outer) */}
          <div className="flex items-center gap-1.5">
            {PLATES.map((h, i) => (
              <div
                key={`r${i}`}
                className="w-3.5 rounded-md bg-gradient-to-b from-brand-light to-brand-dark transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] md:w-4"
                style={{
                  height: h,
                  opacity: plateOn(i) ? 1 : 0,
                  transform: plateOn(i)
                    ? "scale(1) translateX(0)"
                    : "scale(0.4) translateX(40px)",
                }}
              />
            ))}
          </div>
        </div>

        {/* phase caption */}
        <div className="relative h-20 w-full max-w-xl text-center">
          {phases.map((ph, i) => (
            <div
              key={ph.name}
              className="absolute inset-0 transition-all duration-500"
              style={{
                opacity: phase === i ? 1 : 0,
                transform: `translateY(${phase === i ? 0 : phase > i ? -14 : 14}px)`,
              }}
            >
              <p className="text-xl font-bold text-white md:text-2xl">
                {ph.name}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60 md:text-base">
                {ph.line}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <p className="font-mono text-sm tabular-nums text-brand-light">
            {kg} kg
          </p>
          <div className="flex gap-2">
            {phases.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  phase >= i ? "w-7 bg-brand-light" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

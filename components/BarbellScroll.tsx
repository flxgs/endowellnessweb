"use client";

import Image from "next/image";
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

// frame0 = empty bar, frame4 = fully loaded. One plate pair added per phase.
const FRAMES = [0, 1, 2, 3, 4];

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

  // load progresses across the four disciplines: 0 plates → 4 plates
  const loaded = Math.min(1, Math.max(0, (p - 0.06) / 0.84)) * 4; // 0 → 4
  const phase = Math.min(phases.length - 1, Math.floor(loaded));
  const kg = Math.round(20 + loaded * 40); // 20 kg bar → 180 kg loaded
  // subtle settle-in
  const intro = Math.min(1, p / 0.12);
  const scale = 0.9 + 0.1 * (intro * (2 - intro));

  return (
    <section
      ref={trackRef}
      className="relative h-[420vh] bg-ink"
      aria-label="Nuestro método"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5">
        {/* soft brand glow behind the bar */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[36vmin] w-[78vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[110px]"
          aria-hidden
        />

        <p className="relative text-xs font-semibold tracking-[0.3em] text-brand-light/80">
          EL MÉTODO ENDO
        </p>
        <h2 className="relative mt-3 max-w-2xl text-center text-3xl font-bold tracking-tight text-white md:text-5xl">
          Cada disciplina suma peso.
        </h2>

        {/* Loading barbell — frames crossfade as weight is added */}
        <div
          className="relative my-12 w-[94vw] max-w-3xl will-change-transform md:my-16"
          style={{ transform: `scale(${scale})` }}
          aria-hidden
        >
          <div className="relative aspect-[2444/559] w-full">
            {FRAMES.map((f) => {
              // each frame fully opaque at its index, crossfading to neighbours
              const opacity = Math.max(0, 1 - Math.abs(loaded - f));
              return (
                <Image
                  key={f}
                  src={`/brand/barbell/frame${f}.png`}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 768px, 94vw"
                  priority={f === 0}
                  className="object-contain drop-shadow-[0_28px_45px_rgba(0,0,0,0.5)]"
                  style={{ opacity }}
                />
              );
            })}
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

        <div className="relative flex items-center gap-6">
          <p className="font-mono text-sm tabular-nums text-brand-light">
            {kg} kg
          </p>
          <div className="flex gap-2">
            {phases.map((ph, i) => (
              <span
                key={ph.name}
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

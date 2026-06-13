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

  // The barbell completes one full turn across the four phases, scaling up
  // and settling into a slight 3D tilt as you arrive.
  const intro = Math.min(1, p / 0.16);
  const scale = 0.72 + 0.28 * (intro * (2 - intro)); // ease-out 0.72 → 1
  const rotation = p * 360; // one full revolution tied to scroll
  const tilt = 8 * (1 - intro); // subtle perspective that relaxes on entry
  const phase = Math.min(phases.length - 1, Math.floor(p * phases.length));
  const kg = Math.round(20 + 160 * Math.min(1, Math.max(0, (p - 0.12) / 0.8)));

  return (
    <section
      ref={trackRef}
      className="relative h-[380vh] bg-ink"
      aria-label="Nuestro método"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5">
        {/* soft brand glow behind the bar */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[40vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[100px]"
          aria-hidden
        />

        <p className="relative text-xs font-semibold tracking-[0.3em] text-brand-light/80">
          EL MÉTODO ENDO
        </p>
        <h2 className="relative mt-3 max-w-2xl text-center text-3xl font-bold tracking-tight text-white md:text-5xl">
          Cada disciplina suma.
        </h2>

        {/* Spinning barbell */}
        <div
          className="relative my-12 w-[92vw] max-w-3xl [perspective:1200px] md:my-16"
          aria-hidden
        >
          <div
            className="relative aspect-[2442/541] w-full will-change-transform"
            style={{
              transform: `rotateX(${tilt}deg) rotate(${rotation}deg) scale(${scale})`,
            }}
          >
            <Image
              src="/brand/barbell.png"
              alt=""
              fill
              sizes="(min-width: 768px) 768px, 92vw"
              className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)]"
              priority
            />
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

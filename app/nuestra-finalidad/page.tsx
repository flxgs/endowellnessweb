import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ScrollScale from "@/components/ScrollScale";
import CTA from "@/components/CTA";
import { purpose } from "@/lib/content";

export const metadata: Metadata = {
  title: "Nuestra finalidad",
  description:
    "Misión, visión y valores de ENDO Wellness Club: un refugio donde el bienestar físico, emocional y social convergen en un mismo espacio.",
};

export default function NuestraFinalidadPage() {
  return (
    <>
      {/* Misión */}
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-20 md:pt-44">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.3em] text-brand">
            {purpose.mission.title.toUpperCase()}
          </p>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-bold tracking-tight md:text-6xl">
            {purpose.mission.headline}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ink-soft">
            {purpose.mission.body}
          </p>
        </Reveal>
      </section>

      <section className="px-5 pb-20">
        <ScrollScale className="relative mx-auto aspect-[16/8] max-w-6xl rounded-[2rem]">
          <Image
            src="/photos/cafe.jpg"
            alt="Zona social y cafetería del club"
            fill
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/45 to-transparent" />
          <p className="absolute bottom-6 left-7 text-sm font-medium text-white/90 md:text-base">
            La zona social: porque el bienestar también se comparte.
          </p>
        </ScrollScale>
      </section>

      {/* Visión */}
      <section className="bg-brand-deep py-24 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.3em] text-brand-light">
              {purpose.vision.title.toUpperCase()}
            </p>
            <h2 className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight md:text-5xl">
              {purpose.vision.headline}
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/70">
              {purpose.vision.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Valores */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.3em] text-brand">
            {purpose.values.title.toUpperCase()}
          </p>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight md:text-5xl">
            {purpose.values.headline}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {purpose.values.items.map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 90}
              className="rounded-3xl border border-line bg-white p-8 shadow-sm transition-shadow hover:shadow-lg hover:shadow-brand/10"
            >
              <p className="font-mono text-sm text-brand-light">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-xl font-bold">{v.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}

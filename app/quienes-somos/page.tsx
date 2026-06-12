import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import { team, whatsappHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Conoce al equipo de ENDO Wellness Club: nutrición, fisioterapia, entrenamiento y atención al cliente trabajando como una sola familia.",
};

export default function QuienesSomosPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-16 md:pt-44">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.3em] text-brand">
            QUIÉNES SOMOS
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Las personas detrás de tu salud.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            No somos profesionales trabajando en paralelo: somos un equipo en
            constante comunicación. Fisio, nutricionista, psicólogo y
            entrenador alineados con un único objetivo — tú.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl space-y-24 px-5 pb-12">
        {team.map((m, i) => (
          <article
            key={m.slug}
            id={m.slug}
            className="grid scroll-mt-28 items-start gap-10 md:grid-cols-[2fr_3fr] md:gap-16"
          >
            <Reveal className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl shadow-brand-deep/10 md:sticky md:top-28">
                <Image
                  src={m.photo}
                  alt={`${m.name} — ${m.role}`}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-xs font-semibold tracking-[0.25em] text-brand">
                {m.role.toUpperCase()}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                {m.name}
              </h2>
              <p className="mt-3 text-xl font-medium italic text-brand-dark">
                “{m.quote}”
              </p>
              {m.license && (
                <p className="mt-2 text-sm text-ink-soft/80">{m.license}</p>
              )}
              <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
                {m.bio.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              <a
                href={whatsappHref()}
                className="mt-8 inline-block rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition-all hover:scale-[1.02] hover:bg-brand-dark"
              >
                Pide tu cita con {m.name}
              </a>
            </Reveal>
          </article>
        ))}
      </section>

      <CTA />
    </>
  );
}

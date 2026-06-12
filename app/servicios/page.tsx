import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import { visibleServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Entrenamiento, nutrición, fisioterapia y psicología: cuatro disciplinas coordinadas para cuidar de tu salud de forma integral.",
};

export default function ServiciosPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-16 md:pt-44">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.3em] text-brand">
            SERVICIOS
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Cuatro disciplinas. Un solo equipo.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            En tu primera visita realizamos una valoración inicial y te
            recomendamos el camino más eficiente. No tienes que decidirlo tú.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12">
        {visibleServices.map((s, i) => (
          <Reveal key={s.slug} delay={i * 60}>
            <Link
              href={`/servicios/${s.slug}`}
              className="group grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-brand/10 md:grid-cols-2"
            >
              <div
                className={`relative aspect-[16/10] md:aspect-auto md:min-h-[320px] ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="text-xs font-semibold tracking-[0.25em] text-brand-light">
                  {s.tagline.toUpperCase()}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                  {s.name}
                </h2>
                <p className="mt-4 leading-relaxed text-ink-soft">{s.intro}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.items.slice(0, 4).map((item) => (
                    <li
                      key={item.title}
                      className="rounded-full bg-mist px-3.5 py-1.5 text-xs font-medium text-brand-dark"
                    >
                      {item.title}
                    </li>
                  ))}
                  {s.items.length > 4 && (
                    <li className="rounded-full bg-mist px-3.5 py-1.5 text-xs font-medium text-brand-dark">
                      +{s.items.length - 4} más
                    </li>
                  )}
                </ul>
                <p className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand">
                  Ver todo
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      <CTA />
    </>
  );
}

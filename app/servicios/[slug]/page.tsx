import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import { services, visibleServices } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.intro,
    // Las pestañas ocultas no deben indexarse todavía
    robots: service.hidden ? { index: false, follow: false } : undefined,
  };
}

export default async function ServicioPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = visibleServices.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/35 to-brand-deep/20" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-44">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.3em] text-brand-light">
              {service.tagline.toUpperCase()}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-6xl">
              {service.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
              {service.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {service.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 2) * 90}
              className="rounded-3xl border border-line bg-white p-8 shadow-sm transition-shadow hover:shadow-lg hover:shadow-brand/10"
            >
              <p className="font-mono text-sm text-brand-light">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 text-xl font-bold">{item.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {others.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-8">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight">
              También te puede interesar
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={`/servicios/${s.slug}`}
                  className="rounded-full border border-line px-5 py-2.5 font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      <CTA
        title={`Empieza con ${service.name.toLowerCase()}`}
        text="Escríbenos y te orientamos sin compromiso. La primera valoración define tu punto de partida y el camino más eficiente hacia tu objetivo."
      />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ScrollScale from "@/components/ScrollScale";
import BarbellScroll from "@/components/BarbellScroll";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import {
  visibleServices,
  team,
  reviews,
  purpose,
  whatsappHref,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* ------------------------------- Hero ------------------------------- */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-16 text-center">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,#e8f2fb_0%,transparent_70%)]"
          aria-hidden
        />
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.32em] text-brand">
            BÉTERA · VALENCIA
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 max-w-4xl text-balance text-5xl font-bold leading-[1.04] tracking-tight md:text-7xl">
            Tu salud no es una parcela.
            <br />
            <span className="bg-gradient-to-r from-brand-light to-brand-dark bg-clip-text text-transparent">
              Es tu hogar.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">
            Entrenamiento, nutrición, fisioterapia y psicología trabajando como
            un solo equipo, bajo un mismo techo. Bienvenido a tu club de salud
            integral.
          </p>
        </Reveal>
        <Reveal delay={340} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={whatsappHref()}
            className="rounded-full bg-brand px-8 py-4 font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:scale-[1.03] hover:bg-brand-dark"
          >
            Reserva tu valoración inicial
          </a>
          <Link
            href="/servicios"
            className="rounded-full border border-line px-8 py-4 font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            Descubre los servicios
          </Link>
        </Reveal>
        <div className="absolute bottom-8 animate-bounce text-ink-soft/50" aria-hidden>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* --------------------------- Imagen del club ------------------------ */}
      <section className="px-5 pb-10">
        <ScrollScale className="relative mx-auto aspect-[16/9] max-w-6xl rounded-[2rem] shadow-2xl shadow-brand-deep/15">
          <Image
            src="/photos/hero-gym.jpg"
            alt="Sala de entrenamiento de ENDO Wellness Club"
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/50 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-7 text-sm font-medium text-white/90 md:text-base">
            Un espacio que se siente hogar — diseñado para cuidarte.
          </p>
        </ScrollScale>
      </section>

      {/* ------------------------------ Intro ------------------------------- */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
              No tratamos síntomas.
              <br />
              Tratamos personas.
            </h2>
          </Reveal>
          <div>
            <Reveal delay={120}>
              <p className="text-lg leading-relaxed text-ink-soft">
                {purpose.mission.body}
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-8 grid grid-cols-3 gap-6">
              {[
                ["4", "disciplinas coordinadas"],
                ["6", "personas máx. por grupo"],
                ["0", "permanencia"],
              ].map(([n, label]) => (
                <div key={label}>
                  <p className="text-4xl font-bold text-brand md:text-5xl">{n}</p>
                  <p className="mt-1 text-sm leading-snug text-ink-soft">{label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------- Barbell scroll experience -------------------- */}
      <BarbellScroll />

      {/* ----------------------------- Servicios ---------------------------- */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.3em] text-brand">
            SERVICIOS
          </p>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold tracking-tight md:text-5xl">
            Todo lo que tu cuerpo necesita, en un mismo lugar.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {visibleServices.map((s, i) => (
            <Reveal key={s.slug} delay={i * 90}>
              <Link
                href={`/servicios/${s.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-3xl"
              >
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-xs font-semibold tracking-[0.25em] text-brand-light">
                    {s.tagline.toUpperCase()}
                  </p>
                  <h3 className="mt-1.5 text-2xl font-bold text-white">
                    {s.name}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                    {s.intro}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    Saber más
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --------------------------- Instalaciones -------------------------- */}
      <Gallery />

      {/* ------------------------------ Equipo ------------------------------ */}
      <section className="bg-mist py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.3em] text-brand">
              EL EQUIPO
            </p>
            <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold tracking-tight md:text-5xl">
              Un equipo que conoce tu nombre.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.slug} delay={i * 90}>
                <Link href={`/quienes-somos#${m.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <Image
                      src={m.photo}
                      alt={`${m.name} — ${m.role}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="mt-4 font-bold text-ink">{m.name}</h3>
                  <p className="mt-0.5 text-sm text-ink-soft">{m.role}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-10">
            <Link
              href="/quienes-somos"
              className="inline-flex items-center gap-2 font-semibold text-brand transition-colors hover:text-brand-dark"
            >
              Conoce al equipo completo →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ Reseñas ----------------------------- */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.3em] text-brand">
            OPINIONES
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-5xl">
            Lo que dicen de nosotros.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal
              key={r.name}
              delay={i * 110}
              className="rounded-3xl border border-line bg-white p-7 shadow-sm"
            >
              <div className="flex gap-1 text-brand-light" aria-label={`${r.stars} estrellas`}>
                {Array.from({ length: r.stars }).map((_, s) => (
                  <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2l2.9 6.26L21.5 9.27l-4.75 4.87L17.8 21 12 17.77 6.2 21l1.05-6.86L2.5 9.27l6.6-1.01z" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 leading-relaxed text-ink-soft">“{r.text}”</p>
              <p className="mt-5 text-sm font-semibold text-ink">{r.name}</p>
              <p className="text-xs text-ink-soft/70">Reseña de Google</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}

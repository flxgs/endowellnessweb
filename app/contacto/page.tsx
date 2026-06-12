import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { site, departmentEmails, whatsappHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Encuéntranos en C/ Trinquet 4, Bétera (Valencia). Escríbenos a info@endowellnessclub.es o por WhatsApp.",
};

export default function ContactoPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-16 md:pt-44">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.3em] text-brand">
            CONTACTO
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Ven a conocernos.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Estamos en Bétera, a un paso de Valencia. Pásate a ver el club,
            escríbenos o reserva directamente tu valoración inicial.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-24 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-8">
          <Reveal className="rounded-3xl border border-line bg-white p-8 shadow-sm">
            <h2 className="text-xs font-semibold tracking-[0.25em] text-brand">
              DIRECCIÓN
            </h2>
            <p className="mt-3 text-lg font-semibold">{site.address}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-medium text-brand hover:text-brand-dark"
            >
              Cómo llegar →
            </a>
          </Reveal>

          <Reveal delay={100} className="rounded-3xl border border-line bg-white p-8 shadow-sm">
            <h2 className="text-xs font-semibold tracking-[0.25em] text-brand">
              ESCRÍBENOS
            </h2>
            <ul className="mt-4 space-y-3">
              {departmentEmails.map((d) => (
                <li key={d.email} className="flex flex-col">
                  <span className="text-sm text-ink-soft">{d.area}</span>
                  <a
                    href={`mailto:${d.email}`}
                    className="font-medium text-brand hover:text-brand-dark"
                  >
                    {d.email}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200} className="rounded-3xl bg-gradient-to-br from-brand to-brand-deep p-8 text-white shadow-lg shadow-brand/20">
            <h2 className="text-xs font-semibold tracking-[0.25em] text-brand-light">
              RESPUESTA RÁPIDA
            </h2>
            <p className="mt-3 leading-relaxed text-white/80">
              Muy pronto también por WhatsApp, teléfono e Instagram. Mientras
              tanto, el email es el canal más directo.
            </p>
            <a
              href={whatsappHref()}
              className="mt-5 inline-block rounded-full bg-white px-6 py-3 font-semibold text-brand-dark transition-transform hover:scale-[1.03]"
            >
              Contactar ahora
            </a>
          </Reveal>
        </div>

        <Reveal delay={150} className="overflow-hidden rounded-[2rem] border border-line shadow-sm">
          <iframe
            title="Mapa — ENDO Wellness Club, C/ Trinquet 4, Bétera"
            src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`}
            className="h-full min-h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>
      </section>
    </>
  );
}

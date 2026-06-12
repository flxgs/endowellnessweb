import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import CTA from "@/components/CTA";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Resolvemos las dudas más habituales sobre ENDO Wellness Club: sesiones, bonos, lesiones, nutrición, precios y mucho más.",
};

export default function FaqPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-5 pt-36 pb-12 text-center md:pt-44">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.3em] text-brand">
            FAQ
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Preguntas frecuentes
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            ¿No encuentras tu respuesta? Escríbenos y te la damos en persona —
            con la misma honestidad que aplicamos en consulta.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-12">
        <Reveal delay={100}>
          <Accordion items={faqs} />
        </Reveal>
      </section>

      <CTA
        title="¿Te queda alguna duda?"
        text="Cuéntanosla por WhatsApp o email y el equipo te responderá de forma ágil. Sin compromiso."
      />
    </>
  );
}

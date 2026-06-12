import Reveal from "./Reveal";
import { whatsappHref, site } from "@/lib/content";

export default function CTA({
  title = "Empieza con una valoración inicial",
  text = "Cuéntanos tu punto de partida y tu objetivo. Nosotros te recomendamos el camino más eficiente — sin permanencia y pagando solo por lo que necesitas.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="px-5 py-24">
      <Reveal className="mx-auto max-w-4xl rounded-[2rem] bg-gradient-to-br from-brand-dark via-brand to-brand-deep px-8 py-16 text-center text-white shadow-2xl shadow-brand/20 md:px-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/75">
          {text}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappHref()}
            className="rounded-full bg-white px-7 py-3.5 font-semibold text-brand-dark transition-transform hover:scale-[1.03]"
          >
            Escríbenos ahora
          </a>
          <a
            href={`mailto:${site.email}`}
            className="rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
          >
            {site.email}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

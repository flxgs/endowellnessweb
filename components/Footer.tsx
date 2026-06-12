import Link from "next/link";
import { LogoLockup } from "./Logo";
import { site, departmentEmails, visibleServices } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-brand-deep text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <LogoLockup dark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            Tu salud no es una parcela, es tu hogar. Entrenamiento, nutrición,
            fisioterapia y psicología bajo un mismo techo en Bétera.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.2em] text-white/50">
            SERVICIOS
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {visibleServices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicios/${s.slug}`}
                  className="text-white/80 transition-colors hover:text-white"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.2em] text-white/50">
            CLUB
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              ["/quienes-somos", "Quiénes somos"],
              ["/nuestra-finalidad", "Nuestra finalidad"],
              ["/blog", "Blog"],
              ["/faq", "Preguntas frecuentes"],
              ["/contacto", "Contacto"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-white/80 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.2em] text-white/50">
            CONTACTO
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            <li>{site.address}</li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </li>
            {departmentEmails.slice(1).map((d) => (
              <li key={d.email}>
                <a
                  href={`mailto:${d.email}`}
                  className="text-white/60 transition-colors hover:text-white"
                >
                  {d.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-white/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} ENDO Wellness Club · {site.domain}
          </p>
          <p>Bétera, Valencia</p>
        </div>
      </div>
    </footer>
  );
}

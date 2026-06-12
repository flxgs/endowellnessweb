"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoLockup } from "./Logo";
import { whatsappHref } from "@/lib/content";

const links = [
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/nuestra-finalidad", label: "Nuestra finalidad" },
  { href: "/servicios", label: "Servicios" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-white/85 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[72px]">
        <Link href="/" aria-label="ENDO Wellness Club — Inicio">
          <LogoLockup />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-[0.92rem] font-medium transition-colors hover:text-brand ${
                  pathname.startsWith(l.href) ? "text-brand" : "text-ink-soft"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={whatsappHref()}
              className="rounded-full bg-brand px-5 py-2.5 text-[0.92rem] font-semibold text-white transition-all hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/25"
            >
              Reserva tu valoración
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <span
            className={`h-0.5 w-6 bg-ink transition-transform duration-300 ${
              open ? "translate-y-1 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-1 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <ul className="space-y-1 border-t border-line px-5 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-lg px-3 py-2.5 text-lg font-medium text-ink hover:bg-mist"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 pb-1">
              <a
                href={whatsappHref()}
                className="block rounded-full bg-brand px-5 py-3 text-center font-semibold text-white"
              >
                Reserva tu valoración
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

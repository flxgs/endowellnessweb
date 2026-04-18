import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { LocaleSwitcher } from "./locale-switcher";
import { navLinks, siteName } from "../site-data";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const t = useTranslations("Shell");
  const navLinkClassName = cn(
    buttonVariants({ variant: "ghost", size: "sm" }),
    "h-8 rounded-full px-3 text-sm font-medium text-foreground/80",
  );
  const primaryLinkClassName = cn(
    buttonVariants({ variant: "default", size: "sm" }),
    "h-9 rounded-full px-4 text-sm font-semibold shadow-none",
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full p-1"
            aria-label={t("homeAriaLabel")}
          >
            <Image
              src="/blue-gradient.svg"
              alt="ENDO logo"
              width={136}
              height={136}
              className="h-10 w-10 rounded-full object-cover"
              priority
              sizes="40px"
            />
            <span className="text-sm font-semibold tracking-wide text-foreground">{siteName}</span>
          </Link>
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <Link href="/contacto" className={primaryLinkClassName}>
              {t("primaryCta")}
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-6xl px-4 pb-3 sm:px-6 lg:px-8">
          <nav className="no-scrollbar flex gap-1 overflow-x-auto" aria-label="Primary">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClassName}>
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      <footer className="border-t border-border/80 bg-background">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:px-8">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">{siteName}</p>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{t("footerCopy")}</p>
          </div>
          <div className="flex flex-wrap gap-1 lg:justify-end">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClassName}>
                {t(link.labelKey)}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

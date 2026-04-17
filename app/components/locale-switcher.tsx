"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LocaleSwitcher");

  return (
    <div className="locale-switcher" aria-label={t("label")} role="group">
      {routing.locales.map((nextLocale) => (
        <Link
          key={nextLocale}
          href={pathname}
          locale={nextLocale}
          className={`locale-option${locale === nextLocale ? " is-active" : ""}`}
        >
          {t(nextLocale)}
        </Link>
      ))}
    </div>
  );
}

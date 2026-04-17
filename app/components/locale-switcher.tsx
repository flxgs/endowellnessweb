"use client";

import { useLocale, useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LocaleSwitcher");

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/80 p-1"
      aria-label={t("label")}
      role="group"
    >
      {routing.locales.map((nextLocale) => (
        <Link
          key={nextLocale}
          href={pathname}
          locale={nextLocale}
          className={cn(
            buttonVariants({
              variant: locale === nextLocale ? "default" : "ghost",
              size: "xs",
            }),
            "h-7 min-w-9 rounded-full px-2 text-[0.68rem] tracking-[0.12em]",
          )}
        >
          {t(nextLocale)}
        </Link>
      ))}
    </div>
  );
}

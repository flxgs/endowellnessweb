import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
    "h-8 rounded-full border border-transparent px-3 text-sm font-medium text-foreground/75 hover:border-border hover:bg-muted hover:text-foreground",
  );
  const primaryLinkClassName = cn(
    buttonVariants({ variant: "default", size: "sm" }),
    "h-9 rounded-full px-4 text-sm font-semibold",
  );

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1220px] flex-col px-4 pb-10 pt-4 sm:px-6 lg:px-8">
      <Card className="sticky top-4 z-40 border-border/70 bg-card/95 py-0 shadow-sm backdrop-blur">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-full p-1 transition hover:bg-muted/70"
              aria-label={t("homeAriaLabel")}
            >
              <Image
                src="/blue-gradient.svg"
                alt="ENDO logo"
                width={136}
                height={136}
                className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14"
                priority
                sizes="(max-width: 900px) 56px, 64px"
              />
              <span className="hidden text-sm font-semibold tracking-wide text-foreground sm:inline">
                {siteName}
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <LocaleSwitcher />
              <Link href="/contacto" className={primaryLinkClassName}>
                {t("primaryCta")}
              </Link>
            </div>
          </div>
          <Separator className="my-4" />
          <nav className="flex flex-wrap gap-2" aria-label="Primary">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClassName}>
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
        </CardContent>
      </Card>
      <main className="mt-8 flex-1">{children}</main>
      <Card className="mt-10 border-border/70 bg-card/85 py-0 shadow-sm">
        <CardContent className="grid gap-6 p-6 md:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,1fr)_auto_240px]">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">{siteName}</p>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{t("footerCopy")}</p>
          </div>
          <div className="grid content-start gap-2 text-sm">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClassName}>
                {t(link.labelKey)}
              </Link>
            ))}
          </div>
          <div className="overflow-hidden rounded-xl border border-border/70">
            <Image
              src="/wellness-club/nutrition-lab.png"
              alt="Interior consultation lounge at ENDO Wellness Club"
              width={260}
              height={180}
              className="h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

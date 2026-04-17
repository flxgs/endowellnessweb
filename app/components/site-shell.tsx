import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";

import { LocaleSwitcher } from "./locale-switcher";
import { navLinks, siteName } from "../site-data";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const t = useTranslations("Shell");

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link href="/" className="brand-mark" aria-label={t("homeAriaLabel")}>
          <Image
            src="/blue-gradient.svg"
            alt="ENDO logo"
            width={88}
            height={88}
            className="brand-logo"
            priority
            sizes="(max-width: 900px) 56px, 72px"
          />
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="site-nav-link">
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <LocaleSwitcher />
          <Link href="/membership" className="nav-cta">
            {t("bookVisit")}
          </Link>
        </div>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div>
          <p className="footer-title">{siteName}</p>
          <p className="footer-copy">{t("footerCopy")}</p>
        </div>
        <div className="footer-links">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {t(link.labelKey)}
            </Link>
          ))}
        </div>
        <div className="footer-image">
          <Image
            src="/wellness-club/nutrition-lab.png"
            alt="Interior consultation lounge at ENDO Wellness Club"
            width={260}
            height={180}
          />
        </div>
      </footer>
    </div>
  );
}

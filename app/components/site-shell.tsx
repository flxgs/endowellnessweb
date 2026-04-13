import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { navLinks, siteName } from "../site-data";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link href="/" className="brand-mark" aria-label={`${siteName} home`}>
          <Image
            src="/blue-gradient.svg"
            alt="ENDO logo"
            width={148}
            height={44}
            className="brand-logo"
            priority
          />
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="site-nav-link">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/membership" className="nav-cta">
          Book a Visit
        </Link>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div>
          <p className="footer-title">{siteName}</p>
          <p className="footer-copy">
            Strength, recovery, movement, nutrition, and social wellness under one roof.
          </p>
        </div>
        <div className="footer-links">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
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

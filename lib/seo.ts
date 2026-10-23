import type { Metadata } from "next";
import { site } from "./content";

export function pageMetadata(title: string, description: string, path: string, image = "/photos/club/dsc00116.webp"): Metadata {
  const url = `https://${site.domain}${path}`;
  return {
    title, description,
    keywords: ["ENDO Wellness Club", "Bétera", title],
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, locale: "es_ES", type: "website", images: [{ url: image, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export const business = {
  "@type": "HealthClub",
  "@id": `https://${site.domain}/#club`,
  name: site.name,
  url: `https://${site.domain}`,
  image: `https://${site.domain}/photos/club/dsc00116.webp`,
  telephone: site.phone,
  email: site.email,
  sameAs: [site.instagram],
  address: { "@type": "PostalAddress", streetAddress: "C/ Trinquet 4", addressLocality: "Bétera", postalCode: "46117", addressRegion: "Valencia", addressCountry: "ES" },
};

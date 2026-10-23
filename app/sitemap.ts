import type { MetadataRoute } from "next";
import { site, visibleServices, posts } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/servicios", "/contacto", "/quienes-somos", "/nuestra-finalidad", "/faq", "/blog", ...visibleServices.map(s => `/servicios/${s.slug}`), ...posts.map(p => `/blog/${p.slug}`)];
  return paths.map(path => ({ url: `https://${site.domain}${path}`, changeFrequency: "monthly", priority: path === "" ? 1 : path.startsWith("/blog/") ? 0.6 : 0.8 }));
}

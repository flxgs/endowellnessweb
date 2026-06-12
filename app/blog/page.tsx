import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { posts, blogCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre entrenamiento, nutrición, fisioterapia y psicología escritos por el equipo de ENDO Wellness Club.",
};

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-12 md:pt-44">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.3em] text-brand">
            BLOG
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Salud con evidencia, contada en claro.
          </h1>
          <div className="mt-7 flex flex-wrap gap-2">
            {blogCategories.map((c) => (
              <span
                key={c}
                className="rounded-full bg-mist px-4 py-2 text-sm font-medium text-brand-dark"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <Reveal>
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-brand/10 md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] md:aspect-auto">
              <Image
                src={featured.image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="text-xs font-semibold tracking-[0.25em] text-brand-light">
                {featured.category.toUpperCase()}
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                {featured.excerpt}
              </p>
              <p className="mt-5 text-sm text-ink-soft/70">
                {formatDate(featured.date)} · {featured.readingMinutes} min de
                lectura
              </p>
            </div>
          </Link>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <p className="mt-5 text-xs font-semibold tracking-[0.25em] text-brand-light">
                  {post.category.toUpperCase()}
                </p>
                <h2 className="mt-2 text-xl font-bold leading-snug tracking-tight transition-colors group-hover:text-brand">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
                  {post.excerpt}
                </p>
                <p className="mt-3 text-sm text-ink-soft/70">
                  {formatDate(post.date)} · {post.readingMinutes} min
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

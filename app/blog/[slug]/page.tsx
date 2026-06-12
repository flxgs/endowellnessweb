import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import { posts } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="mx-auto max-w-3xl px-5 pt-36 pb-20 md:pt-44">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.25em] text-brand-light">
            {post.category.toUpperCase()}
          </p>
          <h1 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-sm text-ink-soft/70">
            {formatDate(post.date)} · {post.readingMinutes} min de lectura ·
            Equipo ENDO
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative mt-9 aspect-[16/9] overflow-hidden rounded-3xl">
            <Image
              src={post.image}
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={200} className="mt-10 space-y-6 text-lg leading-relaxed text-ink-soft">
          {post.body.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </Reveal>
      </article>

      <section className="mx-auto max-w-6xl border-t border-line px-5 py-16">
        <h2 className="text-2xl font-bold tracking-tight">Sigue leyendo</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <p className="mt-4 text-xs font-semibold tracking-[0.25em] text-brand-light">
                {p.category.toUpperCase()}
              </p>
              <h3 className="mt-1.5 font-bold leading-snug transition-colors group-hover:text-brand">
                {p.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}

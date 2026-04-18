import Image from "next/image";
import { getMessages } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SectionHeader } from "../components/section-header";

type HomeSpace = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

type HomeReview = {
  name: string;
  rating: string;
  text: string;
};

type HomeStat = {
  value: string;
  label: string;
};

type HomePageMessages = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  primaryCta: string;
  secondaryCta: string;
  heroBadgeTop: string;
  heroBadgeBottom: string;
  introEyebrow: string;
  introTitle: string;
  introDescription: string;
  spacesEyebrow: string;
  spacesTitle: string;
  reviewsEyebrow: string;
  reviewsTitle: string;
  reviewsDescription: string;
  stats: HomeStat[];
  spaces: HomeSpace[];
  reviews: HomeReview[];
};

export default async function Home() {
  const messages = (await getMessages()) as { HomePage: HomePageMessages };
  const home = messages.HomePage;
  const primaryActionClassName = cn(
    buttonVariants({ variant: "default", size: "lg" }),
    "h-10 rounded-full px-4 text-sm font-semibold shadow-none",
  );
  const secondaryActionClassName = cn(
    buttonVariants({ variant: "outline", size: "lg" }),
    "h-10 rounded-full px-4 text-sm font-semibold",
  );

  return (
    <div className="space-y-14">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.14em] text-primary/80 uppercase">{home.heroEyebrow}</p>
            <h1 className="max-w-[12ch] text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {home.heroTitle}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{home.heroDescription}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/servicios" className={primaryActionClassName}>
              {home.primaryCta}
            </Link>
            <Link href="/contacto" className={secondaryActionClassName}>
              {home.secondaryCta}
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {home.stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border/80 bg-card p-4">
                <p className="text-3xl leading-none font-semibold tracking-tight text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-border/80 bg-card">
          <div className="relative aspect-[4/5]">
            <Image
              src="/wellness-club/hero-club.png"
              alt="Interior view of a premium wellness club with lounge and training areas"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute right-4 bottom-4 rounded-lg bg-background/95 px-3 py-2">
              <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {home.heroBadgeTop}
              </p>
              <p className="text-sm font-semibold text-foreground">{home.heroBadgeBottom}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader eyebrow={home.introEyebrow} title={home.introTitle} description={home.introDescription} />
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow={home.spacesEyebrow} title={home.spacesTitle} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {home.spaces.map((space) => (
            <Card key={space.title} className="overflow-hidden border-border/80 bg-card py-0 shadow-none">
              <div className="relative aspect-[4/3]">
                <Image
                  src={space.image}
                  alt={space.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 28vw"
                />
              </div>
              <CardHeader className="space-y-1.5">
                <CardTitle className="text-xl leading-tight text-foreground">{space.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{space.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow={home.reviewsEyebrow} title={home.reviewsTitle} description={home.reviewsDescription} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {home.reviews.map((review) => (
            <Card key={review.name} className="border-border/80 bg-card shadow-none">
              <CardContent className="space-y-3 p-5">
                <p className="text-sm font-semibold tracking-[0.08em] text-primary">{review.rating}</p>
                <p className="text-base leading-relaxed text-foreground/85">“{review.text}”</p>
                <p className="text-sm font-semibold text-foreground">{review.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

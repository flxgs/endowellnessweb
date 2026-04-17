import Image from "next/image";
import { getMessages } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

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
    "h-10 rounded-full px-4 text-sm font-semibold",
  );
  const secondaryActionClassName = cn(
    buttonVariants({ variant: "outline", size: "lg" }),
    "h-10 rounded-full px-4 text-sm font-semibold",
  );

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <Card className="border-border/70 bg-card/85 shadow-sm">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {home.heroEyebrow}
              </p>
              <h1 className="max-w-[11ch] text-4xl leading-[0.96] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
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
                <Card key={stat.label} size="sm" className="border-border/70 bg-background/70 py-0 shadow-none">
                  <CardContent className="space-y-1 p-4">
                    <p className="text-3xl leading-none font-semibold tracking-tight text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm leading-snug text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-border/70 bg-card/85 py-0 shadow-sm">
          <div className="relative aspect-[4/5]">
            <Image
              src="/wellness-club/hero-club.png"
              alt="Interior view of a premium wellness club with lounge and training areas"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute right-4 bottom-4 rounded-xl border border-border/80 bg-background/90 px-4 py-3 shadow-sm backdrop-blur">
              <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {home.heroBadgeTop}
              </p>
              <p className="text-sm font-semibold text-foreground">{home.heroBadgeBottom}</p>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {home.introEyebrow}
          </p>
          <h2 className="max-w-[20ch] text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
            {home.introTitle}
          </h2>
        </div>
        <Card className="border-border/70 bg-card/85 shadow-sm">
          <CardContent className="p-6 sm:p-7">
            <p className="max-w-4xl text-base leading-relaxed text-muted-foreground">{home.introDescription}</p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {home.spacesEyebrow}
          </p>
          <h2 className="max-w-[20ch] text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
            {home.spacesTitle}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {home.spaces.map((space) => (
            <Card key={space.title} className="overflow-hidden border-border/70 bg-card/85 py-0 shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image src={space.image} alt={space.alt} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 28vw" />
              </div>
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl leading-tight text-foreground">{space.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{space.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {home.reviewsEyebrow}
          </p>
          <h2 className="max-w-[20ch] text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
            {home.reviewsTitle}
          </h2>
        </div>
        <p className="max-w-4xl text-base leading-relaxed text-muted-foreground">{home.reviewsDescription}</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {home.reviews.map((review) => (
            <Card key={review.name} className="border-border/70 bg-card/85 shadow-sm">
              <CardHeader className="space-y-2">
                <p className="text-sm font-semibold tracking-[0.08em] text-amber-600">{review.rating}</p>
                <CardDescription className="text-base leading-relaxed text-foreground/80">{review.text}</CardDescription>
                <CardTitle className="text-base font-semibold text-foreground">{review.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

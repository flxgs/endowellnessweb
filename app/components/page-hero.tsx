type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="space-y-4 border-b border-border/80 pb-8">
      <p className="text-xs font-semibold tracking-[0.14em] text-primary/80 uppercase">{eyebrow}</p>
      <h1 className="max-w-[16ch] text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{description}</p>
    </section>
  );
}

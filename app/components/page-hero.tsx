import { Card, CardContent } from "@/components/ui/card";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <Card className="border-border/70 bg-card/85 shadow-sm">
      <CardContent className="space-y-4 p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">{eyebrow}</p>
        <h1 className="max-w-[15ch] text-3xl leading-[1.02] font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

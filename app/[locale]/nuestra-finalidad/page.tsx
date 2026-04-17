import { getMessages } from "next-intl/server";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { PageHero } from "../../components/page-hero";

type ValueItem = {
  title: string;
  description: string;
};

type PurposePageMessages = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  missionTitle: string;
  missionDescription: string;
  visionTitle: string;
  visionDescription: string;
  valuesEyebrow: string;
  valuesTitle: string;
  values: ValueItem[];
};

export default async function NuestraFinalidadPage() {
  const messages = (await getMessages()) as { PurposePage: PurposePageMessages };
  const purpose = messages.PurposePage;

  return (
    <div className="space-y-10">
      <PageHero
        eyebrow={purpose.heroEyebrow}
        title={purpose.heroTitle}
        description={purpose.heroDescription}
      />

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/70 bg-card/85 shadow-sm">
          <CardHeader className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {purpose.missionTitle}
            </p>
            <CardTitle className="text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl">
              {purpose.missionDescription}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-border/70 bg-card/85 shadow-sm">
          <CardHeader className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {purpose.visionTitle}
            </p>
            <CardTitle className="text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl">
              {purpose.visionDescription}
            </CardTitle>
          </CardHeader>
        </Card>
      </section>

      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {purpose.valuesEyebrow}
          </p>
          <h2 className="max-w-[20ch] text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
            {purpose.valuesTitle}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {purpose.values.map((value) => (
            <Card key={value.title} className="border-border/70 bg-card/85 shadow-sm">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl leading-tight text-foreground">{value.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{value.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

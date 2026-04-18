import { getMessages } from "next-intl/server";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { PageHero } from "../../components/page-hero";
import { SectionHeader } from "../../components/section-header";

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
    <div className="space-y-12">
      <PageHero
        eyebrow={purpose.heroEyebrow}
        title={purpose.heroTitle}
        description={purpose.heroDescription}
      />

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/80 bg-card shadow-none">
          <CardHeader className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.14em] text-primary/80 uppercase">
              {purpose.missionTitle}
            </p>
            <CardTitle className="text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl">
              {purpose.missionDescription}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-border/80 bg-card shadow-none">
          <CardHeader className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.14em] text-primary/80 uppercase">
              {purpose.visionTitle}
            </p>
            <CardTitle className="text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl">
              {purpose.visionDescription}
            </CardTitle>
          </CardHeader>
        </Card>
      </section>

      <section className="space-y-6">
        <SectionHeader eyebrow={purpose.valuesEyebrow} title={purpose.valuesTitle} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {purpose.values.map((value) => (
            <Card key={value.title} className="border-border/80 bg-card shadow-none">
              <CardHeader className="space-y-1.5">
                <CardTitle className="text-2xl leading-tight text-foreground">{value.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{value.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

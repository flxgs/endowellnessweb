import { getMessages } from "next-intl/server";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { PageHero } from "../../components/page-hero";

type ServiceCategory = {
  title: string;
  description: string;
  hidden?: boolean;
};

type ServicesPageMessages = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionDescription: string;
  categories: ServiceCategory[];
};

export default async function ServiciosPage() {
  const messages = (await getMessages()) as { ServicesPage: ServicesPageMessages };
  const services = messages.ServicesPage;
  const visibleCategories = services.categories.filter((category) => !category.hidden);

  return (
    <div className="space-y-10">
      <PageHero
        eyebrow={services.heroEyebrow}
        title={services.heroTitle}
        description={services.heroDescription}
      />

      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {services.sectionEyebrow}
          </p>
          <h2 className="max-w-[20ch] text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
            {services.sectionTitle}
          </h2>
        </div>
        <p className="max-w-4xl text-base leading-relaxed text-muted-foreground">{services.sectionDescription}</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleCategories.map((category) => (
            <Card key={category.title} className="border-border/70 bg-card/85 shadow-sm">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl leading-tight text-foreground">{category.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{category.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

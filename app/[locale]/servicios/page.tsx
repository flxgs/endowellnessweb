import { getMessages } from "next-intl/server";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { PageHero } from "../../components/page-hero";
import { SectionHeader } from "../../components/section-header";

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
    <div className="space-y-12">
      <PageHero
        eyebrow={services.heroEyebrow}
        title={services.heroTitle}
        description={services.heroDescription}
      />

      <section className="space-y-6">
        <SectionHeader
          eyebrow={services.sectionEyebrow}
          title={services.sectionTitle}
          description={services.sectionDescription}
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleCategories.map((category) => (
            <Card key={category.title} className="border-border/80 bg-card shadow-none">
              <CardHeader className="space-y-1.5">
                <CardTitle className="text-2xl leading-tight text-foreground">{category.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{category.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

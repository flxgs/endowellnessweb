import { getMessages } from "next-intl/server";

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
    <div className="page-stack">
      <PageHero
        eyebrow={services.heroEyebrow}
        title={services.heroTitle}
        description={services.heroDescription}
      />

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">{services.sectionEyebrow}</p>
          <h2>{services.sectionTitle}</h2>
        </div>
        <p className="page-hero-copy">{services.sectionDescription}</p>
        <div className="service-grid">
          {visibleCategories.map((category) => (
            <article key={category.title} className="service-card">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

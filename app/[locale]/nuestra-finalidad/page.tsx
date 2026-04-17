import { getMessages } from "next-intl/server";

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
    <div className="page-stack">
      <PageHero
        eyebrow={purpose.heroEyebrow}
        title={purpose.heroTitle}
        description={purpose.heroDescription}
      />

      <section className="identity-grid">
        <article className="identity-card">
          <p className="eyebrow">{purpose.missionTitle}</p>
          <h2>{purpose.missionDescription}</h2>
        </article>
        <article className="identity-card">
          <p className="eyebrow">{purpose.visionTitle}</p>
          <h2>{purpose.visionDescription}</h2>
        </article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">{purpose.valuesEyebrow}</p>
          <h2>{purpose.valuesTitle}</h2>
        </div>
        <div className="value-grid">
          {purpose.values.map((value) => (
            <article key={value.title} className="pillar-card">
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

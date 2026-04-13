import Image from "next/image";

import { PageHero } from "../components/page-hero";
import { pillars } from "../site-data";

export default function AboutPage() {
  return (
    <div className="page-stack">
      <PageHero
        eyebrow="About ENDO"
        title="A club model built around real health, not gym clichés."
        description="We built ENDO for members who want serious training options, restorative spaces, and professional guidance in one place."
      />

      <section className="story-layout">
        <div className="story-copy">
          <h2>Wellness becomes sustainable when every discipline supports the others.</h2>
          <p>
            ENDO combines high-performance equipment with soft-touch hospitality. Members can move
            from a coached powerlifting session to a pilates reset, grab a recovery drink, then sit
            down with a nutrition professional without feeling like they&apos;ve entered four different businesses.
          </p>
          <p>
            The result is a space that fits ambitious training goals and everyday wellbeing. It is
            structured enough for athletes, welcoming enough for beginners, and social enough to keep
            people coming back.
          </p>
        </div>
        <div className="story-image">
          <Image
            src="/wellness-club/nutrition-lab.png"
            alt="Nutrition consultation lounge inside ENDO Wellness Club"
            width={820}
            height={980}
          />
        </div>
      </section>

      <section className="pillar-grid">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="pillar-card">
            <h3>{pillar.title}</h3>
            <p>{pillar.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

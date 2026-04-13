import Link from "next/link";

import { PageHero } from "../components/page-hero";
import { membershipTiers } from "../site-data";

export default function MembershipPage() {
  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Membership"
        title="Choose a membership that matches how much support you want."
        description="Every tier is built around access, but the real difference is how much coaching and professional guidance comes with it."
      />

      <section className="membership-grid">
        {membershipTiers.map((tier) => (
          <article key={tier.name} className="membership-card">
            <p className="membership-name">{tier.name}</p>
            <p className="membership-price">
              {tier.price}
              <span>{tier.cadence}</span>
            </p>
            <p className="membership-copy">{tier.description}</p>
            <div className="membership-perks">
              {tier.perks.map((perk) => (
                <p key={perk}>{perk}</p>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="contact-panel">
        <div>
          <p className="eyebrow">Visit the club</p>
          <h2>Book a walkthrough, meet the team, and train for a day before joining.</h2>
          <p className="page-hero-copy">
            ENDO Wellness Club
            <br />
            415 Mercer Avenue
            <br />
            Santa Monica, CA
          </p>
        </div>
        <div className="contact-actions">
          <a href="mailto:hello@endowellness.club" className="primary-button">
            hello@endowellness.club
          </a>
          <Link href="/schedule" className="secondary-button">
            See the Class Schedule
          </Link>
        </div>
      </section>
    </div>
  );
}

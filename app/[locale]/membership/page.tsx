import { getMessages, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { FaqSection, type FaqItem } from "../../components/faq-section";
import { PageHero } from "../../components/page-hero";
import { membershipTiers } from "../../site-data";

function extractFaqItems(messages: Record<string, unknown>): FaqItem[] {
  const membership = messages.MembershipPage;
  if (!membership || typeof membership !== "object") return [];

  const rawItems = (membership as Record<string, unknown>).faqItems;
  if (!Array.isArray(rawItems)) return [];

  return rawItems.flatMap((item) => {
    if (!item || typeof item !== "object") return [];

    const value = item as Record<string, unknown>;
    const question = typeof value.question === "string" ? value.question : "";
    const answer = Array.isArray(value.answer)
      ? value.answer.filter((line): line is string => typeof line === "string")
      : [];
    const bullets = Array.isArray(value.bullets)
      ? value.bullets.filter((line): line is string => typeof line === "string")
      : undefined;

    if (!question || answer.length === 0) return [];
    return [{ question, answer, bullets }];
  });
}

export default async function MembershipPage() {
  const t = await getTranslations("MembershipPage");
  const messages = (await getMessages()) as Record<string, unknown>;
  const faqItems = extractFaqItems(messages);

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

      <FaqSection
        items={faqItems}
        eyebrow={t("faqEyebrow")}
        title={t("faqTitle")}
        intro={t("faqIntro")}
      />

      <section className="contact-panel">
        <div>
          <p className="eyebrow">{t("visitEyebrow")}</p>
          <h2>{t("visitTitle")}</h2>
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
            {t("viewScheduleCta")}
          </Link>
        </div>
      </section>
    </div>
  );
}

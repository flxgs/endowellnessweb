import { getMessages, getTranslations } from "next-intl/server";

import { FaqSection, type FaqItem } from "../../components/faq-section";
import { PageHero } from "../../components/page-hero";

function extractFaqItems(messages: Record<string, unknown>): FaqItem[] {
  const faq = messages.FaqPage;
  if (!faq || typeof faq !== "object") return [];

  const rawItems = (faq as Record<string, unknown>).items;
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

export default async function FaqPage() {
  const t = await getTranslations("FaqPage");
  const messages = (await getMessages()) as Record<string, unknown>;
  const items = extractFaqItems(messages);

  return (
    <div className="space-y-10">
      <PageHero eyebrow={t("heroEyebrow")} title={t("heroTitle")} description={t("heroDescription")} />
      <FaqSection
        items={items}
        eyebrow={t("sectionEyebrow")}
        title={t("sectionTitle")}
        intro={t("sectionIntro")}
      />
    </div>
  );
}

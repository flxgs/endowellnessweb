import type { FaqItem } from "../site-data";

type FaqSectionProps = {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  intro?: string;
};

export function FaqSection({
  items,
  eyebrow = "FAQ · Preguntas frecuentes",
  title = "Respuestas claras para que empieces con confianza.",
  intro,
}: FaqSectionProps) {
  return (
    <section className="section-block faq-section">
      <div className="section-heading faq-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro ? <p className="page-hero-copy">{intro}</p> : null}
      </div>
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.question} className="faq-item">
            <summary>{item.question}</summary>
            <div className="faq-answer">
              {item.answer.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {item.bullets?.length ? (
                <ul className="faq-bullets">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export type FaqItem = {
  question: string;
  answer: string[];
  bullets?: string[];
};

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
    <section className="space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">{eyebrow}</p>
        <h2 className="max-w-[22ch] text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {intro ? <p className="max-w-4xl text-base leading-relaxed text-muted-foreground">{intro}</p> : null}
      </div>
      <Card className="border-border/70 bg-card/85 py-0 shadow-sm">
        <CardContent className="p-2 sm:p-3">
          <Accordion multiple className="w-full">
            {items.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="border-b border-border/70 px-3 py-1 last:border-b-0 sm:px-4"
              >
                <AccordionTrigger className="py-4 text-base leading-snug font-semibold text-foreground hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-base leading-relaxed text-muted-foreground">
                  <div className="space-y-3">
                    {item.answer.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {item.bullets?.length ? (
                      <ul className="list-disc space-y-2 pl-5">
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}

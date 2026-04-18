import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "./section-header";

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
    <section className="space-y-6">
      <SectionHeader eyebrow={eyebrow} title={title} description={intro} />
      <Card className="border-border/80 bg-card py-0 shadow-none">
        <CardContent className="p-3 sm:p-4">
          <Accordion multiple className="w-full">
            {items.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="border-b border-border/80 px-2 py-1 last:border-b-0 sm:px-3"
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

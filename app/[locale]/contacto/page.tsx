import { getMessages } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PageHero } from "../../components/page-hero";

type ContactPageMessages = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  infoEyebrow: string;
  infoTitle: string;
  infoDescription: string;
  instagramLabel: string;
  instagramValue: string;
  phoneLabel: string;
  phoneValue: string;
  whatsappLabel: string;
  whatsappValue: string;
  whatsappButtonLabel: string;
  mailLabel: string;
  mailValue: string;
  addressLabel: string;
  addressValue: string;
  mapEyebrow: string;
  mapTitle: string;
};

export default async function ContactoPage() {
  const messages = (await getMessages()) as { ContactPage: ContactPageMessages };
  const contact = messages.ContactPage;

  return (
    <div className="space-y-10">
      <PageHero
        eyebrow={contact.heroEyebrow}
        title={contact.heroTitle}
        description={contact.heroDescription}
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/70 bg-card/85 shadow-sm">
          <CardHeader className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {contact.infoEyebrow}
            </p>
            <CardTitle className="text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
              {contact.infoTitle}
            </CardTitle>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{contact.infoDescription}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <dl className="space-y-4">
              <div className="grid gap-1">
                <dt className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                  {contact.instagramLabel}
                </dt>
                <dd className="text-base text-foreground/85">{contact.instagramValue}</dd>
              </div>
              <div className="grid gap-1">
                <dt className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                  {contact.phoneLabel}
                </dt>
                <dd className="text-base text-foreground/85">{contact.phoneValue}</dd>
              </div>
              <div className="grid gap-1">
                <dt className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                  {contact.whatsappLabel}
                </dt>
                <dd className="text-base text-foreground/85">{contact.whatsappValue}</dd>
              </div>
              <div className="grid gap-1">
                <dt className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                  {contact.mailLabel}
                </dt>
                <dd className="text-base text-foreground/85">
                  <a
                    href={`mailto:${contact.mailValue}`}
                    className="underline underline-offset-4 transition hover:text-foreground"
                  >
                    {contact.mailValue}
                  </a>
                </dd>
              </div>
              <div className="grid gap-1">
                <dt className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                  {contact.addressLabel}
                </dt>
                <dd className="text-base text-foreground/85">{contact.addressValue}</dd>
              </div>
            </dl>
            <Button type="button" variant="outline" disabled className="w-fit rounded-full px-4">
              {contact.whatsappButtonLabel}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/85 shadow-sm">
          <CardHeader className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {contact.mapEyebrow}
            </p>
            <CardTitle className="text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
              {contact.mapTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl border border-border/70 bg-muted">
              <iframe
                title="Mapa ENDO Wellness Club"
                src="https://www.google.com/maps?q=C%2F+Trinquet+4%2C+46117+B%C3%A9tera&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full border-0"
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

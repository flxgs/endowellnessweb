import { getMessages } from "next-intl/server";

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
    <div className="page-stack">
      <PageHero
        eyebrow={contact.heroEyebrow}
        title={contact.heroTitle}
        description={contact.heroDescription}
      />

      <section className="contact-layout">
        <article className="contact-card">
          <p className="eyebrow">{contact.infoEyebrow}</p>
          <h2>{contact.infoTitle}</h2>
          <p className="page-hero-copy">{contact.infoDescription}</p>
          <div className="contact-list">
            <p>
              <strong>{contact.instagramLabel}</strong>
              <span>{contact.instagramValue}</span>
            </p>
            <p>
              <strong>{contact.phoneLabel}</strong>
              <span>{contact.phoneValue}</span>
            </p>
            <p>
              <strong>{contact.whatsappLabel}</strong>
              <span>{contact.whatsappValue}</span>
            </p>
            <p>
              <strong>{contact.mailLabel}</strong>
              <a href={`mailto:${contact.mailValue}`}>{contact.mailValue}</a>
            </p>
            <p>
              <strong>{contact.addressLabel}</strong>
              <span>{contact.addressValue}</span>
            </p>
          </div>
          <button type="button" className="secondary-button whatsapp-button" disabled>
            {contact.whatsappButtonLabel}
          </button>
        </article>

        <article className="contact-card">
          <p className="eyebrow">{contact.mapEyebrow}</p>
          <h2>{contact.mapTitle}</h2>
          <div className="map-frame">
            <iframe
              title="Mapa ENDO Wellness Club"
              src="https://www.google.com/maps?q=C%2F+Trinquet+4%2C+46117+B%C3%A9tera&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </article>
      </section>
    </div>
  );
}

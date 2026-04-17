import Image from "next/image";
import { getMessages } from "next-intl/server";

import { Link } from "@/i18n/navigation";

type HomeSpace = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

type HomeReview = {
  name: string;
  rating: string;
  text: string;
};

type HomeStat = {
  value: string;
  label: string;
};

type HomePageMessages = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  primaryCta: string;
  secondaryCta: string;
  heroBadgeTop: string;
  heroBadgeBottom: string;
  introEyebrow: string;
  introTitle: string;
  introDescription: string;
  spacesEyebrow: string;
  spacesTitle: string;
  reviewsEyebrow: string;
  reviewsTitle: string;
  reviewsDescription: string;
  stats: HomeStat[];
  spaces: HomeSpace[];
  reviews: HomeReview[];
};

export default async function Home() {
  const messages = (await getMessages()) as { HomePage: HomePageMessages };
  const home = messages.HomePage;

  return (
    <div className="page-stack">
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{home.heroEyebrow}</p>
          <h1>{home.heroTitle}</h1>
          <p className="hero-text">{home.heroDescription}</p>
          <div className="hero-actions">
            <Link href="/servicios" className="primary-button">
              {home.primaryCta}
            </Link>
            <Link href="/contacto" className="secondary-button">
              {home.secondaryCta}
            </Link>
          </div>
          <div className="stats-grid">
            {home.stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src="/wellness-club/hero-club.png"
            alt="Interior view of a premium wellness club with lounge and training areas"
            width={960}
            height={1200}
            priority
          />
          <div className="hero-badge">
            <span>{home.heroBadgeTop}</span>
            <strong>{home.heroBadgeBottom}</strong>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">{home.introEyebrow}</p>
          <h2>{home.introTitle}</h2>
        </div>
        <p className="page-hero-copy">{home.introDescription}</p>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">{home.spacesEyebrow}</p>
          <h2>{home.spacesTitle}</h2>
        </div>
        <div className="home-space-grid">
          {home.spaces.map((space) => (
            <article key={space.title} className="gallery-card">
              <Image src={space.image} alt={space.alt} width={780} height={540} />
              <h3>{space.title}</h3>
              <p>{space.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">{home.reviewsEyebrow}</p>
          <h2>{home.reviewsTitle}</h2>
        </div>
        <p className="page-hero-copy">{home.reviewsDescription}</p>
        <div className="review-grid">
          {home.reviews.map((review) => (
            <article key={review.name} className="review-card">
              <p className="review-rating">{review.rating}</p>
              <p className="review-copy">{review.text}</p>
              <p className="review-author">{review.name}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

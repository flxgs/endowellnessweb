import Image from "next/image";
import Link from "next/link";

import {
  clubNotes,
  featuredPrograms,
  galleryImages,
  pillars,
  stats,
} from "./site-data";

export default function Home() {
  return (
    <div className="page-stack">
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Performance meets restoration</p>
          <h1>A wellness club for people who want more than a gym.</h1>
          <p className="hero-text">
            ENDO pairs powerlifting equipment, pilates studios, dance programming, nutrition
            guidance, and recovery spaces into one membership that actually feels elevated.
          </p>
          <div className="hero-actions">
            <Link href="/membership" className="primary-button">
              Explore Membership
            </Link>
            <Link href="/schedule" className="secondary-button">
              View This Week&apos;s Classes
            </Link>
          </div>
          <div className="stats-grid">
            {stats.map((stat) => (
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
            <span>Now booking</span>
            <strong>Founding memberships</strong>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Designed as a club</p>
          <h2>Every square foot supports strength, softness, and consistency.</h2>
        </div>
        <div className="pillar-grid">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="pillar-card">
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-feature">
        <div className="split-gallery">
          <Image
            src="/wellness-club/pilates-studio.png"
            alt="Pilates reformer studio with warm natural lighting"
            width={800}
            height={900}
          />
          <Image
            src="/wellness-club/strength-floor.png"
            alt="Strength training floor with machines and lifting stations"
            width={800}
            height={900}
          />
        </div>
        <div className="split-copy">
          <p className="eyebrow">Programming that spans your whole week</p>
          <h2>Train hard, move well, eat with intention, and recover without leaving the building.</h2>
          <div className="program-list">
            {featuredPrograms.map((program) => (
              <article key={program.name} className="program-card">
                <span>{program.tag}</span>
                <h3>{program.name}</h3>
                <p>{program.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Inside ENDO</p>
          <h2>A space that feels like hospitality first and training second.</h2>
        </div>
        <div className="gallery-strip">
          {galleryImages.slice(0, 3).map((image) => (
            <article key={image.title} className="gallery-card">
              <Image src={image.src} alt={image.title} width={700} height={520} />
              <h3>{image.title}</h3>
              <p>{image.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div>
          <p className="eyebrow">Membership includes more than access</p>
          <h2>Expect coaching, conversation, and a place you actually want to spend time in.</h2>
        </div>
        <div className="note-list">
          {clubNotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </section>
    </div>
  );
}

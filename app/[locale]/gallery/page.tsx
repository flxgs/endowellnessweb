import Image from "next/image";

import { PageHero } from "../../components/page-hero";
import { galleryImages } from "../../site-data";

export default function GalleryPage() {
  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Gallery"
        title="See the atmosphere before you ever step inside."
        description="From strength zones to reformer studios and consultation lounges, ENDO is designed to feel collected, cinematic, and genuinely usable."
      />

      <section className="masonry-grid">
        {galleryImages.map((image) => (
          <article key={image.title} className="masonry-card">
            <Image src={image.src} alt={image.title} width={900} height={1100} />
            <div className="masonry-copy">
              <h2>{image.title}</h2>
              <p>{image.description}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

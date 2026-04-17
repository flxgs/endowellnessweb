import { getMessages } from "next-intl/server";

import { PageHero } from "../../components/page-hero";

type BlogCategory = {
  title: string;
  description: string;
  hidden?: boolean;
};

type BlogPageMessages = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  categoriesEyebrow: string;
  categoriesTitle: string;
  categoriesDescription: string;
  emptyState: string;
  categories: BlogCategory[];
};

export default async function BlogPage() {
  const messages = (await getMessages()) as { BlogPage: BlogPageMessages };
  const blog = messages.BlogPage;
  const visibleCategories = blog.categories.filter((category) => !category.hidden);

  return (
    <div className="page-stack">
      <PageHero eyebrow={blog.heroEyebrow} title={blog.heroTitle} description={blog.heroDescription} />

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">{blog.categoriesEyebrow}</p>
          <h2>{blog.categoriesTitle}</h2>
        </div>
        <p className="page-hero-copy">{blog.categoriesDescription}</p>
        <div className="service-grid">
          {visibleCategories.map((category) => (
            <article key={category.title} className="service-card">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <p className="blog-soon">{blog.emptyState}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

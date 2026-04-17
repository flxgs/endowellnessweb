import { getMessages } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="space-y-10">
      <PageHero eyebrow={blog.heroEyebrow} title={blog.heroTitle} description={blog.heroDescription} />

      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {blog.categoriesEyebrow}
          </p>
          <h2 className="max-w-[20ch] text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
            {blog.categoriesTitle}
          </h2>
        </div>
        <p className="max-w-4xl text-base leading-relaxed text-muted-foreground">{blog.categoriesDescription}</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleCategories.map((category) => (
            <Card key={category.title} className="border-border/70 bg-card/85 shadow-sm">
              <CardHeader className="space-y-3">
                <CardTitle className="text-2xl leading-tight text-foreground">{category.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{category.description}</CardDescription>
                <Badge variant="secondary" className="w-fit rounded-full px-3 py-1 font-semibold">
                  {blog.emptyState}
                </Badge>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

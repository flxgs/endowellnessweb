import { getMessages } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { PageHero } from "../../components/page-hero";
import { SectionHeader } from "../../components/section-header";

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
    <div className="space-y-12">
      <PageHero eyebrow={blog.heroEyebrow} title={blog.heroTitle} description={blog.heroDescription} />

      <section className="space-y-6">
        <SectionHeader
          eyebrow={blog.categoriesEyebrow}
          title={blog.categoriesTitle}
          description={blog.categoriesDescription}
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleCategories.map((category) => (
            <Card key={category.title} className="border-border/80 bg-card shadow-none">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl leading-tight text-foreground">{category.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{category.description}</CardDescription>
                <Badge variant="secondary" className="w-fit rounded-full px-3 py-1 font-medium">
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

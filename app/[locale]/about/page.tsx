import { redirect } from "next/navigation";

type LegacyPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: LegacyPageProps) {
  const { locale } = await params;
  redirect(`/${locale}/quienes-somos`);
}

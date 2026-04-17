import { redirect } from "next/navigation";

type LegacyPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SchedulePage({ params }: LegacyPageProps) {
  const { locale } = await params;
  redirect(`/${locale}/servicios`);
}

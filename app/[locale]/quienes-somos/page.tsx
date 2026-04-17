import Image from "next/image";
import { getMessages } from "next-intl/server";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { PageHero } from "../../components/page-hero";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  imageAlt: string;
};

type TeamPageMessages = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  pendingNote: string;
  teamTitle: string;
  teamDescription: string;
  members: TeamMember[];
};

export default async function QuienesSomosPage() {
  const messages = (await getMessages()) as { TeamPage: TeamPageMessages };
  const team = messages.TeamPage;

  return (
    <div className="space-y-10">
      <PageHero
        eyebrow={team.heroEyebrow}
        title={team.heroTitle}
        description={team.heroDescription}
      />

      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">{team.teamTitle}</p>
          <h2 className="max-w-[20ch] text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
            {team.teamDescription}
          </h2>
        </div>
        <p className="max-w-4xl text-base leading-relaxed text-muted-foreground">{team.pendingNote}</p>
        <div className="grid gap-4 xl:grid-cols-2">
          {team.members.map((member) => (
            <Card key={member.name} className="overflow-hidden border-border/70 bg-card/85 py-0 shadow-sm">
              <div className="grid md:grid-cols-[220px_1fr]">
                <div className="overflow-hidden md:h-full">
                  <Image
                    src={member.image}
                    alt={member.imageAlt}
                    width={760}
                    height={760}
                    className="aspect-square h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="space-y-3 p-5">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl leading-tight text-foreground">{member.name}</CardTitle>
                    <p className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                      {member.role}
                    </p>
                  </div>
                  <CardDescription className="text-base leading-relaxed">{member.bio}</CardDescription>
                </CardHeader>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

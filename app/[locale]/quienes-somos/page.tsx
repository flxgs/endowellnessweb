import Image from "next/image";
import { getMessages } from "next-intl/server";

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
    <div className="page-stack">
      <PageHero
        eyebrow={team.heroEyebrow}
        title={team.heroTitle}
        description={team.heroDescription}
      />

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">{team.teamTitle}</p>
          <h2>{team.teamDescription}</h2>
        </div>
        <p className="page-hero-copy">{team.pendingNote}</p>
        <div className="team-grid">
          {team.members.map((member) => (
            <article key={member.name} className="team-card">
              <div className="team-image">
                <Image src={member.image} alt={member.imageAlt} width={760} height={760} />
              </div>
              <div className="team-copy">
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p>{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

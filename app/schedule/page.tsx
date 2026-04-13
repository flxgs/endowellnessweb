import { PageHero } from "../components/page-hero";
import { classSchedule } from "../site-data";

export default function SchedulePage() {
  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Weekly Schedule"
        title="A class calendar that covers intensity, mobility, rhythm, and recovery."
        description="Morning strength blocks, lunchtime resets, and evening movement sessions make it realistic to build a full routine."
      />

      <section className="schedule-grid">
        {classSchedule.map((day) => (
          <article key={day.day} className="schedule-card">
            <h2>{day.day}</h2>
            <div className="schedule-sessions">
              {day.sessions.map((session) => (
                <div key={`${day.day}-${session.time}-${session.title}`} className="session-row">
                  <div>
                    <p className="session-time">{session.time}</p>
                    <h3>{session.title}</h3>
                  </div>
                  <div className="session-meta">
                    <span>{session.coach}</span>
                    <span>{session.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

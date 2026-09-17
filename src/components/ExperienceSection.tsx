import type { Education, Experience, UserProfile } from '../types';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

interface ExperienceSectionProps {
  experiences: Experience[];
  educations: Education[];
  profile: UserProfile;
}

export function ExperienceSection({ experiences, educations, profile }: ExperienceSectionProps) {
  return (
    <section id="experience" className="section">
      <div className="shell">
        <SectionHeading
          index="04"
          label="Track record"
          title="Experience & education."
          intro="Open-source contribution, developer leadership, and the academic foundation underneath."
        />

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Experience */}
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="t-h4 text-ink">Experience</h3>
            </Reveal>

            <ol className="mt-6 border-l border-line">
              {experiences.map((exp, i) => (
                <li key={exp.id} className="relative pb-10 pl-6 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-[-3.5px] top-2 h-[7px] w-[7px] rounded-full bg-accent"
                  />

                  <Reveal delay={i * 0.06}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="t-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-3">
                        {exp.period}
                      </span>
                      <span className="t-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent">
                        {exp.type}
                      </span>
                    </div>

                    <h4 className="t-h4 mt-2 text-ink">{exp.role}</h4>
                    <p className="t-small mt-1">
                      {exp.company}
                      <span className="text-ink-3"> · {exp.location}</span>
                    </p>

                    <p className="t-small measure mt-4">{exp.description}</p>

                    {exp.highlights.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {exp.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-3">
                            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-ink-3" />
                            <span className="t-small">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <li key={tech} className="chip">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* Education + recognition */}
          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="t-h4 text-ink">Education</h3>
            </Reveal>

            <dl className="mt-6 divide-y divide-line border-t border-line">
              {educations.map((edu, i) => (
                <Reveal key={edu.id} delay={i * 0.05} className="py-5">
                  <dt className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="t-h4 text-ink">{edu.degree}</span>
                    <span className="t-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-3">
                      {edu.period}
                    </span>
                  </dt>
                  <dd className="t-small mt-1.5">
                    {edu.institution}
                    <span className="text-ink-3"> · {edu.location}</span>
                  </dd>
                  {(edu.grade || edu.details) && (
                    <dd className="t-mono mt-2 text-[0.6875rem] text-ink-3">
                      {[edu.grade, edu.details].filter(Boolean).join(' · ')}
                    </dd>
                  )}
                </Reveal>
              ))}
            </dl>

            <Reveal>
              <h3 className="t-h4 mt-12 text-ink">Recognition</h3>
            </Reveal>

            <ul className="mt-6 divide-y divide-line border-t border-line">
              {profile.stats.map((stat, i) => (
                <li key={stat.label} className="py-4">
                  <Reveal
                    delay={i * 0.05}
                    className="flex items-baseline justify-between gap-6"
                  >
                    <div>
                      <div className="t-h4 text-ink">{stat.label}</div>
                      <p className="t-small mt-1">{stat.description}</p>
                    </div>
                    <span className="font-display shrink-0 text-xl font-medium text-accent">
                      {stat.value}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

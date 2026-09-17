import type { SkillCategory } from '../types';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { shortSkillName } from '../lib/format';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export function SkillsSection({ categories }: SkillsSectionProps) {
  return (
    <section id="skills" className="section">
      <div className="shell">
        <SectionHeading
          index="03"
          label="Capabilities"
          title="The stack, without the badges."
          intro="Tools grouped by how I actually use them. Years shown are time spent building with each — not a proficiency score."
        />

        <Reveal>
          <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {categories.map((category, index) => (
              <div key={category.title} className="bg-canvas p-6 sm:p-7">
                <div className="marker">
                  <span className="marker-index">{String(index + 1).padStart(2, '0')}</span>
                  <span>{category.skills.length} technologies</span>
                </div>

                <h3 className="t-h4 mt-4 text-ink">{category.title}</h3>
                <p className="t-small mt-2 min-h-[3rem]">{category.description}</p>

                <ul className="mt-5 divide-y divide-line border-t border-line">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-baseline justify-between gap-4 py-2.5"
                    >
                      <span className="t-small flex items-baseline gap-2 text-ink">
                        {skill.isKey && (
                          <span
                            aria-hidden="true"
                            className="inline-block h-1 w-1 shrink-0 translate-y-[-2px] bg-accent"
                          />
                        )}
                        <span title={skill.name}>{shortSkillName(skill.name)}</span>
                      </span>
                      <span className="t-mono shrink-0 text-[0.6875rem] text-ink-3">
                        {skill.experienceYears}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="t-mono mt-5 flex items-center gap-2 text-[0.6875rem] text-ink-3">
            <span aria-hidden="true" className="inline-block h-1 w-1 bg-accent" />
            primary focus
          </p>
        </Reveal>
      </div>
    </section>
  );
}

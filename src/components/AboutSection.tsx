import { ArrowUpRight } from 'lucide-react';
import type { UserProfile } from '../types';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

interface AboutSectionProps {
  profile: UserProfile;
  onOpenResume: () => void;
}

const PRINCIPLES = [
  {
    title: 'Full-stack ownership',
    body: 'From the data model and API contract to the last pixel — one engineer, end to end.',
  },
  {
    title: 'Systems that reason',
    body: 'GraphRAG pipelines and knowledge graphs that ground every answer in real evidence.',
  },
  {
    title: 'Cloud & delivery',
    body: 'AWS-certified, containerized, and shipped through automated CI/CD pipelines.',
  },
  {
    title: 'Considered interfaces',
    body: 'Semantic, accessible, and fast — quality that holds up under real use.',
  },
];

export function AboutSection({ profile, onOpenResume }: AboutSectionProps) {
  const facts = [
    { key: 'now', value: 'B.Tech (CSIT) · KIET Group of Institutions' },
    { key: 'base', value: profile.location },
    { key: 'status', value: profile.availability },
  ];

  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHeading
          index="01"
          label="Profile"
          title="Engineering, with intent."
          intro="A developer profile rather than a résumé — what I work on, what I care about, and how I approach building software."
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Narrative */}
          <div className="lg:col-span-7">
            {profile.bioParagraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className={`t-body measure ${i === 0 ? '' : 'mt-5'}`}>{paragraph}</p>
              </Reveal>
            ))}

            {/* Résumé action sits with the narrative it belongs to,
                instead of being pushed to the far edge of the heading. */}
            <Reveal delay={0.18}>
              <button type="button" onClick={onOpenResume} className="btn btn-md btn-outline mt-8">
                Read full résumé
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          {/* Fact sheet */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="panel p-6 sm:p-7">
              <div className="marker">fact sheet</div>

              <dl className="mt-5 divide-y divide-line">
                {facts.map((fact) => (
                  <div key={fact.key} className="grid grid-cols-[4.5rem_1fr] gap-3 py-3.5">
                    <dt className="t-label">
                      {fact.key}
                    </dt>
                    <dd className="t-small text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 border-t border-line pt-5">
                <div className="marker mb-3">focus</div>
                <ul className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <li key={interest} className="chip">
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Principles */}
        <div className="mt-20 lg:mt-28">
          <Reveal>
            <h3 className="t-h3">How I work</h3>
          </Reveal>

          <div className="mt-6 grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 0.06} className="bg-canvas">
                <div className="h-full p-6 lg:p-7">
                  <span className="t-mono text-xs text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="t-h4 mt-3 text-ink">{principle.title}</h4>
                  <p className="t-small mt-2">{principle.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Github, Linkedin, Mail, MapPin, Printer, X } from 'lucide-react';
import type { Education, Experience, SkillCategory, UserProfile } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  experiences: Experience[];
  educations: Education[];
  skillCategories: SkillCategory[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function ResumeModal({
  isOpen,
  onClose,
  profile,
  experiences,
  educations,
  skillCategories,
}: ResumeModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-xl border border-line-strong bg-surface sm:rounded-xl"
          >
            <div className="flex items-center justify-between gap-6 border-b border-line bg-surface-2 px-6 py-4 sm:px-8">
              <span className="t-h4 text-ink">
                Curriculum Vitae
              </span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => window.print()} className="btn btn-sm btn-outline">
                  <Printer size={14} aria-hidden="true" />
                  <span className="hidden sm:inline">Print / PDF</span>
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="btn-icon h-9 w-9"
                  aria-label="Close résumé"
                >
                  <X size={17} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div id="resume-print" className="flex-1 overflow-y-auto bg-surface">
              <div className="px-6 py-8 sm:px-10 sm:py-10">
                {/* Header */}
                <header className="rule pt-6">
                  <h1 id="resume-modal-title" className="t-h2 text-ink">
                    {profile.name}
                  </h1>
                  <p className="t-lead mt-2">{profile.title}</p>
                  <ul className="t-mono mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-2">
                    <li className="flex items-center gap-2">
                      <Mail size={13} aria-hidden="true" /> {profile.email}
                    </li>
                    {profile.phone && (
                      <li className="flex items-center gap-2">{profile.phone}</li>
                    )}
                    <li className="flex items-center gap-2">
                      <MapPin size={13} aria-hidden="true" /> {profile.location}
                    </li>
                    {profile.socialLinks.github && (
                      <li className="flex items-center gap-2">
                        <Github size={13} aria-hidden="true" /> GitHub
                      </li>
                    )}
                    {profile.socialLinks.linkedin && (
                      <li className="flex items-center gap-2">
                        <Linkedin size={13} aria-hidden="true" /> LinkedIn
                      </li>
                    )}
                  </ul>
                </header>

                {/* Summary */}
                <Section title="Summary">
                  <p className="t-small">{profile.bioParagraphs[0]}</p>
                </Section>

                {/* Skills */}
                <Section title="Technical expertise">
                  <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {skillCategories.map((category) => (
                      <div key={category.title}>
                        <dt className="t-h4 text-ink">{category.title}</dt>
                        <dd className="t-small mt-1">
                          {category.skills.map((skill) => skill.name).join(', ')}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Section>

                {/* Experience */}
                <Section title="Experience">
                  <div className="space-y-6">
                    {experiences.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h4 className="t-h4 text-ink">
                            {exp.role}
                            <span className="font-normal text-ink-3"> · {exp.company}</span>
                          </h4>
                          <span className="t-meta-label">
                            {exp.period}
                          </span>
                        </div>
                        <p className="t-small mt-2">{exp.description}</p>
                        {exp.highlights.length > 0 && (
                          <ul className="mt-2 space-y-1.5">
                            {exp.highlights.map((highlight) => (
                              <li key={highlight} className="flex gap-3">
                                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-accent" />
                                <span className="t-small">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </Section>

                {/* Education */}
                <Section title="Education">
                  <div className="space-y-5">
                    {educations.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h4 className="t-h4 text-ink">{edu.degree}</h4>
                          <span className="t-meta-label">
                            {edu.period}
                          </span>
                        </div>
                        <p className="t-small mt-1">
                          {edu.institution}
                          {edu.grade ? ` · ${edu.grade}` : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                </Section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-9">
      <h3 className="t-label border-b border-line pb-2">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

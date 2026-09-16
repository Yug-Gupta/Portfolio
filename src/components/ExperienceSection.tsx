import React from 'react';
import { 
  MapPin, 
  CheckCircle2, 
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';
import { Experience, Education } from '../types';

interface ExperienceSectionProps {
  experiences: Experience[];
  educations: Education[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences, educations }) => {
  return (
    <section 
      id="experience" 
      className="py-16 md:py-24 border-t border-line relative overflow-hidden text-left"
    >
      <div className="container-page">
        
        {/* Section Editorial Header */}
        <div className="section-rule">
          <div className="flex items-center gap-3">
            <span className="type-eyebrow font-medium">
              [ 05 / Leadership & Open Source ]
            </span>
            <span className="type-meta hidden sm:inline">
              Community & contributions
            </span>
          </div>
          <span className="type-meta">
            2024 – Present
          </span>
        </div>

        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12 space-y-2"
        >
          <h2 className="type-section">
            Leadership & Open Source
          </h2>
          <p className="type-body-sm">
            Open-source contributions, community leadership, and hands-on workshop delivery.
          </p>
        </motion.div>

        {/* Timeline List */}
        <div className="relative border-l border-line ml-3 md:ml-6 pl-6 md:pl-8 space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={exp.id} 
              id={`experience-item-${exp.id}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative"
            >
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] md:-left-[39px] top-4 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-canvas" aria-hidden="true" />

              {/* Experience Card */}
              <div className="card card-hover p-6 sm:p-7 space-y-4">
                
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-xl text-ink font-normal tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm font-sans text-ink-soft">
                      <span className="text-accent-strong font-medium">{exp.company}</span>
                      <span className="text-faint" aria-hidden="true">•</span>
                      <span className="flex items-center gap-1 text-faint font-mono text-xs">
                        <MapPin className="w-3 h-3 text-accent" aria-hidden="true" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip px-2 py-0.5">
                      {exp.period}
                    </span>
                    <span className="chip-accent px-2 py-0.5">
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="type-body-sm">
                  {exp.description}
                </p>

                {/* Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <h4 className="type-label font-medium">
                      Highlights
                    </h4>
                    <div className="space-y-1.5">
                      {exp.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-sm text-body font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-1" aria-hidden="true" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-3 border-t border-line flex flex-wrap items-center gap-1.5">
                    <span className="type-meta mr-1">Stack</span>
                    {exp.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="chip px-2 py-0.5">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Background — single consolidated academic section */}
        {educations && educations.length > 0 && (
          <div id="education" className="mt-16">
            <div className="inline-flex items-center gap-2 type-label text-accent font-medium mb-6">
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              <span>Education</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
              {educations.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="card card-hover p-5 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-serif text-base text-ink font-normal">
                        {edu.degree}
                      </h4>
                      <p className="text-xs font-sans text-accent-strong font-medium mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                    <span className="chip px-2 py-0.5 shrink-0">
                      {edu.period}
                    </span>
                  </div>

                  {edu.grade && (
                    <p className="text-sm font-sans font-medium text-ink-soft">
                      {edu.grade}
                    </p>
                  )}

                  <p className="type-meta">
                    {edu.location}
                  </p>

                  {edu.description && (
                    <p className="type-body-sm">
                      {edu.description}
                    </p>
                  )}

                  {edu.details && (
                    <p className="type-body-sm text-muted">
                      {edu.details}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

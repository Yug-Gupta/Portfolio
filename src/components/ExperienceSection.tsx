import React, { useEffect, useRef } from 'react';
import {
  Briefcase, MapPin, Calendar, ExternalLink, Check, GraduationCap, Award,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Experience, Education } from '../types';
import { SectionHeader } from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceSectionProps {
  experiences: Experience[];
  educations: Education[];
}

const TYPE_STYLES: Record<string, string> = {
  'Full-time': 'chip-accent',
  'Contract': 'chip',
  'Open Source': 'chip-accent',
  'Internship': 'chip',
  'Leadership': 'chip-accent',
};

export function ExperienceSection({ experiences, educations }: ExperienceSectionProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Timeline cards
      gsap.from('.timeline-card', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Education cards
      if (eduRef.current) {
        gsap.from('.edu-card', {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: eduRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section-spacing relative overflow-hidden">
      <div className="container-wide relative z-10">
        <SectionHeader
          number="05"
          label="Leadership & Open Source"
          title="Experience"
          subtitle="A timeline of my professional journey, open-source contributions, and leadership roles."
        />

        {/* Timeline */}
        <div ref={timelineRef} className="relative ml-3 md:ml-6 pl-7 md:pl-9 space-y-6">
          {/* Timeline line with glow */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, var(--color-accent), var(--color-line), transparent)',
            }}
          />

          {experiences.map((exp, idx) => (
            <div key={idx} className="timeline-card relative">
              {/* Timeline dot */}
              <div className="absolute -left-[31px] md:-left-[39px] top-5 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_8px_rgba(212,145,90,0.4)]" />
              </div>

              <div className="glass-card p-5 sm:p-6 space-y-3">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="space-y-1">
                    <h3 className="type-title text-ink">{exp.role}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      {exp.companyUrl ? (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="type-body-sm text-accent hover:text-accent-hover transition-colors duration-200 inline-flex items-center gap-1"
                        >
                          {exp.company}
                          <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span className="type-body-sm text-accent">{exp.company}</span>
                      )}
                      <span className="type-meta flex items-center gap-1">
                        <MapPin size={11} /> {exp.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={TYPE_STYLES[exp.type] || 'chip'}>{exp.type}</span>
                    <span className="chip">
                      <Calendar size={11} /> {exp.period}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="type-body-sm">{exp.description}</p>

                {/* Highlights */}
                {exp.highlights.length > 0 && (
                  <ul className="space-y-1.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 type-body-sm">
                        <Check size={13} className="text-accent mt-0.5 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Stack */}
                {exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="chip text-[10px]">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div ref={eduRef} className="mt-16 md:mt-20">
          <div className="section-rule">
            <span className="type-eyebrow flex items-center gap-2">
              <GraduationCap size={14} className="text-accent" />
              Education & Credentials
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {educations.map((edu, idx) => (
              <div key={idx} className="edu-card glass-card p-5 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <GraduationCap size={16} className="text-accent" />
                  </div>
                  {edu.grade && (
                    <span className="chip-accent text-[10px]">
                      <Award size={10} /> {edu.grade}
                    </span>
                  )}
                </div>
                <h4 className="type-label text-ink">{edu.degree}</h4>
                <p className="type-body-sm">{edu.institution}</p>
                <div className="flex items-center gap-2 type-meta">
                  <MapPin size={11} /> {edu.location}
                  <span>·</span>
                  <Calendar size={11} /> {edu.period}
                </div>
                {edu.details && <p className="type-meta pt-1">{edu.details}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

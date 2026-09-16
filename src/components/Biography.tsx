import React, { useEffect, useRef } from 'react';
import { FileText, Zap, Brain, Cloud, Accessibility, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserProfile } from '../types';
import { SectionHeader } from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface BiographyProps {
  profile: UserProfile;
  onOpenResume: () => void;
}

const TENETS = [
  {
    icon: <Zap size={18} />,
    title: 'Full-Stack Product Engineering',
    desc: 'End-to-end ownership from UI to infrastructure, shipping features that matter.',
  },
  {
    icon: <Brain size={18} />,
    title: 'AI/LLM & Knowledge Graphs',
    desc: 'Building intelligent systems with GraphRAG, embeddings, and reasoning pipelines.',
  },
  {
    icon: <Cloud size={18} />,
    title: 'Cloud/DevOps & Delivery',
    desc: 'AWS-certified. CI/CD, containers, and infrastructure as code for reliable delivery.',
  },
  {
    icon: <Accessibility size={18} />,
    title: 'Considered Accessible Interfaces',
    desc: 'Semantic HTML, keyboard navigation, and inclusive design as default, not afterthought.',
  },
];

export function Biography({ profile, onOpenResume }: BiographyProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.bio-content', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.tenet-card', {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.tenets-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-spacing border-t border-line relative overflow-hidden"
    >
      {/* Ambient shape */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[120px]" />
      </div>

      <div className="container-wide relative z-10">
        <SectionHeader
          number="02"
          label="Philosophy & Background"
          title="About Me"
          subtitle="Building thoughtful software that solves real problems — with craft, clarity, and care."
          badge="Est. 2024"
        />

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left: Narrative */}
          <div className="lg:col-span-7 space-y-4">
            {profile.bioParagraphs.map((para, idx) => (
              <p key={idx} className="bio-content type-body leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Right: Focus Card */}
          <div className="lg:col-span-5">
            <div className="bio-content glass-card p-5 sm:p-6 space-y-4">
              <h3 className="type-label flex items-center gap-2">
                <Sparkles size={14} className="text-accent" />
                Areas of Focus
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {profile.interests.map((interest) => (
                  <span key={interest} className="chip-accent">{interest}</span>
                ))}
              </div>
              <div className="pt-3 border-t border-line flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="type-body-sm">{profile.availability}</span>
                </div>
                <span className="type-meta">{profile.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering Tenets */}
        <div className="mt-14 md:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="type-subsection">Engineering Tenets</h3>
            <button onClick={onOpenResume} className="btn-sm btn-outline cursor-pointer">
              <FileText size={14} /> Full Resume
            </button>
          </div>

          <div className="tenets-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TENETS.map((tenet, idx) => (
              <div key={idx} className="tenet-card glass-card p-4 space-y-2.5 group">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent transition-all duration-300 group-hover:bg-accent/20 group-hover:shadow-[0_0_12px_rgba(212,145,90,0.15)]">
                  {tenet.icon}
                </div>
                <h4 className="type-label text-ink text-sm leading-tight">{tenet.title}</h4>
                <p className="type-meta leading-relaxed">{tenet.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { UserProfile, Project } from '../types';
import { HolographicCore } from './HolographicCore';
import { ArchitectureInspector } from './ArchitectureInspector';

interface HeroProps {
  profile: UserProfile;
  projects?: Project[];
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export function Hero({ profile, projects = [], onOpenResume, onOpenContact }: HeroProps) {
  const [heroMode, setHeroMode] = useState<'kinetic' | 'cli'>('kinetic');
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP entrance sequence
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .fromTo('.hero-headline', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 0.4)
        .fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.7)
        .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.9)
        .fromTo('.hero-stage', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1 }, 0.5)
        .fromTo('.hero-stats > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 1.1);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden text-left"
    >
      {/* Background ambient shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-surface-2/50 blur-[80px]" />
      </div>

      <div className="container-wide relative z-10">
        {/* Editorial Section Rule */}
        <div className="section-rule hero-eyebrow" style={{ opacity: 0 }}>
          <span className="type-eyebrow">[ 01 / Profile ]</span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="type-meta">{profile.availability}</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Location + Title Badge */}
            <div className="hero-eyebrow flex items-center gap-3" style={{ opacity: 0 }}>
              <span className="chip">
                <MapPin size={12} className="text-accent" />
                {profile.location}
              </span>
              <span className="chip-accent">
                <Sparkles size={12} />
                {profile.title.split('&')[0].trim()}
              </span>
            </div>

            {/* Headline */}
            <h1 ref={headlineRef} className="type-display hero-headline" style={{ opacity: 0 }}>
              <span className="block text-ink">Building</span>
              <span className="block text-gradient-accent">Intelligent</span>
              <span className="block text-ink">Systems</span>
            </h1>

            {/* Subtitle */}
            <p className="type-body text-lg max-w-xl hero-subtitle" style={{ opacity: 0 }}>
              {profile.tagline}
            </p>

            {/* CTAs */}
            <div className="hero-cta flex flex-wrap items-center gap-3 pt-2" style={{ opacity: 0 }}>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-md btn-primary group"
              >
                Explore Projects
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button onClick={onOpenResume} className="btn-md btn-secondary cursor-pointer">
                View Resume
              </button>
              <button onClick={onOpenContact} className="btn-md btn-ghost cursor-pointer">
                Get in Touch
              </button>
            </div>
          </div>

          {/* Right: Interactive Hero Stage */}
          <div className="lg:col-span-5 hero-stage" style={{ opacity: 0 }}>
            <div className="relative">
              {/* Mode Toggle */}
              <div className="flex justify-center mb-4">
                <div className="segmented">
                  <button
                    onClick={() => setHeroMode('kinetic')}
                    className={`segmented-item cursor-pointer ${heroMode === 'kinetic' ? 'segmented-item-active' : ''}`}
                  >
                    Kinetic 3D
                  </button>
                  <button
                    onClick={() => setHeroMode('cli')}
                    className={`segmented-item cursor-pointer ${heroMode === 'cli' ? 'segmented-item-active' : ''}`}
                  >
                    CLI & Topology
                  </button>
                </div>
              </div>

              {/* Stage Content */}
              <div className="flex items-center justify-center min-h-[320px] sm:min-h-[360px]">
                {heroMode === 'kinetic' ? (
                  <HolographicCore interactive />
                ) : (
                  <ArchitectureInspector
                    profile={profile}
                    projects={projects}
                    onOpenContact={onOpenContact}
                    onOpenResume={onOpenResume}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="hero-stats mt-12 sm:mt-16 pt-8 border-t border-line grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {profile.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-serif text-2xl sm:text-3xl font-medium text-ink tracking-tight">
                {stat.value}
              </div>
              <div className="type-label text-ink-2">{stat.label}</div>
              <div className="type-meta">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

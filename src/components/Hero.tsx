import React, { useState } from 'react';
import { 
  Mail, 
  ArrowRight, 
  FileText, 
  MapPin,
  Terminal,
  RotateCcw
} from 'lucide-react';
import { motion } from 'motion/react';
import { UserProfile, Project } from '../types';
import { HolographicCore } from './HolographicCore';
import { ArchitectureInspector } from './ArchitectureInspector';

interface HeroProps {
  profile: UserProfile;
  projects?: Project[];
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  profile, 
  projects = [],
  onOpenResume, 
  onOpenContact 
}) => {
  const [heroView, setHeroView] = useState<'sculpture' | 'architecture'>('sculpture');

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden text-left"
    >
      <div className="container-page w-full">
        
        {/* Editorial Index Header */}
        <div className="section-rule">
          <div className="flex items-center gap-3">
            <span className="type-eyebrow font-medium">
              [ 01 / Profile ]
            </span>
            <span className="type-meta hidden sm:inline">
              Full-stack • AI/LLM • 2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span className="type-meta text-muted font-medium">
              {profile.availability}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Main Hero Copy (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Engineer Identity & Title */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-md bg-[#EBE6DC] border border-[#DDD6CA] type-label">
              <MapPin className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span>{profile.location}</span>
              <span className="text-[#B5ACA0]" aria-hidden="true">•</span>
              <span className="text-accent font-medium">{profile.title}</span>
            </div>

            {/* Bold, Confident Display Typography */}
            <div className="space-y-3">
              <h1 className="type-display">
                Building full-stack products with <span className="italic text-accent">applied AI</span> and deliberate craft.
              </h1>
              <p className="type-body max-w-xl">
                {profile.tagline}
              </p>
            </div>

            {/* Primary Action Suite: primary → secondary → outline */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                id="hero-view-projects-btn"
                className="btn btn-md btn-primary"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                onClick={onOpenResume}
                id="hero-resume-btn"
                className="btn btn-md btn-secondary"
              >
                <FileText className="w-4 h-4 text-accent" aria-hidden="true" />
                <span>View Resume</span>
              </button>

              <button
                onClick={onOpenContact}
                id="hero-contact-btn"
                className="btn btn-md btn-outline"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Contact Me</span>
              </button>
            </div>
          </motion.div>

          {/* Interactive Hero Stage (5 cols) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center gap-4"
          >
            {/* Stage Selector Toggle */}
            <div className="segmented" role="group" aria-label="Hero visual mode">
              <button
                type="button"
                onClick={() => setHeroView('sculpture')}
                aria-pressed={heroView === 'sculpture'}
                className="segmented-item"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Kinetic 3D</span>
              </button>

              <button
                type="button"
                onClick={() => setHeroView('architecture')}
                aria-pressed={heroView === 'architecture'}
                className="segmented-item"
              >
                <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>CLI &amp; Topology</span>
              </button>
            </div>

            {/* Stage Display */}
            {heroView === 'sculpture' ? (
              <div className="relative flex flex-col items-center">
                <HolographicCore size={340} interactive={true} />
                <div className="type-meta mt-1 text-center">
                  Interactive 3D — drag to rotate
                </div>
              </div>
            ) : (
              <div className="w-full">
                <ArchitectureInspector 
                  profile={profile}
                  projects={projects}
                  onOpenContact={onOpenContact}
                  onOpenResume={onOpenResume}
                />
              </div>
            )}

          </motion.div>

        </div>

        {/* Telemetry Metrics Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-14 pt-8 border-t border-line grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
        >
          {profile.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-serif text-3xl font-normal text-ink tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-sans font-medium text-ink-soft">
                {stat.label}
              </div>
              <div className="type-meta">
                {stat.description}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ArrowRight, 
  FileText, 
  MapPin,
  Terminal,
  RotateCcw,
  Layers,
  Activity
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Editorial Index Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E5DFD6]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#C88A58] tracking-wider uppercase font-medium">
              [ 01 / PROFILE ]
            </span>
            <span className="text-xs font-mono text-[#80776C] hidden sm:inline">
              FULL-STACK • AI/LLM • 2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C88A58] animate-pulse" />
            <span className="text-xs font-mono text-[#5C564D] font-medium">
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
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EBE6DC] border border-[#DDD6CA] text-xs font-mono text-[#4A453E]">
                <MapPin className="w-3.5 h-3.5 text-[#C88A58]" />
                <span>{profile.location}</span>
                <span className="text-[#B5ACA0]">•</span>
                <span className="text-[#C88A58] font-medium">{profile.title}</span>
              </div>
            </div>

            {/* Bold, Confident Display Typography */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#161514] font-normal tracking-tight leading-[1.06]">
                Building full-stack products with <span className="italic text-[#C88A58]">applied AI</span> and deliberate craft.
              </h1>
              <p className="text-base sm:text-lg text-[#4A453E] font-sans font-normal leading-relaxed max-w-xl">
                {profile.tagline}
              </p>
            </div>

            {/* Primary Action Suite */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                id="hero-view-projects-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#161514] hover:bg-[#2C2925] text-[#FAF8F5] font-sans font-medium text-sm transition-all duration-200 cursor-pointer shadow-xs hover:shadow"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                id="hero-resume-btn"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#EBE6DC] hover:bg-[#E2DBD0] text-[#161514] font-sans text-sm border border-[#DDD6CA] hover:border-[#C8BFB2] transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <FileText className="w-4 h-4 text-[#C88A58]" />
                <span>Curriculum Vitae</span>
              </button>

              <button
                onClick={onOpenContact}
                id="hero-contact-btn"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-[#5C564D] hover:text-[#161514] font-sans text-sm hover:bg-[#EBE6DC] border border-transparent hover:border-[#DDD6CA] transition-colors cursor-pointer"
              >
                <span>Direct Dispatch</span>
              </button>
            </div>

            {/* Social Index Links */}
            <div className="pt-4 border-t border-[#E5DFD6] flex flex-wrap items-center gap-4 text-xs font-mono">
              <span className="text-[#80776C]">Network:</span>

              {profile.socialLinks.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-social-github"
                  aria-label="GitHub Profile"
                  className="inline-flex items-center gap-1.5 text-[#5C564D] hover:text-[#161514] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}

              {profile.socialLinks.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-social-linkedin"
                  aria-label="LinkedIn Profile"
                  className="inline-flex items-center gap-1.5 text-[#5C564D] hover:text-[#161514] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}

              {profile.socialLinks.twitter && (
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-social-twitter"
                  aria-label="Twitter / X Profile"
                  className="inline-flex items-center gap-1.5 text-[#5C564D] hover:text-[#161514] transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span>Twitter/X</span>
                </a>
              )}

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  id="hero-social-email"
                  aria-label="Direct Email"
                  className="inline-flex items-center gap-1.5 text-[#5C564D] hover:text-[#161514] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Interactive Hero Stage (5 cols) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center space-y-4"
          >
            {/* Stage Selector Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[#ECE7DF] border border-[#DFD8CC]">
              <button
                onClick={() => setHeroView('sculpture')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                  heroView === 'sculpture'
                    ? 'bg-[#FFFFFF] text-[#161514] font-medium shadow-xs'
                    : 'text-[#6E675E] hover:text-[#161514]'
                }`}
              >
                <RotateCcw className="w-3 h-3 text-[#C88A58]" />
                <span>Kinetic 3D</span>
              </button>

              <button
                onClick={() => setHeroView('architecture')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                  heroView === 'architecture'
                    ? 'bg-[#FFFFFF] text-[#161514] font-medium shadow-xs'
                    : 'text-[#6E675E] hover:text-[#161514]'
                }`}
              >
                <Terminal className="w-3 h-3 text-[#C88A58]" />
                <span>CLI & Topology</span>
              </button>
            </div>

            {/* Stage Display */}
            {heroView === 'sculpture' ? (
              <div className="relative flex flex-col items-center">
                <HolographicCore size={340} interactive={true} />
                <div className="text-[11px] font-mono text-[#80776C] mt-1 text-center">
                  Parametric stoneware toroid • Drag to tilt in 3D
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

        {/* Quantifiable Telemetry Metrics Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 sm:mt-18 pt-8 border-t border-[#E5DFD6] grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
        >
          {profile.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-[#161514] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-sans font-medium text-[#2E2A25]">
                {stat.label}
              </div>
              <div className="text-xs text-[#6E675E] font-sans">
                {stat.description}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, Star, Code, Database, Cloud, Brain, Cpu, Globe } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillCategory } from '../types';
import { SectionHeader } from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface SkillsSectionProps {
  categories: SkillCategory[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Programming Languages': <Code size={16} />,
  'Web Development': <Globe size={16} />,
  'Backend & Databases': <Database size={16} />,
  'AI/LLM & Data': <Brain size={16} />,
  'Cloud & DevOps': <Cloud size={16} />,
  'CS Fundamentals': <Cpu size={16} />,
};

export function SkillsSection({ categories }: SkillsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const skillsGridRef = useRef<HTMLDivElement>(null);

  const isSearching = searchQuery.trim().length > 0;

  const allSkills = useMemo(() => {
    return categories.flatMap((cat) =>
      cat.skills.map((skill) => ({ ...skill, categoryName: cat.title }))
    );
  }, [categories]);

  const displayedSkills = useMemo(() => {
    if (isSearching) {
      const q = searchQuery.toLowerCase();
      return allSkills.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.categoryName.toLowerCase().includes(q)
      );
    }
    return categories[activeIndex]?.skills || [];
  }, [categories, activeIndex, searchQuery, isSearching, allSkills]);

  const totalSkills = allSkills.length;
  const coreSkills = allSkills.filter((s) => s.isKey).length;

  // Animate skill bars on scroll
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !skillsGridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.skill-card-item', {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.04,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: skillsGridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, skillsGridRef);

    return () => ctx.revert();
  }, [activeIndex, searchQuery]);

  return (
    <section id="skills" className="section-spacing relative overflow-hidden">
      <div className="container-wide relative z-10">
        <SectionHeader
          number="04"
          label="Capabilities & Specializations"
          title="Technical Skills"
          subtitle="Technologies and tools I work with daily, organized by domain expertise."
          badge={`${totalSkills} skills · ${coreSkills} core`}
        />

        {/* Search */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills..."
              className="input-sm pl-8 pr-8 w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink cursor-pointer"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        {!isSearching && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
            {categories.map((cat, idx) => (
              <button
                key={cat.title}
                onClick={() => setActiveIndex(idx)}
                className={`glass-card-static p-3 text-left cursor-pointer transition-all duration-300 group ${
                  activeIndex === idx
                    ? 'border-accent/30 bg-accent/[0.06]'
                    : 'hover:border-line-strong hover:bg-glass-hover'
                }`}
              >
                <div className={`mb-2 ${activeIndex === idx ? 'text-accent' : 'text-ink-3 group-hover:text-ink-2'} transition-colors duration-200`}>
                  {CATEGORY_ICONS[cat.title] || <Code size={16} />}
                </div>
                <div className={`text-xs font-medium leading-tight ${activeIndex === idx ? 'text-ink' : 'text-ink-2'}`}>
                  {cat.title}
                </div>
                <div className="type-meta mt-1">{cat.skills.length} skills</div>
              </button>
            ))}
          </div>
        )}

        {/* Active Category Info */}
        {!isSearching && categories[activeIndex] && (
          <div className="panel p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-accent">{CATEGORY_ICONS[categories[activeIndex].title]}</span>
              <span className="type-label">{categories[activeIndex].title}</span>
              {categories[activeIndex].description && (
                <span className="type-body-sm hidden sm:inline">— {categories[activeIndex].description}</span>
              )}
            </div>
            <span className="type-meta">
              {displayedSkills.length} of {categories[activeIndex].skills.length}
            </span>
          </div>
        )}

        {/* Search Results Info */}
        {isSearching && (
          <div className="panel p-4 mb-6">
            <span className="type-body-sm">
              {displayedSkills.length > 0
                ? `Found ${displayedSkills.length} skill${displayedSkills.length !== 1 ? 's' : ''} matching "${searchQuery}"`
                : `No skills found matching "${searchQuery}"`
              }
            </span>
          </div>
        )}

        {/* Skills Grid */}
        <div
          ref={skillsGridRef}
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            displayedSkills.length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
          } gap-3`}
        >
          {displayedSkills.map((skill, idx) => (
            <div
              key={`${skill.name}-${idx}`}
              className="skill-card-item glass-card-static p-4 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="type-label">{skill.name}</span>
                  {skill.isKey && (
                    <Star size={12} className="text-accent fill-accent" />
                  )}
                </div>
                <span className="type-meta">{skill.experienceYears}y exp</span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                  role="progressbar"
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill.name} proficiency: ${skill.level}%`}
                >
                  <div
                    className="h-full rounded-full transition-[width] duration-700 ease-out"
                    style={{
                      width: `${skill.level}%`,
                      background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-hover))',
                    }}
                  />
                </div>
                <div className="type-meta text-right">{skill.level}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

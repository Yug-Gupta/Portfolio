import React, { useState } from 'react';
import { 
  Code, 
  Monitor, 
  Server, 
  BrainCircuit,
  Cloud, 
  Cpu,
  Search,
  type LucideIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { SkillCategory } from '../types';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

const categoryIcons: Record<string, LucideIcon> = {
  'Programming Languages': Code,
  'Web Development': Monitor,
  'Backend & Databases': Server,
  'AI/LLM & Data': BrainCircuit,
  'Cloud & DevOps': Cloud,
  'CS Fundamentals': Cpu,
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [skillSearch, setSkillSearch] = useState('');

  const allSkills = categories.flatMap(cat => cat.skills);
  const totalSkills = allSkills.length;
  const keySkills = allSkills.filter(s => s.isKey).length;

  const currentCategory = categories[activeTab] || categories[0];

  const displayedSkills = skillSearch.trim()
    ? allSkills.filter(s => s.name.toLowerCase().includes(skillSearch.toLowerCase().trim()))
    : currentCategory.skills;

  return (
    <section 
      id="skills" 
      className="py-20 md:py-28 border-t border-line relative overflow-hidden text-left"
    >
      <div className="container-page">
        
        {/* Section Editorial Header */}
        <div className="section-rule">
          <div className="flex items-center gap-3">
            <span className="type-eyebrow font-medium">
              [ 04 / Capabilities & Specializations ]
            </span>
            <span className="type-meta hidden sm:inline">
              Stack & proficiency
            </span>
          </div>
          <span className="type-meta">
            {totalSkills} skills · {keySkills} core
          </span>
        </div>

        {/* Section Title & Search */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6"
        >
          <div className="max-w-2xl space-y-2">
            <h2 className="type-section">
              Technical Stack & Competencies
            </h2>
            <p className="type-body-sm">
              Languages, frameworks, AI/LLM tooling, and cloud services applied across real projects.
            </p>
          </div>

          {/* Quick Skill Search */}
          <div className="relative w-full md:w-64">
            <label htmlFor="skill-search-input" className="sr-only">
              Search skills
            </label>
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none" aria-hidden="true" />
            <input
              type="text"
              id="skill-search-input"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="Search skills..."
              className="input input-sm h-9 pl-9 pr-16"
            />
            {skillSearch && (
              <button
                type="button"
                onClick={() => setSkillSearch('')}
                aria-label="Clear skill search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-sans text-muted hover:text-ink cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Selector — compact 3 × 2 grid, clear active state */}
        {!skillSearch && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6" role="group" aria-label="Skill categories">
            {categories.map((cat, idx) => {
              const IconComp = categoryIcons[cat.title] || Code;
              const isSelected = activeTab === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  id={`skill-tab-${idx}`}
                  aria-pressed={isSelected}
                  className={`flex items-center gap-3 p-4 rounded-lg text-left border transition-colors duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-surface border-accent shadow-xs'
                      : 'bg-surface border-line hover:border-line-strong'
                  }`}
                >
                  <span className={`p-2 rounded-lg border shrink-0 ${isSelected ? 'bg-accent/10 border-accent/30 text-accent' : 'bg-surface border-line text-muted'}`}>
                    <IconComp className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-sm font-semibold tracking-normal ${isSelected ? 'text-ink' : 'text-body'}`}>
                      {cat.title}
                    </span>
                    <span className="type-meta">
                      {cat.skills.length} skills
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Active Category Header — names the category so context is immediate */}
        {!skillSearch && (
          <div className="panel p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-sans text-sm font-semibold text-ink">
                {currentCategory.title}
              </h3>
              <p className="type-body-sm">
                {currentCategory.description}
              </p>
            </div>
            <span className="type-meta shrink-0" aria-live="polite">
              Category {activeTab + 1} of {categories.length}
            </span>
          </div>
        )}

        {/* Skills Grid — column count adapts so the last row is never a lone orphan */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${displayedSkills.length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-3`}>
          {displayedSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (idx % 6) * 0.04 }}
              className="card card-hover p-5"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-sans font-medium text-ink">
                    {skill.name}
                  </span>
                  {skill.isKey && (
                    <span className="chip-accent px-2 py-0.5">
                      Core
                    </span>
                  )}
                </div>
                <span className="type-meta shrink-0">
                  {skill.experienceYears}
                </span>
              </div>

              {/* Progress bar (self-assessed) */}
              <div className="space-y-2">
                <div
                  role="progressbar"
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill.name}: self-assessed proficiency ${skill.level}%`}
                  className="w-full h-2 rounded-full bg-chip overflow-hidden"
                >
                  <div 
                    className="h-full rounded-full bg-accent transition-[width] duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="flex items-center justify-between type-meta">
                  <span>Self-assessed</span>
                  <span className="text-ink-soft font-medium">{skill.level}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

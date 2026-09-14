import React, { useState } from 'react';
import { 
  Code, 
  Layout, 
  Server, 
  Cloud, 
  Search,
  Cpu
} from 'lucide-react';
import { motion } from 'motion/react';
import { SkillCategory } from '../types';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [skillSearch, setSkillSearch] = useState('');

  const categoryIcons = [Code, Layout, Server, Cloud];

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
      className="py-20 md:py-28 border-t border-[#E5DFD6] relative overflow-hidden text-left"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Editorial Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E5DFD6]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#C88A58] tracking-wider uppercase font-medium">
              [ 04 / CAPABILITIES & SPECIALIZATIONS ]
            </span>
            <span className="text-xs font-mono text-[#80776C] hidden sm:inline">
              STACK & PROFICIENCY
            </span>
          </div>
          <span className="text-xs font-mono text-[#80776C]">
            {totalSkills} VERIFIED SKILLS
          </span>
        </div>

        {/* Section Title & Search */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div className="max-w-xl space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#161514] tracking-tight">
              Technical Stack & Competencies
            </h2>
            <p className="text-sm text-[#5C564D] font-sans">
              Languages, frameworks, AI/LLM tooling, and cloud services applied across real projects.
            </p>
          </div>

          {/* Quick Skill Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#80776C]" />
            <input
              type="text"
              id="skill-search-input"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="Search competencies..."
              className="w-full pl-9 pr-4 py-2 rounded-lg text-xs font-sans bg-[#FFFFFF] border border-[#E5DFD6] text-[#161514] placeholder-[#80776C] focus:outline-hidden focus:border-[#C88A58] transition-colors shadow-2xs"
            />
            {skillSearch && (
              <button
                onClick={() => setSkillSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-sans text-[#6E675E] hover:text-[#161514] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Selector Tabs */}
        {!skillSearch && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {categories.map((cat, idx) => {
              const IconComp = categoryIcons[idx % categoryIcons.length] || Code;
              const isSelected = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  id={`skill-tab-${idx}`}
                  className={`p-4 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFFFFF] border-[#C8BFB2] text-[#161514] shadow-xs'
                      : 'bg-[#FAF7F2] border-[#E5DFD6] text-[#5C564D] hover:border-[#C8BFB2] hover:text-[#161514]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className={`p-2 rounded-lg border border-[#E5DFD6] ${isSelected ? 'bg-[#FAF7F2] text-[#C88A58]' : 'bg-[#FFFFFF] text-[#6E675E]'}`}>
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-mono text-[#80776C]">
                      {cat.skills.length} skills
                    </span>
                  </div>
                  <div>
                    <h3 className={`text-xs font-mono uppercase tracking-wider ${isSelected ? 'text-[#161514] font-semibold' : 'text-[#5C564D]'}`}>
                      {cat.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Active Category Description Header */}
        {!skillSearch && (
          <div className="mb-6 p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DFD6] flex items-center justify-between shadow-2xs">
            <p className="text-xs text-[#5C564D] font-sans">
              {currentCategory.description}
            </p>
            <span className="text-xs text-[#C88A58] font-mono font-medium shrink-0 ml-4">
              {activeTab + 1} / {categories.length}
            </span>
          </div>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayedSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (idx % 6) * 0.04 }}
              className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5DFD6] hover:border-[#C8BFB2] transition-all duration-200 shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-sans font-medium text-[#161514]">
                    {skill.name}
                  </span>
                  {skill.isKey && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-[#B86B35] bg-[#FAF7F2] border border-[#E5DFD6] font-semibold">
                      Core
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono text-[#80776C] shrink-0">
                  {skill.experienceYears}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 mt-2">
                <div className="w-full h-1.5 rounded-full bg-[#ECE7DF] overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-[#C88A58] transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#80776C] font-mono">
                  <span>Proficiency</span>
                  <span className="text-[#2E2A25] font-medium">{skill.level}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-8 p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DFD6] flex flex-wrap items-center justify-between gap-4 text-xs shadow-2xs">
          <span className="text-[#5C564D] font-sans">
            Building across the full stack — from REST APIs and databases to cloud deployments and applied AI systems.
          </span>
          <div className="flex items-center gap-3 font-mono text-xs text-[#5C564D]">
            <span>{totalSkills} Tracked Competencies</span>
            <span className="text-[#80776C]">•</span>
            <span className="text-[#C88A58] font-medium">{keySkills} Core Specializations</span>
          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { 
  User, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  GraduationCap, 
  HeartHandshake, 
  ArrowRight,
  FileText,
  Compass
} from 'lucide-react';
import { motion } from 'motion/react';
import { UserProfile, Education } from '../types';

interface BiographyProps {
  profile: UserProfile;
  educations: Education[];
  onOpenResume: () => void;
}

export const Biography: React.FC<BiographyProps> = ({ profile, educations, onOpenResume }) => {
  const corePillars = [
    {
      icon: Cpu,
      title: 'Full-Stack Product Engineering',
      tag: 'WEB & APIS',
      description: 'Building complete products end to end — React front-ends, Node.js & Express REST APIs, and JWT-secured authentication flows.'
    },
    {
      icon: Layers,
      title: 'AI/LLM & Knowledge Graphs',
      tag: 'APPLIED AI',
      description: 'Integrating the Google Gemini API with GraphRAG retrieval over Neo4j to deliver grounded, citation-verified answers.'
    },
    {
      icon: ShieldCheck,
      title: 'Cloud, DevOps & Delivery',
      tag: 'RELIABILITY',
      description: 'Shipping to production with AWS, Docker & Docker Compose, Linux, and GitHub Actions CI pipelines that lint and test automatically.'
    },
    {
      icon: HeartHandshake,
      title: 'Considered, Accessible Interfaces',
      tag: 'ERGONOMICS',
      description: 'Accessible, responsive UIs with clean state management (Zustand/Redux) and attention to re-render performance.'
    }
  ];

  return (
    <section 
      id="about" 
      className="py-20 md:py-28 border-t border-[#E5DFD6] relative overflow-hidden text-left"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Editorial Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E5DFD6]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#C88A58] tracking-wider uppercase font-medium">
              [ 03 / PHILOSOPHY & BACKGROUND ]
            </span>
            <span className="text-xs font-mono text-[#80776C] hidden sm:inline">
              CORE TENETS & ENGINEERING FOUNDATION
            </span>
          </div>
          <span className="text-xs font-mono text-[#80776C]">
            EST. 2024
          </span>
        </div>

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14 space-y-3"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#161514] tracking-tight leading-tight">
            Building reliable software with curiosity, craft, and deliberate purpose.
          </h2>
          <p className="text-base text-[#5C564D] font-sans">
            Bridging full-stack engineering with applied AI and cloud-native tooling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Biography Narrative (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4 text-base text-[#4A453E] leading-relaxed font-sans font-normal">
              {profile.bioParagraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Current Research Focus Deck */}
            <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E5DFD6] space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C88A58] uppercase tracking-wider font-medium">
                <Compass className="w-3.5 h-3.5" />
                <span>Active Research & Technical Focus</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {profile.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-xs font-sans text-[#2E2A25] bg-[#FAF7F2] border border-[#E5DFD6]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Academic Foundation */}
            {educations.length > 0 && (
              <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E5DFD6] space-y-4 shadow-2xs">
                <div className="flex items-center gap-2 text-[#161514] font-sans font-medium text-sm">
                  <GraduationCap className="w-4 h-4 text-[#C88A58]" />
                  <span>Academic Background</span>
                </div>
                {educations.map((edu) => (
                  <div key={edu.id} className="text-xs space-y-1 pl-3 border-l-2 border-[#C88A58]">
                    <div className="flex flex-wrap items-center justify-between gap-1 font-medium text-[#161514] text-sm">
                      <span className="font-serif text-base">{edu.degree}</span>
                      <span className="text-[#80776C] font-mono text-xs">{edu.period}</span>
                    </div>
                    <div className="text-[#5C564D]">{edu.institution} • {edu.location}</div>
                    {edu.details && (
                      <p className="text-[#6E675E] mt-1">{edu.details}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Core Pillars / Architecture Cards (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-3.5"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-mono text-[#80776C] uppercase tracking-wider font-medium">
                Engineering Tenets
              </h3>
            </div>
            
            <div className="space-y-3">
              {corePillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5DFD6] hover:border-[#C8BFB2] transition-all duration-200 shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-2 rounded-lg bg-[#FAF7F2] text-[#C88A58] shrink-0 mt-0.5 border border-[#E5DFD6]">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-base text-[#161514] font-normal tracking-tight">
                          {pillar.title}
                        </h4>
                        <p className="text-xs text-[#5C564D] leading-relaxed font-sans">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Resume Trigger */}
            <div className="pt-2">
              <button
                onClick={onOpenResume}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF7F2] border border-[#E5DFD6] hover:border-[#C8BFB2] text-[#2E2A25] hover:text-[#161514] font-sans text-xs transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-[#C88A58]" />
                  <span className="font-medium">Inspect Full Curriculum Vitae</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#80776C]" />
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

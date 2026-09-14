import React from 'react';
import { 
  Briefcase, 
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
      className="py-20 md:py-28 border-t border-[#E5DFD6] relative overflow-hidden text-left"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Editorial Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E5DFD6]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#C88A58] tracking-wider uppercase font-medium">
              [ 05 / LEADERSHIP & OPEN SOURCE ]
            </span>
            <span className="text-xs font-mono text-[#80776C] hidden sm:inline">
              COMMUNITY & CONTRIBUTIONS
            </span>
          </div>
          <span className="text-xs font-mono text-[#80776C]">
            2024 – PRESENT
          </span>
        </div>

        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-12 space-y-2"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#161514] tracking-tight">
            Leadership & Open Source
          </h2>
          <p className="text-sm text-[#5C564D] font-sans">
            Open-source contributions, community leadership, and hands-on workshop delivery.
          </p>
        </motion.div>

        {/* Timeline List */}
        <div className="relative border-l border-[#E5DFD6] ml-3 md:ml-6 pl-6 md:pl-8 space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={exp.id} 
              id={`experience-item-${exp.id}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative group"
            >
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] md:-left-[39px] top-4 w-2.5 h-2.5 rounded-full bg-[#C88A58] ring-4 ring-[#FAF8F5]" />

              {/* Experience Card */}
              <div className="p-6 sm:p-7 rounded-xl bg-[#FFFFFF] border border-[#E5DFD6] hover:border-[#C8BFB2] transition-all duration-200 space-y-4 shadow-2xs hover:shadow-xs">
                
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#161514] font-normal tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm font-sans text-[#2E2A25]">
                      <span className="text-[#B86B35] font-medium">{exp.company}</span>
                      <span className="text-[#80776C]">•</span>
                      <span className="flex items-center gap-1 text-[#80776C] font-mono text-xs">
                        <MapPin className="w-3 h-3 text-[#C88A58]" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-xs font-mono text-[#5C564D] bg-[#FAF7F2] border border-[#E5DFD6]">
                      {exp.period}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-[#B86B35] bg-[#FAF7F2] border border-[#E5DFD6] font-semibold">
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#4A453E] leading-relaxed font-sans">
                  {exp.description}
                </p>

                {/* Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-mono text-[#80776C] uppercase tracking-wider font-medium">
                       Highlights:
                    </h4>
                    <div className="space-y-1.5">
                      {exp.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#4A453E] font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C88A58] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-3 border-t border-[#E5DFD6] flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-mono text-[#80776C] mr-1">Stack:</span>
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#FAF7F2] text-[#2E2A25] border border-[#E5DFD6]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Background */}
        {educations && educations.length > 0 && (
          <div className="mt-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C88A58] uppercase tracking-wider mb-6 font-medium">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic Credentials</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {educations.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E5DFD6] hover:border-[#C8BFB2] transition-all duration-200 space-y-2.5 shadow-2xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-serif text-lg text-[#161514] font-normal">
                        {edu.degree}
                      </h4>
                      <p className="text-xs font-sans text-[#B86B35] font-medium mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-xs font-mono text-[#5C564D] bg-[#FAF7F2] border border-[#E5DFD6]">
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-xs text-[#80776C] font-mono">
                    {edu.location} {edu.grade ? `• ${edu.grade}` : ''}
                  </p>

                  <p className="text-xs text-[#4A453E] font-sans">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

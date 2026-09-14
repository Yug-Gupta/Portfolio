import React, { useEffect } from 'react';
import { 
  X, 
  Printer, 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  FileCheck2
} from 'lucide-react';
import { UserProfile, Experience, Education, SkillCategory } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  experiences: Experience[];
  educations: Education[];
  skillCategories: SkillCategory[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  experiences,
  educations,
  skillCategories,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="resume-modal-container"
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#FFFFFF] border border-[#E5DFD6] rounded-2xl shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Action Toolbar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#E5DFD6] bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-[#C88A58]" />
            <span className="text-xs font-mono text-[#80776C] uppercase tracking-wider font-medium">Curriculum Vitae</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              id="print-resume-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono text-[#2E2A25] hover:text-[#161514] bg-[#FFFFFF] hover:bg-[#EBE6DC] border border-[#E5DFD6] transition-colors cursor-pointer shadow-2xs"
            >
              <Printer className="w-3 h-3 text-[#C88A58]" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              id="close-resume-modal-btn"
              aria-label="Close resume"
              className="p-1 rounded-md text-[#6E675E] hover:text-[#161514] hover:bg-[#EBE6DC] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Document Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 print:p-0 print:overflow-visible">
          
          {/* Resume Header */}
          <div className="border-b border-[#E5DFD6] pb-5 space-y-1.5">
            <h1 className="font-serif text-3xl text-[#161514] font-normal tracking-tight">
              {profile.name}
            </h1>
            <p className="text-xs font-mono text-[#B86B35] uppercase tracking-wider font-medium">
              {profile.title}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5C564D] pt-1 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-[#C88A58]" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#C88A58]" />
                {profile.location}
              </span>
              {profile.socialLinks.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3 h-3 text-[#C88A58]" />
                  linkedin.com
                </span>
              )}
              {profile.socialLinks.github && (
                <span className="flex items-center gap-1">
                  <Github className="w-3 h-3 text-[#C88A58]" />
                  github.com
                </span>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono text-[#80776C] uppercase tracking-wider border-b border-[#E5DFD6] pb-1 font-medium">
              Summary
            </h2>
            <p className="text-xs sm:text-sm text-[#4A453E] font-sans leading-relaxed">
              {profile.bioParagraphs[0]}
            </p>
          </div>

          {/* Core Technical Proficiencies */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono text-[#80776C] uppercase tracking-wider border-b border-[#E5DFD6] pb-1 font-medium">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {skillCategories.map((cat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <span className="text-[#B86B35] font-mono text-[11px] block font-medium">{cat.title}:</span>
                  <span className="text-[#2E2A25] font-sans text-xs">
                    {cat.skills.map(s => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono text-[#80776C] uppercase tracking-wider border-b border-[#E5DFD6] pb-1 font-medium">
              Work Experience
            </h2>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-serif text-base text-[#161514] font-normal">
                      {exp.role} — <span className="text-[#B86B35] font-sans text-sm font-medium">{exp.company}</span>
                    </span>
                    <span className="text-xs font-mono text-[#80776C]">{exp.period}</span>
                  </div>

                  <p className="text-xs text-[#4A453E] font-sans leading-relaxed">
                    {exp.description}
                  </p>

                  {exp.highlights && (
                    <ul className="list-disc list-inside text-xs text-[#5C564D] font-sans space-y-0.5 pl-1 pt-1">
                      {exp.highlights.map((h, hIdx) => (
                        <li key={hIdx}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-[#80776C] uppercase tracking-wider border-b border-[#E5DFD6] pb-1 font-medium">
              Education
            </h2>

            <div className="space-y-2">
              {educations.map((edu) => (
                <div key={edu.id} className="flex flex-wrap items-center justify-between gap-1 text-xs">
                  <div>
                    <span className="font-serif text-sm text-[#161514] font-normal">{edu.degree}</span>
                    <span className="text-[#5C564D] font-sans"> — {edu.institution}</span>
                  </div>
                  <span className="text-[#80776C] font-mono">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#E5DFD6] bg-[#FAF7F2] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-[#FFFFFF] hover:bg-[#EBE6DC] text-[#5C564D] hover:text-[#161514] font-sans text-xs border border-[#E5DFD6] transition-colors cursor-pointer shadow-2xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

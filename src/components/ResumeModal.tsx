import React, { useEffect, useRef } from 'react';
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
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeRef.current?.focus(), 50);
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-surface border border-line rounded-2xl shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Action Toolbar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-line bg-surface-2">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-accent" aria-hidden="true" />
            <span className="type-label font-medium">Resume</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              id="print-resume-btn"
              className="btn btn-sm btn-outline font-mono"
            >
              <Printer className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span>Print / PDF</span>
            </button>
            <button
              ref={closeRef}
              onClick={onClose}
              id="close-resume-modal-btn"
              aria-label="Close resume"
              className="btn btn-icon text-muted hover:bg-chip"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Resume Document Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 print:p-0 print:overflow-visible">
          
          {/* Resume Header */}
          <div className="border-b border-line pb-5 space-y-1.5">
            <h1 id="resume-modal-title" className="font-serif text-3xl text-ink font-normal tracking-tight">
              {profile.name}
            </h1>
            <p className="text-xs font-mono text-accent-strong font-medium">
              {profile.title}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 type-meta pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-accent" aria-hidden="true" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-accent" aria-hidden="true" />
                {profile.location}
              </span>
              {profile.socialLinks.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3 h-3 text-accent" aria-hidden="true" />
                  linkedin.com
                </span>
              )}
              {profile.socialLinks.github && (
                <span className="flex items-center gap-1">
                  <Github className="w-3 h-3 text-accent" aria-hidden="true" />
                  github.com
                </span>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5">
            <h2 className="type-label font-medium border-b border-line pb-1">
              Summary
            </h2>
            <p className="type-body-sm">
              {profile.bioParagraphs[0]}
            </p>
          </div>

          {/* Core Technical Proficiencies */}
          <div className="space-y-2">
            <h2 className="type-label font-medium border-b border-line pb-1">
              Technical competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {skillCategories.map((cat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <span className="text-accent-strong font-mono text-xs block font-medium">{cat.title}:</span>
                  <span className="text-ink-soft font-sans text-xs">
                    {cat.skills.map(s => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="type-label font-medium border-b border-line pb-1">
              Work experience
            </h2>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-serif text-base text-ink font-normal">
                      {exp.role} — <span className="text-accent-strong font-sans text-sm font-medium">{exp.company}</span>
                    </span>
                    <span className="type-meta">{exp.period}</span>
                  </div>

                  <p className="type-body-sm">
                    {exp.description}
                  </p>

                  {exp.highlights && (
                    <ul className="list-disc list-inside text-xs text-muted font-sans space-y-0.5 pl-1 pt-1">
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
            <h2 className="type-label font-medium border-b border-line pb-1">
              Education
            </h2>

            <div className="space-y-2">
              {educations.map((edu) => (
                <div key={edu.id} className="flex flex-wrap items-center justify-between gap-1 text-xs">
                  <div>
                    <span className="font-serif text-sm text-ink font-normal">{edu.degree}</span>
                    <span className="text-muted font-sans"> — {edu.institution}</span>
                  </div>
                  <span className="type-meta">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-line bg-surface-2 flex justify-end">
          <button
            onClick={onClose}
            className="btn btn-sm btn-outline"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

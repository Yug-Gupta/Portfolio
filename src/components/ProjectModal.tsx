import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  TrendingUp, 
  Calendar, 
  Briefcase, 
  Layers
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      id="project-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="project-detail-modal-content"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FFFFFF] border border-[#E5DFD6] rounded-2xl shadow-xl p-6 sm:p-8 text-left space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="project-modal-close-btn"
          aria-label="Close modal"
          className="absolute top-5 right-5 p-1.5 rounded-md text-[#6E675E] hover:text-[#161514] bg-[#FAF7F2] hover:bg-[#EBE6DC] border border-[#E5DFD6] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-md font-mono text-xs text-[#B86B35] bg-[#FAF7F2] border border-[#E5DFD6] font-semibold">
              {project.category}
            </span>
            <span className="flex items-center gap-1 text-[#80776C] font-mono">
              <Calendar className="w-3 h-3" />
              {project.year}
            </span>
            {project.role && (
              <span className="flex items-center gap-1 text-[#80776C] font-mono">
                <Briefcase className="w-3 h-3" />
                {project.role}
              </span>
            )}
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-[#161514] font-normal tracking-tight">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#4A453E] font-sans">
            {project.tagline}
          </p>
        </div>

        {/* Action Links Bar */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1 border-b border-[#E5DFD6] pb-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="project-modal-demo-link"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#161514] hover:bg-[#2C2925] text-[#FAF8F5] font-sans font-medium text-xs transition-colors shadow-xs"
            >
              <span>Live Demonstration</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="project-modal-github-link"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#EBE6DC] text-[#2E2A25] hover:text-[#161514] font-sans font-medium text-xs border border-[#E5DFD6] transition-colors"
            >
              <Github className="w-3 h-3" />
              <span>Source Repository</span>
            </a>
          )}
        </div>

        {/* Metrics Grid if available */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E5DFD6] text-left shadow-2xs"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#6E675E] font-mono">
                  <TrendingUp className="w-3 h-3 text-[#C88A58]" />
                  {metric.label}
                </div>
                <div className="font-serif text-xl text-[#161514] mt-1">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Overview */}
        <div className="space-y-2 text-left">
          <h4 className="text-xs font-mono text-[#80776C] uppercase tracking-wider font-medium">
            Architecture & Deep Dive
          </h4>
          <p className="text-xs sm:text-sm text-[#4A453E] font-sans leading-relaxed">
            {project.fullDescription || project.description}
          </p>
        </div>

        {/* Key Features List */}
        {project.features && project.features.length > 0 && (
          <div className="space-y-2 text-left">
            <h4 className="text-xs font-mono text-[#80776C] uppercase tracking-wider font-medium">
              Technical Highlights
            </h4>
            <div className="space-y-1.5">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#4A453E] font-sans">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C88A58] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Used */}
        <div className="space-y-2 text-left pt-2 border-t border-[#E5DFD6]">
          <h4 className="text-xs font-mono text-[#80776C] uppercase tracking-wider font-medium flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#C88A58]" />
            <span>Technologies & Stack</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 rounded-md text-xs font-mono text-[#2E2A25] bg-[#FAF7F2] border border-[#E5DFD6]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#FAF7F2] hover:bg-[#EBE6DC] text-[#5C564D] hover:text-[#161514] border border-[#E5DFD6] font-sans text-xs transition-colors cursor-pointer shadow-2xs"
          >
            Close Overview
          </button>
        </div>

      </div>
    </div>
  );
};


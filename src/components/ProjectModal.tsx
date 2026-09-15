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
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-line rounded-2xl shadow-xl p-6 sm:p-8 text-left space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="project-modal-close-btn"
          aria-label="Close project details"
          className="absolute top-5 right-5 btn btn-icon bg-surface-2 text-muted border border-line"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="chip-accent px-2 py-0.5">
              {project.category}
            </span>
            <span className="flex items-center gap-1 text-faint font-mono">
              <Calendar className="w-3 h-3" aria-hidden="true" />
              {project.year}
            </span>
            {project.role && (
              <span className="flex items-center gap-1 text-faint font-mono">
                <Briefcase className="w-3 h-3" aria-hidden="true" />
                {project.role}
              </span>
            )}
          </div>

          <h3 id="project-modal-title" className="font-serif text-2xl sm:text-3xl text-ink font-normal tracking-tight">
            {project.title}
          </h3>
          <p className="type-body-sm">
            {project.tagline}
          </p>
        </div>

        {/* Action Links Bar */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1 border-b border-line pb-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="project-modal-demo-link"
              className="btn btn-sm btn-primary"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="project-modal-github-link"
              className="btn btn-sm btn-outline"
            >
              <Github className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Source</span>
            </a>
          )}
        </div>

        {/* Metrics Grid if available */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-surface-2 border border-line text-left shadow-2xs"
              >
                <div className="flex items-center gap-1.5 text-xs text-muted font-mono">
                  <TrendingUp className="w-3 h-3 text-accent" aria-hidden="true" />
                  {metric.label}
                </div>
                <div className="font-serif text-xl text-ink mt-1">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Overview */}
        <div className="space-y-2 text-left">
          <h4 className="type-label font-medium">
            Architecture & deep dive
          </h4>
          <p className="type-body-sm">
            {project.fullDescription || project.description}
          </p>
        </div>

        {/* Key Features List */}
        {project.features && project.features.length > 0 && (
          <div className="space-y-2 text-left">
            <h4 className="type-label font-medium">
              Technical highlights
            </h4>
            <div className="space-y-1.5">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-body font-sans">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Used */}
        <div className="space-y-2 text-left pt-2 border-t border-line">
          <h4 className="type-label font-medium flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-accent" aria-hidden="true" />
            <span>Technologies & stack</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="chip">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 flex justify-end">
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


import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Github, TrendingUp, Check } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-canvas/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden glass-card-static flex flex-col animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 pb-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="chip-accent">{project.category}</span>
              <span className="type-meta">{project.year}</span>
              {project.role && <span className="type-meta">· {project.role}</span>}
            </div>
            <h2 id="project-modal-title" className="type-subsection text-ink">
              {project.title}
            </h2>
            <p className="type-body-sm italic text-ink-3">{project.tagline}</p>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="btn-icon shrink-0 ml-4 cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Actions */}
          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sm btn-primary"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sm btn-secondary"
              >
                <Github size={14} /> Source Code
              </a>
            )}
          </div>

                            {project.metrics && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                              {project.metrics.map((metric, mIdx) => (
                                <div key={mIdx} className="panel p-3 text-center space-y-1">
                                  <TrendingUp size={14} className="mx-auto text-accent" />
                                  <div className="font-serif text-lg font-medium text-ink">{metric.value}</div>
                                  <div className="type-meta">{metric.label}</div>
                                </div>
                              ))}
                            </div>
                          )}

          {/* Full Description */}
          <div className="space-y-2">
            <h3 className="type-label">Architecture & Deep Dive</h3>
            <p className="type-body leading-relaxed">{project.fullDescription || project.description}</p>
          </div>

          {/* Features */}
          {project.features.length > 0 && (
            <div className="space-y-2">
              <h3 className="type-label">Technical Highlights</h3>
              <ul className="space-y-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 type-body-sm">
                    <Check size={14} className="text-accent mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="space-y-2">
            <h3 className="type-label">Technology Stack</h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span key={tech} className="chip">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 sm:p-8 pt-0">
          <button
            onClick={onClose}
            className="btn-md btn-secondary w-full cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

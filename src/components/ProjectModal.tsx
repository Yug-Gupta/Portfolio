import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ExternalLink, Github, X } from 'lucide-react';
import type { Project } from '../types';
import { ProjectDiagram } from './ProjectDiagram';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  const [name, subtitle] = project ? project.title.split(' — ') : ['', ''];
  const variant = project?.id === 'nexora' ? 'graph' : 'pipeline';

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-xl border border-line-strong bg-surface sm:rounded-xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-6 border-b border-line bg-surface-2 px-6 py-4 sm:px-8">
              <div className="marker flex-wrap pt-1">
                <span className="marker-index">{project.category}</span>
                <span aria-hidden="true">/</span>
                <span>{project.year}</span>
                {project.role && (
                  <>
                    <span aria-hidden="true">/</span>
                    <span>{project.role}</span>
                  </>
                )}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="btn-icon h-9 w-9 shrink-0"
                aria-label="Close case study"
              >
                <X size={17} aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-8 sm:px-8">
                <h2 id="project-modal-title" className="t-h2 text-ink">
                  {name}
                </h2>
                {subtitle && <p className="t-lead mt-3">{subtitle}</p>}

                <div className="mt-7 flex flex-wrap gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-md btn-primary"
                    >
                      <ExternalLink size={15} aria-hidden="true" />
                      Live project
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-md btn-outline"
                    >
                      <Github size={15} aria-hidden="true" />
                      Source code
                    </a>
                  )}
                </div>

                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <dl className="mt-9 grid grid-cols-1 gap-px border border-line sm:grid-cols-3">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="bg-surface-2 px-4 py-4">
                        <dt className="t-label">{metric.label}</dt>
                        <dd className="t-h4 mt-1.5 text-ink">
                          {metric.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {/* Overview */}
                <section className="mt-9">
                  <h3 className="t-label">Overview</h3>
                  <p className="t-body measure mt-3">
                    {project.fullDescription || project.description}
                  </p>
                </section>

                {/* Features */}
                {project.features.length > 0 && (
                  <section className="mt-9">
                    <h3 className="t-label">Key functionality</h3>
                    <ul className="mt-4 space-y-3">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex gap-3">
                          <Check size={15} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                          <span className="t-small">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Architecture */}
                <section className="mt-9">
                  <h3 className="t-label">Architecture</h3>
                  <div className="window mt-4 bg-surface-2">
                    <div className="aspect-[4/3] p-5 sm:p-7">
                      <ProjectDiagram variant={variant} label={`${name} architecture diagram`} />
                    </div>
                  </div>
                </section>

                {/* Stack */}
                <section className="mt-9">
                  <h3 className="t-label">Stack</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

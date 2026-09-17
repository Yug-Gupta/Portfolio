import { useState } from 'react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import type { Project } from '../types';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { ProjectDiagram } from './ProjectDiagram';
import { ProjectModal } from './ProjectModal';

interface ProjectsSectionProps {
  projects: Project[];
}

function splitTitle(title: string) {
  const [name, ...rest] = title.split(' — ');
  return { name, subtitle: rest.join(' — ') };
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section">
      <div className="shell">
        <SectionHeading
          index="02"
          label="Selected work"
          title="Case studies, not screenshots."
          intro="Two systems taken from problem to production — a full-stack platform and a GraphRAG reasoning engine. Each entry documents the architecture, the stack, and the decisions."
          aside={
            <a
              href="https://github.com/Yug-Gupta"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-md btn-outline"
            >
              <Github size={15} aria-hidden="true" />
              All repositories
            </a>
          }
        />

        <div className="mt-14 lg:mt-20">
          {projects.map((project, index) => {
            const { name, subtitle } = splitTitle(project.title);
            const flipped = index % 2 === 1;
            const variant = project.id === 'nexora' ? 'graph' : 'pipeline';

            return (
              <Reveal key={project.id}>
                <article
                  id={`project-${project.id}`}
                  className="grid gap-8 border-t border-line py-12 lg:grid-cols-12 lg:gap-14 lg:py-16"
                >
                  {/* Narrative */}
                  <div className={`lg:col-span-5 ${flipped ? 'lg:order-2' : ''}`}>
                    <div className="marker flex-wrap">
                      <span className="marker-index">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span aria-hidden="true">/</span>
                      <span>{project.category}</span>
                      <span aria-hidden="true">/</span>
                      <span>{project.year}</span>
                      {project.featured && <span className="chip-accent ml-1">Featured</span>}
                    </div>

                    <h3 className="t-h3 mt-5 text-ink">
                      {name}
                      {subtitle && (
                        <span className="mt-1 block text-ink-3">{subtitle}</span>
                      )}
                    </h3>

                    <p className="t-body measure mt-5">{project.description}</p>

                    <ul className="measure mt-6 space-y-2.5">
                      {project.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-accent" />
                          <span className="t-small">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-7 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <li key={tech} className="chip">
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <button
                        type="button"
                        onClick={() => setSelected(project)}
                        className="link-mono text-ink"
                      >
                        Read the case study
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </button>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-mono"
                        >
                          <ExternalLink size={13} aria-hidden="true" />
                          Live demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-mono"
                        >
                          <Github size={13} aria-hidden="true" />
                          Source
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Diagram */}
                  <div className={`lg:col-span-7 ${flipped ? 'lg:order-1' : ''}`}>
                    <button
                      type="button"
                      onClick={() => setSelected(project)}
                      aria-label={`Open ${name} case study`}
                      className="group block w-full text-left"
                    >
                      <div className="window bg-surface-2 transition-colors duration-300 group-hover:border-line-strong">
                        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                          <span className="t-mono text-[0.6875rem] text-ink-3">
                            {variant === 'graph' ? 'retrieval-pipeline' : 'request-lifecycle'}
                          </span>
                          <span className="t-mono flex items-center gap-2 text-[0.6875rem] text-ink-3 transition-colors group-hover:text-accent">
                            case study
                            <ArrowUpRight
                              size={12}
                              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <div className="aspect-[4/3] p-5 sm:p-7">
                          <ProjectDiagram
                            variant={variant}
                            label={`${name} architecture diagram`}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
          <div className="border-t border-line" />
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

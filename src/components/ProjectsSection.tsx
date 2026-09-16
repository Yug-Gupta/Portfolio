import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ExternalLink, 
  Github, 
  ArrowUpRight, 
  Code2, 
  LayoutGrid,
  ListFilter
} from 'lucide-react';
import { motion } from 'motion/react';
import { Project, ProjectCategory } from '../types';
import { ProjectModal } from './ProjectModal';
import { Card3DTilt } from './Card3DTilt';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'index'>('grid');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = ['All', 'Full Stack', 'Cloud & Systems', 'AI & Tools', 'Web & UI'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(t => t.toLowerCase().includes(query));
      
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const heroProject = filteredProjects.find(p => p.featured) || filteredProjects[0];
  const secondaryProjects = filteredProjects.filter(p => p.id !== heroProject?.id);

  const openProject = (project: Project) => setActiveModalProject(project);

  return (
    <section 
      id="projects" 
      className="py-16 md:py-24 border-t border-line relative overflow-hidden text-left"
    >
      <div className="container-page">
        
        {/* Section Editorial Header */}
        <div className="section-rule">
          <div className="flex items-center gap-3">
            <span className="type-eyebrow font-medium">
              [ 03 / Selected Architectures ]
            </span>
            <span className="type-meta hidden sm:inline">
              Full-stack apps & applied AI
            </span>
          </div>
          <span className="type-meta">
            {filteredProjects.length} of {projects.length} shown
          </span>
        </div>

        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-8 space-y-2"
        >
          <h2 className="type-section">
            Featured Projects & Case Studies
          </h2>
          <p className="type-body-sm">
            Full-stack web applications, GraphRAG knowledge engines, and production AI/LLM systems.
          </p>
        </motion.div>

        {/* Project Controls: filters, view toggle and search in one control bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter projects by category">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  id={`filter-category-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  aria-pressed={isSelected}
                  className="filter-chip"
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* View Mode Switcher */}
            <div className="segmented shrink-0" role="group" aria-label="Project view mode">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                id="projects-view-grid-btn"
                aria-pressed={viewMode === 'grid'}
                className="segmented-item"
              >
                <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('index')}
                id="projects-view-index-btn"
                aria-pressed={viewMode === 'index'}
                className="segmented-item"
              >
                <ListFilter className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Index</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64 shrink-0">
              <label htmlFor="project-search-input" className="sr-only">
                Search projects
              </label>
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none" aria-hidden="true" />
              <input
                type="text"
                id="project-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="input input-sm h-9 pl-9 pr-16"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear project search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-sans text-muted hover:text-ink cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center card">
            <Code2 className="w-8 h-8 mx-auto text-faint mb-2" aria-hidden="true" />
            <h3 className="font-serif text-base text-ink">No projects match query</h3>
            <p className="text-xs text-muted mt-1 max-w-sm mx-auto font-sans">
              No matching records found for "{searchQuery}" in "{selectedCategory}".
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="btn btn-sm btn-primary mt-4"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Card Case Study Mode */
          <div className="space-y-8">
            
            {/* 1. Flagship Hero System Card */}
            {heroProject && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="card card-hover rounded-2xl overflow-hidden shadow-sm hover:shadow-md"
              >
                <div className="p-7 sm:p-9 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
                  
                  {/* Left 7 cols: Story & Specs */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="chip-accent">
                        Featured Project
                      </span>
                      <span className="type-meta">
                        {heroProject.year} • {heroProject.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-ink font-normal tracking-tight">
                      {heroProject.title}
                    </h3>

                    <p className="font-mono text-xs text-accent-strong font-medium">
                      {heroProject.tagline}
                    </p>

                    <p className="type-body-sm max-w-xl">
                      {heroProject.description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {heroProject.technologies.map((tech, idx) => (
                        <span key={idx} className="chip">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => openProject(heroProject)}
                        className="btn btn-sm btn-primary"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>

                      {heroProject.demoUrl && (
                        <a
                          href={heroProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      )}

                      {heroProject.githubUrl && (
                        <a
                          href={heroProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline"
                        >
                          <Github className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Source</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right 5 cols: Project Highlights */}
                  <div className="lg:col-span-5">
                    <div className="panel p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-muted pb-2 border-b border-line">
                        <span className="text-accent font-semibold">
                          Project Highlights
                        </span>
                        <span>At a glance</span>
                      </div>

                      {heroProject.metrics && heroProject.metrics.map((m, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-surface border border-line shadow-2xs">
                          <span className="text-xs text-muted font-sans">{m.label}</span>
                          <span className="font-mono text-sm text-ink font-medium">{m.value}</span>
                        </div>
                      ))}

                      <div className="pt-1 flex items-center justify-between text-xs text-faint font-mono">
                        <span>Production Deployed</span>
                        <span>CI/CD Backed</span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* 2. Secondary Systems Grid */}
            {secondaryProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {secondaryProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                  >
                    <Card3DTilt
                      maxTilt={8}
                      className="h-full card card-hover rounded-xl"
                    >
                      <div className="h-full flex flex-col justify-between p-6 text-left">
                        {/* Clickable body */}
                        <div 
                          id={`project-card-${project.id}`}
                          role="button"
                          tabIndex={0}
                          onClick={() => openProject(project)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              openProject(project);
                            }
                          }}
                          className="cursor-pointer group flex-1"
                        >
                          {/* Card Header Top */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="chip-accent px-2 py-0.5">
                              {project.category}
                            </span>
                            <span className="type-meta">{project.year}</span>
                          </div>

                          {/* Project Title */}
                          <h3 className="font-serif text-xl text-ink group-hover:text-accent transition-colors tracking-tight font-normal">
                            {project.title}
                          </h3>

                          {/* Tagline */}
                          <p className="font-mono text-xs text-muted mt-1 mb-2.5">
                            {project.tagline}
                          </p>

                          {/* Description */}
                          <p className="type-body-sm line-clamp-3 mb-4">
                            {project.description}
                          </p>

                          {/* Quick Metric */}
                          {project.metrics && project.metrics.length > 0 && (
                            <div className="mb-4 p-2.5 rounded-lg bg-surface-2 border border-line flex items-center justify-between text-xs">
                              <span className="text-muted font-sans">{project.metrics[0].label}:</span>
                              <span className="text-ink font-mono font-medium">
                                {project.metrics[0].value}
                              </span>
                            </div>
                          )}

                          {/* Technology Pills */}
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {project.technologies.slice(0, 4).map((tech, tIdx) => (
                              <span key={tIdx} className="chip px-2 py-0.5">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="px-1.5 py-0.5 font-mono text-xs text-faint">
                                +{project.technologies.length - 4}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Actions Footer */}
                        <div className="mt-5 pt-4 border-t border-line flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                          <button
                            type="button"
                            onClick={() => openProject(project)}
                            id={`view-details-${project.id}`}
                            className="btn btn-sm btn-primary"
                          >
                            <span>View Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>

                          <div className="flex items-center gap-3">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                id={`project-card-github-${project.id}`}
                                className="inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-ink transition-colors"
                              >
                                <Github className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Source</span>
                              </a>
                            )}
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                id={`project-card-demo-${project.id}`}
                                className="inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-ink transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Live Demo</span>
                              </a>
                            )}
                          </div>
                        </div>

                      </div>
                    </Card3DTilt>
                  </motion.div>
                ))}
              </div>
            )}

          </div>
        ) : (
          /* Tabular Index View */
          <div className="card overflow-hidden">
            <div className="grid grid-cols-12 px-5 py-3 border-b border-line bg-surface-2 text-xs font-mono text-faint">
              <div className="col-span-1">Year</div>
              <div className="col-span-4 sm:col-span-3">Project</div>
              <div className="col-span-3 hidden sm:block">Category</div>
              <div className="col-span-5 sm:col-span-4">Primary Stack</div>
              <div className="col-span-2 sm:col-span-1 text-right">Inspect</div>
            </div>

            <div className="divide-y divide-line">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${project.title}`}
                  onClick={() => openProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openProject(project);
                    }
                  }}
                  className="grid grid-cols-12 px-5 py-4 items-center text-xs hover:bg-surface-2 transition-colors cursor-pointer group"
                >
                  <div className="col-span-1 font-mono text-faint">
                    {project.year}
                  </div>
                  <div className="col-span-4 sm:col-span-3 font-serif text-sm text-ink font-medium group-hover:text-accent transition-colors">
                    {project.title}
                  </div>
                  <div className="col-span-3 hidden sm:block font-mono text-xs text-muted">
                    {project.category}
                  </div>
                  <div className="col-span-5 sm:col-span-4 font-mono text-xs text-body">
                    {project.technologies.slice(0, 3).join(' • ')}
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex justify-end">
                    <ArrowUpRight className="w-4 h-4 text-faint group-hover:text-accent transition-colors" aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Project Case Study Deep Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};

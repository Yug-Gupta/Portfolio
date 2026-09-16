import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search, ExternalLink, Github, ArrowUpRight, ChevronRight,
  Layers, LayoutGrid, List, X,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project, ProjectCategory } from '../types';
import { Card3DTilt } from './Card3DTilt';
import { ProjectModal } from './ProjectModal';
import { SectionHeader } from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'index'>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Only show categories that have projects
  const availableCategories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category));
    const allCats: ProjectCategory[] = ['All', ...Array.from(cats) as ProjectCategory[]];
    return allCats;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let result = projects;
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [projects, activeCategory, searchQuery]);

  const featuredProject = filteredProjects.find((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  // GSAP scroll entrance
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.project-card-reveal', {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects, viewMode]);

  return (
    <section id="projects" ref={sectionRef} className="section-spacing relative overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/[0.02] blur-[100px]" />
      </div>

      <div className="container-wide relative z-10">
        <SectionHeader
          number="03"
          label="Selected Architectures"
          title="Projects"
          subtitle="A curated selection of systems I've designed and built — from AI-powered knowledge engines to full-stack platforms."
          badge={`${filteredProjects.length} of ${projects.length} shown`}
        />

        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
          {/* Category Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-chip cursor-pointer ${activeCategory === cat ? 'filter-chip-active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Toggle + Search */}
          <div className="flex items-center gap-3">
            <div className="segmented">
              <button
                onClick={() => setViewMode('grid')}
                className={`segmented-item cursor-pointer ${viewMode === 'grid' ? 'segmented-item-active' : ''}`}
                aria-label="Grid view"
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setViewMode('index')}
                className={`segmented-item cursor-pointer ${viewMode === 'index' ? 'segmented-item-active' : ''}`}
                aria-label="List view"
              >
                <List size={14} />
              </button>
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="input-sm pl-8 pr-8 w-48 sm:w-56"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink cursor-pointer"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="glass-card-static p-12 text-center">
            <Layers size={32} className="mx-auto text-ink-3 mb-3" />
            <p className="type-body">No projects match your current filters.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="btn-sm btn-outline mt-4 cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && filteredProjects.length > 0 && (
          <div ref={cardsRef} className="space-y-8">
            {/* Featured Project — Cinematic Card */}
            {featuredProject && (
              <div className="project-card-reveal">
                <Card3DTilt maxTilt={4} className="group">
                  <div
                    className="glass-card p-6 sm:p-8 lg:p-10 cursor-pointer"
                    onClick={() => setSelectedProject(featuredProject)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(featuredProject)}
                    aria-label={`View details for ${featuredProject.title}`}
                  >
                    {/* Featured badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <span className="chip-accent">Featured</span>
                        <span className="chip">{featuredProject.category}</span>
                        <span className="type-meta">{featuredProject.year}</span>
                      </div>
                      <ArrowUpRight size={18} className="text-ink-3 transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left: Content */}
                      <div className="lg:col-span-7 space-y-4">
                        <h3 className="type-subsection text-ink group-hover:text-accent transition-colors duration-300">
                          {featuredProject.title}
                        </h3>
                        <p className="type-body-sm italic text-ink-3">{featuredProject.tagline}</p>
                        <p className="type-body leading-relaxed">
                          {featuredProject.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {featuredProject.technologies.map((tech) => (
                            <span key={tech} className="chip">{tech}</span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedProject(featuredProject); }}
                            className="btn-sm btn-primary cursor-pointer"
                          >
                            View Case Study
                            <ChevronRight size={14} />
                          </button>
                          {featuredProject.demoUrl && (
                            <a
                              href={featuredProject.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="btn-sm btn-outline"
                            >
                              <ExternalLink size={13} /> Live Demo
                            </a>
                          )}
                          {featuredProject.githubUrl && (
                            <a
                              href={featuredProject.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="btn-sm btn-ghost"
                            >
                              <Github size={13} /> Source
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Right: Highlights */}
                      <div className="lg:col-span-5">
                        <div className="panel p-5 space-y-4">
                          <h4 className="type-label flex items-center gap-2">
                            <Layers size={14} className="text-accent" />
                            Project Highlights
                          </h4>
                          <ul className="space-y-2.5">
                            {featuredProject.features.slice(0, 5).map((feature, i) => (
                              <li key={i} className="flex items-start gap-2.5 type-body-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          {featuredProject.metrics && (
                            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-line">
                              {featuredProject.metrics.slice(0, 4).map((metric, mIdx) => (
                                <div key={mIdx} className="space-y-0.5">
                                  <div className="font-serif text-lg font-medium text-ink">{metric.value}</div>
                                  <div className="type-meta">{metric.label}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card3DTilt>
              </div>
            )}

            {/* Secondary Projects Grid */}
            {otherProjects.length > 0 && (
              <div className={`grid grid-cols-1 ${otherProjects.length === 1 ? 'md:grid-cols-1 max-w-2xl' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
                {otherProjects.map((project) => (
                  <div key={project.id} className="project-card-reveal">
                    <Card3DTilt maxTilt={6} className="h-full group">
                      <div
                        className="glass-card p-5 sm:p-6 h-full flex flex-col cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
                        aria-label={`View details for ${project.title}`}
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="chip">{project.category}</span>
                            <span className="type-meta">{project.year}</span>
                          </div>
                          <ArrowUpRight size={16} className="text-ink-3 transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>

                        {/* Content */}
                        <h3 className="type-title text-ink mb-1.5 group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="type-meta italic mb-3">{project.tagline}</p>
                        <p className="type-body-sm flex-1 mb-4 line-clamp-3">{project.description}</p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.slice(0, 5).map((tech) => (
                            <span key={tech} className="chip text-[10px]">{tech}</span>
                          ))}
                          {project.technologies.length > 5 && (
                            <span className="chip text-[10px]">+{project.technologies.length - 5}</span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-3 border-t border-line">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                            className="btn-sm btn-outline flex-1 cursor-pointer"
                          >
                            Case Study
                          </button>
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="btn-icon"
                              aria-label="View source code"
                            >
                              <Github size={15} />
                            </a>
                          )}
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="btn-icon"
                              aria-label="View live demo"
                            >
                              <ExternalLink size={15} />
                            </a>
                          )}
                        </div>
                      </div>
                    </Card3DTilt>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Index View */}
        {viewMode === 'index' && filteredProjects.length > 0 && (
          <div ref={cardsRef} className="glass-card-static overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 px-5 py-3 border-b border-line type-eyebrow">
              <div className="col-span-1">Year</div>
              <div className="col-span-4 sm:col-span-5">Project</div>
              <div className="col-span-3 hidden sm:block">Category</div>
              <div className="col-span-3 hidden sm:block">Stack</div>
              <div className="col-span-1" />
            </div>
            {/* Rows */}
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="project-card-reveal grid grid-cols-12 px-5 py-4 items-center border-b border-line last:border-b-0 cursor-pointer transition-colors duration-200 hover:bg-surface-2 group"
                onClick={() => setSelectedProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
              >
                <div className="col-span-1 type-meta">{project.year}</div>
                <div className="col-span-9 sm:col-span-5">
                  <div className="type-label group-hover:text-accent transition-colors duration-200">{project.title}</div>
                  <div className="type-meta mt-0.5 sm:hidden">{project.category}</div>
                </div>
                <div className="col-span-3 hidden sm:block type-body-sm">{project.category}</div>
                <div className="col-span-3 hidden sm:flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((t) => (
                    <span key={t} className="chip text-[10px]">{t}</span>
                  ))}
                </div>
                <div className="col-span-2 sm:col-span-1 flex justify-end">
                  <ArrowUpRight size={16} className="text-ink-3 group-hover:text-accent transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}

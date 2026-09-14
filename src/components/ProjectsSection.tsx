import React, { useState, useMemo } from 'react';
import { 
  FolderGit2, 
  Search, 
  ExternalLink, 
  Github, 
  ArrowUpRight, 
  Code2, 
  Activity,
  LayoutGrid,
  ListFilter,
  Cpu,
  Layers
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

  return (
    <section 
      id="projects" 
      className="py-20 md:py-28 border-t border-[#E5DFD6] relative overflow-hidden text-left"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Editorial Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E5DFD6]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#C88A58] tracking-wider uppercase font-medium">
              [ 02 / SELECTED ARCHITECTURES ]
            </span>
            <span className="text-xs font-mono text-[#80776C] hidden sm:inline">
              FULL-STACK APPS & APPLIED AI
            </span>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-[#ECE7DF] p-1 rounded-lg border border-[#DFD8CC]">
            <button
              onClick={() => setViewMode('grid')}
              id="projects-view-grid-btn"
              title="Grid Case Study View"
              aria-label="Grid View"
              className={`p-1.5 rounded-md text-xs font-sans transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-[#FFFFFF] text-[#161514] font-medium shadow-xs'
                  : 'text-[#6E675E] hover:text-[#161514]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="text-xs font-mono hidden sm:inline">Cards</span>
            </button>
            <button
              onClick={() => setViewMode('index')}
              id="projects-view-index-btn"
              title="Tabular Index View"
              aria-label="Index View"
              className={`p-1.5 rounded-md text-xs font-sans transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'index'
                  ? 'bg-[#FFFFFF] text-[#161514] font-medium shadow-xs'
                  : 'text-[#6E675E] hover:text-[#161514]'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span className="text-xs font-mono hidden sm:inline">Index</span>
            </button>
          </div>
        </div>

        {/* Section Title & Search */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div className="max-w-xl space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#161514] tracking-tight">
              Featured Projects & Case Studies
            </h2>
            <p className="text-sm text-[#5C564D] font-sans">
              Full-stack web applications, GraphRAG knowledge engines, and production AI/LLM systems.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#80776C]" />
            <input
              type="text"
              id="project-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-9 pr-4 py-2 rounded-lg text-xs font-sans bg-[#FFFFFF] border border-[#E5DFD6] text-[#161514] placeholder-[#80776C] focus:outline-hidden focus:border-[#C88A58] transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-sans text-[#6E675E] hover:text-[#161514] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              id={`filter-category-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                selectedCategory === category
                  ? 'bg-[#161514] text-[#FAF8F5] font-medium shadow-xs border border-[#161514]'
                  : 'bg-[#FFFFFF] text-[#5C564D] hover:text-[#161514] border border-[#E5DFD6] hover:border-[#C8BFB2]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center rounded-xl bg-[#FFFFFF] border border-[#E5DFD6] shadow-2xs">
            <Code2 className="w-8 h-8 mx-auto text-[#80776C] mb-2" />
            <h3 className="font-serif text-base text-[#161514]">No projects match query</h3>
            <p className="text-xs text-[#6E675E] mt-1 max-w-sm mx-auto font-sans">
              No matching records found for "{searchQuery}" in "{selectedCategory}".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-3.5 py-1.5 rounded-lg text-xs font-sans text-[#FAF8F5] bg-[#161514] hover:bg-[#2C2925] cursor-pointer shadow-xs"
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
                className="rounded-2xl bg-[#FFFFFF] border border-[#E5DFD6] hover:border-[#C8BFB2] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
              >
                <div className="p-7 sm:p-9 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
                  
                  {/* Left 7 cols: Story & Specs */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono text-[#B86B35] bg-[#FAF7F2] border border-[#E5DFD6] font-semibold">
                        Featured Project
                      </span>
                      <span className="text-xs font-mono text-[#6E675E]">
                        {heroProject.year} • {heroProject.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#161514] font-normal tracking-tight">
                      {heroProject.title}
                    </h3>

                    <p className="font-mono text-xs text-[#B86B35] font-medium">
                      {heroProject.tagline}
                    </p>

                    <p className="text-sm text-[#4A453E] leading-relaxed max-w-xl font-sans">
                      {heroProject.description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {heroProject.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-xs font-mono text-[#2E2A25] bg-[#FAF7F2] border border-[#E5DFD6]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setActiveModalProject(heroProject)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#161514] hover:bg-[#2C2925] text-[#FAF8F5] font-sans font-medium text-xs transition-colors cursor-pointer shadow-xs"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      {heroProject.demoUrl && (
                        <a
                          href={heroProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#FAF7F2] hover:bg-[#EBE6DC] text-[#2E2A25] hover:text-[#161514] font-sans text-xs border border-[#E5DFD6] transition-colors"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {heroProject.githubUrl && (
                        <a
                          href={heroProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub Source"
                          className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#EBE6DC] text-[#6E675E] hover:text-[#161514] border border-[#E5DFD6] transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right 5 cols: Telemetry & SLA Benchmarks */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E5DFD6] space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between text-xs font-mono text-[#6E675E] pb-2 border-b border-[#E5DFD6]">
                        <span className="flex items-center gap-1.5 text-[#C88A58] font-semibold">
                          <Activity className="w-3.5 h-3.5" />
                          PROJECT HIGHLIGHTS
                        </span>
                        <span className="text-[#6E675E]">AT A GLANCE</span>
                      </div>

                      {heroProject.metrics && heroProject.metrics.map((m, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E5DFD6] shadow-2xs">
                          <span className="text-xs text-[#5C564D] font-sans">{m.label}</span>
                          <span className="font-mono text-sm text-[#161514] font-medium">{m.value}</span>
                        </div>
                      ))}

                      <div className="pt-1 flex items-center justify-between text-[11px] text-[#80776C] font-mono">
                        <span>Production Deployed</span>
                        <span>CI/CD Backed</span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* 2. Secondary Systems Grid with 3D Tilt */}
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
                      className="h-full rounded-xl bg-[#FFFFFF] border border-[#E5DFD6] hover:border-[#C8BFB2] transition-all duration-300 shadow-2xs hover:shadow-sm"
                    >
                      <div 
                        id={`project-card-${project.id}`}
                        className="h-full flex flex-col justify-between p-6 cursor-pointer text-left group"
                        onClick={() => setActiveModalProject(project)}
                      >
                        <div>
                          {/* Card Header Top */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-[#B86B35] bg-[#FAF7F2] border border-[#E5DFD6] font-semibold">
                              {project.category}
                            </span>
                            <span className="text-[11px] font-mono text-[#80776C]">{project.year}</span>
                          </div>

                          {/* Project Title */}
                          <h3 className="font-serif text-xl text-[#161514] group-hover:text-[#C88A58] transition-colors tracking-tight font-normal">
                            {project.title}
                          </h3>

                          {/* Tagline */}
                          <p className="text-xs font-mono text-[#6E675E] mt-1 mb-2.5">
                            {project.tagline}
                          </p>

                          {/* Description */}
                          <p className="text-xs text-[#4A453E] leading-relaxed line-clamp-3 mb-4 font-sans">
                            {project.description}
                          </p>

                          {/* Quick Metric */}
                          {project.metrics && project.metrics.length > 0 && (
                            <div className="mb-4 p-2 rounded-lg bg-[#FAF7F2] border border-[#E5DFD6] flex items-center justify-between text-xs">
                              <span className="text-[#6E675E] font-sans text-[11px]">{project.metrics[0].label}:</span>
                              <span className="text-[#161514] font-mono text-xs font-medium">
                                {project.metrics[0].value}
                              </span>
                            </div>
                          )}

                          {/* Technology Pills */}
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {project.technologies.slice(0, 4).map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#FAF7F2] text-[#2E2A25] border border-[#E5DFD6]"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-[#80776C]">
                                +{project.technologies.length - 4}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Actions Footer */}
                        <div className="pt-3 border-t border-[#E5DFD6] flex items-center justify-between gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveModalProject(project);
                            }}
                            id={`view-details-${project.id}`}
                            className="inline-flex items-center gap-1 text-xs font-sans font-medium text-[#C88A58] hover:text-[#A85B25] transition-colors cursor-pointer"
                          >
                            <span>Inspect Specs</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                id={`project-card-github-${project.id}`}
                                aria-label={`GitHub repo for ${project.title}`}
                                className="p-1.5 rounded-md text-[#6E675E] hover:text-[#161514] transition-colors"
                              >
                                <Github className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                id={`project-card-demo-${project.id}`}
                                aria-label={`Live demo for ${project.title}`}
                                className="p-1.5 rounded-md text-[#6E675E] hover:text-[#161514] transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
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
          /* Tabular Index View (inspired by by-kin.com) */
          <div className="rounded-xl bg-[#FFFFFF] border border-[#E5DFD6] overflow-hidden shadow-2xs">
            <div className="grid grid-cols-12 px-5 py-3 border-b border-[#E5DFD6] bg-[#FAF7F2] text-[11px] font-mono text-[#80776C] uppercase tracking-wider font-medium">
              <div className="col-span-1">Year</div>
              <div className="col-span-4 sm:col-span-3">Project Name</div>
              <div className="col-span-3 hidden sm:block">Category</div>
              <div className="col-span-5 sm:col-span-4">Primary Stack</div>
              <div className="col-span-2 sm:col-span-1 text-right">Inspect</div>
            </div>

            <div className="divide-y divide-[#E5DFD6]">
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  onClick={() => setActiveModalProject(project)}
                  className="grid grid-cols-12 px-5 py-4 items-center text-xs hover:bg-[#FAF7F2] transition-colors cursor-pointer group"
                >
                  <div className="col-span-1 font-mono text-[#80776C]">
                    {project.year}
                  </div>
                  <div className="col-span-4 sm:col-span-3 font-serif text-sm text-[#161514] font-medium group-hover:text-[#C88A58] transition-colors">
                    {project.title}
                  </div>
                  <div className="col-span-3 hidden sm:block font-mono text-xs text-[#5C564D]">
                    {project.category}
                  </div>
                  <div className="col-span-5 sm:col-span-4 flex flex-wrap gap-1 font-mono text-[11px] text-[#4A453E]">
                    {project.technologies.slice(0, 3).join(' • ')}
                  </div>
                  <div className="col-span-2 sm:col-span-1 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalProject(project);
                      }}
                      className="p-1 text-[#6E675E] group-hover:text-[#C88A58] transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
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

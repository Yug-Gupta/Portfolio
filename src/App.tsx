import React, { useState, useEffect } from 'react';
import { 
  defaultProfile, 
  defaultProjects, 
  defaultSkillCategories, 
  defaultExperiences, 
  defaultEducations 
} from './data/portfolioData';
import { UserProfile, Project, SkillCategory, Experience, Education } from './types';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Biography } from './components/Biography';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const profile: UserProfile = defaultProfile;

  const [projects] = useState<Project[]>(defaultProjects);
  const [skillCategories] = useState<SkillCategory[]>(defaultSkillCategories);
  const [experiences] = useState<Experience[]>(defaultExperiences);
  const [educations] = useState<Education[]>(defaultEducations);

  // Modals state
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Active section tracking
  const [activeSection, setActiveSection] = useState('hero');

  // Section observer to highlight active nav links
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen bg-canvas text-ink selection:bg-accent/20 selection:text-ink">
      
      {/* Top Fixed Navigation Bar */}
      <Navbar
        profile={profile}
        onOpenResume={() => setIsResumeOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Sections */}
      <main id="main-content" className="relative z-10">
        {/* 1. Hero & Introduction with 3D Holographic Core & CLI / Topology */}
        <Hero
          profile={profile}
          projects={projects}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => {
            const el = document.getElementById('contact');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Biography & Engineering Principles */}
        <Biography
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 3. Projects Showcase */}
        <ProjectsSection
          projects={projects}
        />

        {/* 4. Skills & Competencies */}
        <SkillsSection
          categories={skillCategories}
        />

        {/* 5. Career Experience & Timeline */}
        <ExperienceSection
          experiences={experiences}
          educations={educations}
        />

        {/* 6. Contact Section & Links */}
        <ContactSection
          profile={profile}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
      />

      {/* Interactive Resume View/Print Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
        experiences={experiences}
        educations={educations}
        skillCategories={skillCategories}
      />

    </div>
    </MotionConfig>
  );
}



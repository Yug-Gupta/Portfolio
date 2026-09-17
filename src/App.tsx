import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import {
  defaultEducations,
  defaultExperiences,
  defaultProfile,
  defaultProjects,
  defaultSkillCategories,
} from './data/portfolioData';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

const SECTION_IDS = ['top', 'about', 'projects', 'skills', 'experience', 'contact'];

export default function App() {
  const { theme, toggle } = useTheme();
  const activeSection = useScrollSpy(SECTION_IDS);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-canvas text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
        >
          Skip to content
        </a>

        <Navbar
          profile={defaultProfile}
          theme={theme}
          onToggleTheme={toggle}
          onOpenResume={() => setResumeOpen(true)}
          activeSection={activeSection}
        />

        <main id="main-content">
          <Hero profile={defaultProfile} onOpenResume={() => setResumeOpen(true)} />
          <AboutSection profile={defaultProfile} onOpenResume={() => setResumeOpen(true)} />
          <ProjectsSection projects={defaultProjects} />
          <SkillsSection categories={defaultSkillCategories} />
          <ExperienceSection
            experiences={defaultExperiences}
            educations={defaultEducations}
            profile={defaultProfile}
          />
          <ContactSection profile={defaultProfile} onOpenResume={() => setResumeOpen(true)} />
        </main>

        <Footer profile={defaultProfile} onOpenResume={() => setResumeOpen(true)} />

        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
          profile={defaultProfile}
          experiences={defaultExperiences}
          educations={defaultEducations}
          skillCategories={defaultSkillCategories}
        />
      </div>
    </MotionConfig>
  );
}

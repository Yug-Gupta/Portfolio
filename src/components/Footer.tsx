import React from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  ArrowUp
} from 'lucide-react';
import { UserProfile } from '../types';

interface FooterProps {
  profile: UserProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="main-footer"
      className="border-t border-[#E5DFD6] bg-[#FAF7F2] py-12 text-left relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#E5DFD6]">
          
          {/* Brand & Brief */}
          <div className="space-y-1.5 max-w-sm">
            <span className="font-serif text-base text-ink">
              {profile.name}
            </span>
            <p className="type-body-sm">
              {profile.title}. Building full-stack products with applied AI and cloud-native tooling.
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-6 text-sm font-sans text-muted">
            <a href="#about" className="hover:text-ink transition-colors">About</a>
            <a href="#projects" className="hover:text-ink transition-colors">Projects</a>
            <a href="#skills" className="hover:text-ink transition-colors">Skills</a>
            <a href="#experience" className="hover:text-ink transition-colors">Experience</a>
            <a href="#contact" className="hover:text-ink transition-colors">Contact</a>
          </nav>

          {/* Social Profiles */}
          <div className="flex items-center gap-2">
            {profile.socialLinks.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="btn btn-icon btn-outline"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {profile.socialLinks.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="btn btn-icon btn-outline"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {profile.socialLinks.twitter && (
              <a
                href={profile.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="btn btn-icon btn-outline"
              >
                <Twitter className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>

        </div>

        {/* Bottom bar: copyright + back-to-top kept separate from social links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-x-3 gap-y-1 type-meta text-center sm:text-left">
            <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
            <span className="hidden sm:inline text-faint" aria-hidden="true">•</span>
            <span>Built with React, Vite & Tailwind CSS</span>
          </div>
          <button
            onClick={scrollToTop}
            id="back-to-top-btn"
            className="btn btn-sm btn-outline"
          >
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to top</span>
          </button>
        </div>

      </div>
    </footer>
  );
};

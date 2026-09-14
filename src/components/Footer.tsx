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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#E5DFD6]">
          
          {/* Brand & Brief */}
          <div className="space-y-1.5 max-w-sm">
            <span className="font-serif text-lg text-[#161514]">
              {profile.name}
            </span>
            <p className="text-xs text-[#5C564D] font-sans">
              {profile.title}. Building full-stack products with applied AI and cloud-native tooling.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-sans text-[#5C564D]">
            <a href="#about" className="hover:text-[#161514] transition-colors">About</a>
            <a href="#projects" className="hover:text-[#161514] transition-colors">Projects</a>
            <a href="#skills" className="hover:text-[#161514] transition-colors">Skills</a>
            <a href="#experience" className="hover:text-[#161514] transition-colors">Experience</a>
            <a href="#contact" className="hover:text-[#161514] transition-colors">Contact</a>
          </div>

          {/* Social Profiles & Scroll To Top */}
          <div className="flex items-center gap-2">
            {profile.socialLinks.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg text-[#5C564D] hover:text-[#161514] bg-[#FFFFFF] hover:bg-[#EBE6DC] border border-[#E5DFD6] transition-colors shadow-2xs"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {profile.socialLinks.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg text-[#5C564D] hover:text-[#161514] bg-[#FFFFFF] hover:bg-[#EBE6DC] border border-[#E5DFD6] transition-colors shadow-2xs"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
            {profile.socialLinks.twitter && (
              <a
                href={profile.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="p-2 rounded-lg text-[#5C564D] hover:text-[#161514] bg-[#FFFFFF] hover:bg-[#EBE6DC] border border-[#E5DFD6] transition-colors shadow-2xs"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={scrollToTop}
              id="back-to-top-btn"
              title="Back to top"
              aria-label="Back to top"
              className="p-2 ml-2 rounded-lg bg-[#FFFFFF] hover:bg-[#EBE6DC] text-[#5C564D] hover:text-[#161514] border border-[#E5DFD6] transition-colors cursor-pointer shadow-2xs"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#80776C] font-mono">
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>
          <div>
            Designed with restraint & typographic precision
          </div>
        </div>

      </div>
    </footer>
  );
};

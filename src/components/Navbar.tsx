import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  FileText
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  profile: UserProfile;
  onOpenResume: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenResume,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F6F3EE]/90 backdrop-blur-md border-b border-[#E5DFD6] shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Brand */}
          <a 
            href="#hero" 
            id="brand-logo-link"
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-md bg-chip border border-[#DDD6CA] flex items-center justify-center text-ink font-serif font-medium text-sm transition-colors group-hover:border-accent">
              {profile.name.split(' ').map(n => n[0]).join('') || 'YG'}
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-base text-ink tracking-tight group-hover:text-accent transition-colors">
                {profile.name}
              </span>
              <span className="type-label hidden sm:inline-block">
                {profile.title}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1 bg-chip px-2 py-1 rounded-full border border-[#DFD8CC]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3.5 py-1 rounded-full text-sm font-sans transition-colors duration-200 ${
                    isActive
                      ? 'bg-surface text-ink font-medium shadow-xs'
                      : 'text-muted hover:text-ink hover:bg-[#F3EFE8]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              id="view-resume-btn"
              className="btn btn-sm btn-secondary"
            >
              <FileText className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span>View Resume</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              className="md:hidden btn btn-icon btn-secondary"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-menu"
          className="md:hidden bg-[#FAF7F2] border-b border-[#E5DFD6] px-4 pt-2 pb-5 space-y-1 shadow-lg"
        >
          <div className="space-y-1 pt-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? 'bg-chip text-ink font-medium'
                      : 'text-muted hover:bg-chip hover:text-ink'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

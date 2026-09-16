import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  profile: UserProfile;
  onOpenResume: () => void;
  activeSection: string;
}

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const;

export function Navbar({ profile, onOpenResume, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const handleNavClick = useCallback((id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-2 sm:py-3'
            : 'py-3 sm:py-5'
        }`}
      >
        <div className="container-wide">
          <nav
            className={`flex items-center justify-between h-12 sm:h-14 px-4 sm:px-6 rounded-2xl transition-all duration-500 ${
              isScrolled
                ? 'bg-surface/80 backdrop-blur-xl border border-[rgba(255,255,255,0.06)] shadow-lg'
                : 'bg-transparent'
            }`}
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Brand */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/20 flex items-center justify-center font-mono text-xs font-bold text-accent transition-all duration-300 group-hover:bg-accent/25 group-hover:border-accent/30 group-hover:shadow-[0_0_16px_rgba(212,145,90,0.2)]">
                YG
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-ink leading-none tracking-tight">{profile.name.split(' ')[0]}</div>
                <div className="text-[10px] font-mono text-ink-3 mt-0.5">Developer</div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-surface/50 border border-[rgba(255,255,255,0.04)]">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer ${
                    activeSection === link.id
                      ? 'text-accent bg-accent/10'
                      : 'text-ink-3 hover:text-ink-2 hover:bg-[rgba(255,255,255,0.04)]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenResume}
                className="hidden sm:inline-flex btn-sm btn-outline cursor-pointer"
              >
                Resume
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden btn-icon cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-canvas/80 backdrop-blur-xl"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="relative z-10 flex flex-col h-full pt-20 pb-8 px-6">
            <nav className="flex-1 flex flex-col items-start gap-1">
              {NAV_LINKS.map((link, idx) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-lg font-medium transition-all duration-300 cursor-pointer ${
                    activeSection === link.id
                      ? 'text-accent bg-accent/10'
                      : 'text-ink-2 hover:text-ink hover:bg-surface-2'
                  }`}
                  style={{
                    animationDelay: `${idx * 50}ms`,
                    animation: 'fadeInUp 0.4s ease forwards',
                    opacity: 0,
                  }}
                >
                  <span className="font-mono text-xs text-ink-3 mr-3">0{idx + 1}</span>
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="pt-6 border-t border-line space-y-3" style={{ animation: 'fadeInUp 0.4s ease 0.3s forwards', opacity: 0 }}>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenResume(); }}
                className="btn-md btn-primary w-full cursor-pointer"
              >
                View Resume
              </button>
              <p className="type-meta text-center">
                {profile.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Keyframe for mobile menu animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

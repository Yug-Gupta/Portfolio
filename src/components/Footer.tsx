import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter } from 'lucide-react';
import { UserProfile } from '../types';

interface FooterProps {
  profile: UserProfile;
}

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export function Footer({ profile }: FooterProps) {
  const socialLinks = [
    { icon: <Github size={16} />, url: profile.socialLinks.github, label: 'GitHub' },
    { icon: <Linkedin size={16} />, url: profile.socialLinks.linkedin, label: 'LinkedIn' },
    { icon: <Twitter size={16} />, url: profile.socialLinks.twitter, label: 'Twitter' },
  ].filter((l) => l.url);

  return (
    <footer id="main-footer" className="border-t border-line py-10 sm:py-12 relative overflow-hidden">
      <div className="container-wide">
        {/* Upper row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-line">
          {/* Brand */}
          <div>
            <div className="font-serif text-lg font-medium text-ink tracking-tight">{profile.name}</div>
            <div className="type-body-sm mt-0.5">{profile.title}</div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-4 flex-wrap" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="type-body-sm hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-1.5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Lower row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="type-meta">
            © {new Date().getFullYear()} {profile.name}. Built with React, Three.js & Tailwind CSS.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-sm btn-ghost group cursor-pointer"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

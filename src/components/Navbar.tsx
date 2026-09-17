import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import type { UserProfile } from '../types';
import type { Theme } from '../hooks/useTheme';
import { ThemeToggle } from './ThemeToggle';

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const;

interface NavbarProps {
  profile: UserProfile;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenResume: () => void;
  activeSection: string;
}

export function Navbar({
  profile,
  theme,
  onToggleTheme,
  onOpenResume,
  activeSection,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    menuRef.current?.querySelector<HTMLElement>('button')?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const goTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled ? 'border-b border-line bg-canvas/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className="shell">
          <nav className="flex h-16 items-center justify-between gap-6" aria-label="Primary">
            {/* Wordmark */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex shrink-0 items-baseline gap-2.5"
              aria-label="Yug Gupta — back to top"
            >
              <span className="font-display text-[0.95rem] font-semibold tracking-tight text-ink">
                {profile.name}
              </span>
              <span className="hidden font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-3 transition-colors group-hover:text-accent sm:inline">
                Full-Stack · AI
              </span>
            </a>

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => {
                const active = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => goTo(link.id)}
                      aria-current={active ? 'true' : undefined}
                      className={`relative rounded-md px-3 py-2 text-[0.8125rem] transition-colors ${
                        active ? 'text-ink' : 'text-ink-2 hover:text-ink'
                      }`}
                    >
                      {link.label}
                      {active && !reduce && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-2 -bottom-px h-px bg-accent"
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                      {active && reduce && (
                        <span className="absolute inset-x-2 -bottom-px h-px bg-accent" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              <button
                type="button"
                onClick={onOpenResume}
                className="btn btn-sm btn-outline hidden sm:inline-flex"
              >
                Résumé
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="grid h-9 w-9 place-items-center rounded-md border border-line text-ink-2 transition-colors hover:border-line-strong hover:text-ink md:hidden"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <Menu size={17} aria-hidden="true" />
              </button>
            </div>
          </nav>
        </div>

        {/* Scroll progress */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="h-px origin-left bg-accent"
        />
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-canvas md:hidden"
          >
            <div className="shell flex h-16 items-center justify-between">
              <span className="font-display text-[0.95rem] font-semibold text-ink">{profile.name}</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-md border border-line text-ink-2 transition-colors hover:text-ink"
                aria-label="Close menu"
              >
                <X size={17} aria-hidden="true" />
              </button>
            </div>

            <nav className="shell flex flex-1 flex-col justify-center pb-16" aria-label="Mobile">
              <ul className="rule">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <button
                      type="button"
                      onClick={() => goTo(link.id)}
                      className="group flex w-full items-center justify-between py-5 text-left"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-[0.6875rem] text-ink-3">
                          0{i + 1}
                        </span>
                        <span className="font-display text-3xl font-medium tracking-tight text-ink transition-colors group-hover:text-accent">
                          {link.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={20}
                        className="text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        aria-hidden="true"
                      />
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenResume();
                  }}
                  className="btn btn-lg btn-primary w-full"
                >
                  View Résumé
                </button>
                <a href={`mailto:${profile.email}`} className="t-mono text-center text-ink-3">
                  {profile.email}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import type { UserProfile } from '../types';
import { NAV_LINKS } from './Navbar';

interface FooterProps {
  profile: UserProfile;
  onOpenResume: () => void;
}

export function Footer({ profile, onOpenResume }: FooterProps) {
  const socials = [
    { label: 'GitHub', href: profile.socialLinks.github, Icon: Github },
    { label: 'LinkedIn', href: profile.socialLinks.linkedin, Icon: Linkedin },
    { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
  ].filter((s): s is { label: string; href: string; Icon: typeof Github } => Boolean(s.href));

  const goTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <footer className="rule mt-8">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Identity */}
          <div className="lg:col-span-6">
            <p className="font-display text-2xl font-medium tracking-tight text-ink">
              {profile.name}
            </p>
            <p className="t-small mt-2 max-w-sm">{profile.title}</p>
            <p className="t-mono mt-6 text-[0.6875rem] text-ink-3">{profile.location}</p>
          </div>

          {/* Navigate */}
          <nav className="lg:col-span-3" aria-label="Footer">
            <h2 className="t-label">Navigate</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => goTo(link.id)}
                    className="link text-[0.8125rem] text-ink-2"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere */}
          <div className="lg:col-span-3">
            <h2 className="t-label">Elsewhere</h2>
            <ul className="mt-4 space-y-2.5">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="link-mono text-ink-2"
                  >
                    <Icon size={13} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <button type="button" onClick={onOpenResume} className="link-mono text-ink-2">
                  Résumé
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule mt-12 flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-mono text-[0.6875rem] text-ink-3">
            © {new Date().getFullYear()} {profile.name}. Built with React, Vite &amp; Tailwind.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="link-mono text-ink-3"
          >
            Back to top
            <ArrowUp size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}

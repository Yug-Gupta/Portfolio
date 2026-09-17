import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import type { UserProfile } from '../types';
import { ProfileConsole } from './ProfileConsole';

interface HeroProps {
  profile: UserProfile;
  onOpenResume: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero({ profile, onOpenResume }: HeroProps) {
  const reduce = useReducedMotion();

  const socials = [
    { label: 'GitHub', href: profile.socialLinks.github, Icon: Github },
    { label: 'LinkedIn', href: profile.socialLinks.linkedin, Icon: Linkedin },
    { label: 'Email', href: profile.socialLinks.email, Icon: Mail },
  ].filter((s): s is { label: string; href: string; Icon: typeof Github } => Boolean(s.href));

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40">
      {/* Technical grid backdrop */}
      <div
        aria-hidden="true"
        className="hairline-grid pointer-events-none absolute inset-0"
        style={{
          maskImage: 'radial-gradient(120% 80% at 50% 0%, #000 0%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(120% 80% at 50% 0%, #000 0%, transparent 72%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-canvas to-transparent"
      />

      <div className="shell relative">
        <motion.div
          variants={group}
          initial={reduce ? false : 'hidden'}
          animate="show"
          className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12"
        >
          {/* Narrative */}
          <div className="min-w-0 lg:col-span-7">
            <motion.div variants={item} className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="font-display text-lg font-semibold tracking-tight text-ink">
                {profile.name}
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
              <span className="t-label">{profile.title}</span>
            </motion.div>

            <motion.h1 variants={item} className="t-display mt-6 text-ink">
              I build <span className="text-accent">production</span> web systems and{' '}
              <span className="text-accent">GraphRAG</span> AI.
            </motion.h1>

            <motion.p variants={item} className="t-lead measure mt-7">
              I design and engineer full-stack platforms and LLM-powered systems — JWT-secured REST
              APIs, MongoDB data models, and Neo4j knowledge graphs that answer questions with
              verifiable evidence.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-lg btn-primary group"
              >
                View selected work
                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <button type="button" onClick={onOpenResume} className="btn btn-lg btn-outline">
                Résumé
              </button>

              <div className="ml-1 flex items-center gap-1">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="grid h-10 w-10 place-items-center rounded-md text-ink-2 transition-colors hover:bg-surface-2 hover:text-accent"
                    aria-label={label}
                  >
                    <Icon size={17} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Console */}
          <motion.div variants={item} className="relative min-w-0 lg:col-span-5">
            <div
              aria-hidden="true"
              className="dot-field pointer-events-none absolute -inset-6 opacity-60"
              style={{
                maskImage: 'radial-gradient(70% 70% at 50% 50%, #000, transparent)',
                WebkitMaskImage: 'radial-gradient(70% 70% at 50% 50%, #000, transparent)',
              }}
            />
            <ProfileConsole profile={profile} />
            <p className="t-mono mt-3 flex items-center gap-2 text-[0.6875rem] text-ink-3">
              <ArrowUpRight size={12} aria-hidden="true" />
              Interactive — switch between config and stack
            </p>
          </motion.div>
        </motion.div>

        {/* Proof line */}
        <motion.p
          variants={item}
          initial={reduce ? false : 'hidden'}
          animate="show"
          className="rule mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 pt-5 md:mt-20"
        >
          {profile.credentials.map((credential, i) => (
            <span key={credential} className="t-mono flex items-center gap-3 text-[0.6875rem] text-ink-3">
              {i > 0 && <span aria-hidden="true" className="text-line-strong">·</span>}
              {credential}
            </span>
          ))}
        </motion.p>
      </div>
    </section>
  );
}

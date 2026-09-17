import { useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Terminal } from 'lucide-react';
import type { UserProfile } from '../types';
import { useLocalTime } from '../hooks/useLocalTime';

const STACK_ROWS = [
  { key: 'role', value: 'Full-Stack & AI/LLM Engineer' },
  { key: 'base', value: 'Ghaziabad, India' },
  { key: 'focus', value: 'GraphRAG · Web Platforms · DSA' },
  { key: 'client', value: 'React · Vite · Zustand · Tailwind' },
  { key: 'server', value: 'Node · Express · REST · JWT' },
  { key: 'data', value: 'MongoDB · Neo4j · PostgreSQL' },
  { key: 'cloud', value: 'AWS · Docker · GitHub Actions' },
];

type Tab = 'profile' | 'stack';

export function ProfileConsole({ profile }: { profile: UserProfile }) {
  const [tab, setTab] = useState<Tab>('profile');
  const time = useLocalTime();
  const reduce = useReducedMotion();

  return (
    <div className="window relative">
      {/* Title bar */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <Terminal size={14} className="shrink-0 text-accent" aria-hidden="true" />
          <span className="t-mono truncate text-[0.6875rem] text-ink-3">
            {tab === 'profile' ? 'yug.config.ts' : 'service.manifest'}
          </span>
        </div>

        <div className="seg shrink-0">
          <button
            type="button"
            aria-pressed={tab === 'profile'}
            data-active={tab === 'profile'}
            onClick={() => setTab('profile')}
            className="seg-item"
          >
            config
          </button>
          <button
            type="button"
            aria-pressed={tab === 'stack'}
            data-active={tab === 'stack'}
            onClick={() => setTab('stack')}
            className="seg-item"
          >
            stack
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="relative min-h-[17.5rem] p-4 sm:p-6">
        <AnimatePresence mode="wait" initial={false}>
          {tab === 'profile' ? (
            <motion.pre
              key="profile"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              tabIndex={0}
              className="t-mono overflow-x-auto text-[0.6875rem] leading-[1.9] sm:text-[0.8125rem] sm:leading-[1.85]"
              aria-label="Developer profile as code"
            >
              <code>
                <Muted>const</Muted> <Ink>yug</Ink> <Muted>=</Muted> <Muted>{'{'}</Muted>{'\n'}
                {'  '}<Key>role</Key><Muted>:</Muted> <Ink>&quot;full-stack &amp; ai/llm&quot;</Ink><Muted>,</Muted>{'\n'}
                {'  '}<Key>base</Key><Muted>:</Muted> <Ink>&quot;Ghaziabad, IN&quot;</Ink><Muted>,</Muted>{'\n'}
                {'  '}<Key>focus</Key><Muted>:</Muted> <Muted>[</Muted><Ink>&quot;GraphRAG&quot;</Ink><Muted>,</Muted> <Ink>&quot;web&quot;</Ink><Muted>,</Muted> <Ink>&quot;dsa&quot;</Ink><Muted>]</Muted><Muted>,</Muted>{'\n'}
                {'  '}<Key>stack</Key><Muted>:</Muted> <Muted>[</Muted><Ink>&quot;react&quot;</Ink><Muted>,</Muted> <Ink>&quot;node&quot;</Ink><Muted>,</Muted> <Ink>&quot;aws&quot;</Ink><Muted>]</Muted><Muted>,</Muted>{'\n'}
                {'  '}<Key>status</Key><Muted>:</Muted> <Accent>&quot;available for full-time&quot;</Accent><Muted>,</Muted>{'\n'}
                <Muted>{'}'}</Muted><Muted>;</Muted><Caret />
              </code>
            </motion.pre>
          ) : (
            <motion.dl
              key="stack"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="divide-y divide-line"
            >
              {STACK_ROWS.map((row) => (
                <div key={row.key} className="grid grid-cols-[5.5rem_1fr] gap-3 py-2.5">
                  <dt className="t-mono text-[0.6875rem] uppercase tracking-widest text-ink-3">
                    {row.key}
                  </dt>
                  <dd className="t-mono text-[0.8125rem] text-ink">{row.value}</dd>
                </div>
              ))}
            </motion.dl>
          )}
        </AnimatePresence>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between gap-4 border-t border-line bg-surface-2 px-4 py-2.5">
        <span className="t-mono flex items-center gap-2 text-[0.6875rem] text-ink-2">
          <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          {profile.availability}
        </span>
        <span className="t-mono shrink-0 text-[0.6875rem] text-ink-3">
          IST {time}
          <span className="hidden sm:inline"> · UTC+5:30</span>
        </span>
      </div>
    </div>
  );
}

function Key({ children }: { children: ReactNode }) {
  return <span className="text-ink-2">{children}</span>;
}

function Ink({ children }: { children: ReactNode }) {
  return <span className="text-ink">{children}</span>;
}

function Muted({ children }: { children: ReactNode }) {
  return <span className="text-ink-3">{children}</span>;
}

function Accent({ children }: { children: ReactNode }) {
  return <span className="text-accent">{children}</span>;
}

function Caret() {
  return (
    <span
      aria-hidden="true"
      className="ml-1 inline-block h-[1.05em] w-[0.5ch] translate-y-[0.18em] animate-pulse bg-accent"
    />
  );
}

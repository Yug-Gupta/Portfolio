import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Terminal } from 'lucide-react';
import type { UserProfile } from '../types';
import { useLocalTime } from '../hooks/useLocalTime';
import {
  buildStackTree,
  completeCommand,
  runCommand,
  type CommandApi,
  type TerminalLine,
  type TerminalView,
  type Tone,
} from '../terminal/commands';

const PROMPT = 'yug@portfolio:~$';

type Entry =
  | { id: number; kind: 'input'; text: string }
  | { id: number; kind: 'output' | 'system'; lines: TerminalLine[] };

const TONE_CLASS: Record<Tone, string> = {
  default: 'text-ink-2',
  strong: 'text-ink',
  muted: 'text-ink-3',
  accent: 'text-accent',
  ok: 'text-success',
  error: 'text-danger',
};

const FILENAME: Record<TerminalView, string> = {
  config: 'yug.config.ts',
  stack: 'service.manifest',
  output: 'yug@portfolio',
};

interface ProfileConsoleProps {
  profile: UserProfile;
  onOpenResume: () => void;
}

export function ProfileConsole({ profile, onOpenResume }: ProfileConsoleProps) {
  const [view, setView] = useState<TerminalView>('config');
  const [activated, setActivated] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [focused, setFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const entryId = useRef(0);

  const time = useLocalTime();
  const reduce = useReducedMotion();

  const scrollToSection = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({
        behavior: reduce ? 'auto' : 'smooth',
        block: 'start',
      });
    },
    [reduce]
  );

  const api: CommandApi = useMemo(
    () => ({
      onOpenResume,
      openExternal: (url: string) => window.open(url, '_blank', 'noopener,noreferrer'),
      scrollTo: scrollToSection,
    }),
    [onOpenResume, scrollToSection]
  );

  const focusInput = useCallback(() => {
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const activate = useCallback(() => {
    setActivated(true);
    setEntries((prev) =>
      prev.length > 0
        ? prev
        : [
            {
              id: (entryId.current += 1),
              kind: 'system',
              lines: [
                { text: 'yug-portfolio shell v1.0', tone: 'muted' },
                { text: "Type 'help' to see available commands.", tone: 'muted' },
              ],
            },
          ]
    );
    focusInput();
  }, [focusInput]);

  // Keep the newest output in view without moving the page.
  useEffect(() => {
    const el = logRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  }, [entries, view, reduce]);

  const execute = useCallback(
    (raw: string) => {
      const command = raw.trim();

      if (!command) {
        // Empty Enter returns to the terminal log (useful after config/stack).
        setView('output');
        return;
      }

      setHistory((prev) => (prev[prev.length - 1] === command ? prev : [...prev, command]));
      setHistoryIndex(-1);
      setValue('');

      const result = runCommand(command, api);

      if (result.clears) {
        setEntries([]);
        setView('output');
        return;
      }

      setEntries((prev) => [
        ...prev,
        { id: (entryId.current += 1), kind: 'input', text: command },
        ...(result.lines.length > 0
          ? [{ id: (entryId.current += 1), kind: 'output' as const, lines: result.lines }]
          : []),
      ]);
      setView(result.view ?? 'output');
    },
    [api]
  );

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      execute(value);
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (history.length === 0) return;
      const direction = event.key === 'ArrowUp' ? -1 : 1;
      const next = historyIndex === -1 ? history.length - 1 : historyIndex + direction;

      if (next < 0 || next >= history.length) {
        setHistoryIndex(-1);
        setValue('');
        return;
      }
      setHistoryIndex(next);
      setValue(history[next]);
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const completion = completeCommand(value);
      if (completion.matches.length > 1) {
        setEntries((prev) => [
          ...prev,
          {
            id: (entryId.current += 1),
            kind: 'output',
            lines: [{ text: completion.matches.join('   '), tone: 'muted' }],
          },
        ]);
        setView('output');
      }
      if (completion.value !== value) setValue(completion.value);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      if (value) {
        setValue('');
        return;
      }
      setActivated(false);
      inputRef.current?.blur();
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      setEntries([]);
      setView('output');
    }
  };

  const onBodyClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('a, button, input, textarea, select')) return;
    if (window.getSelection()?.toString()) return;
    if (!activated) {
      activate();
      return;
    }
    focusInput();
  };

  return (
    <div>
      <div className="window relative">
        {/* Title bar */}
        <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2 px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-3">
            <Terminal size={14} className="shrink-0 text-accent" aria-hidden="true" />
            <span className="t-mono truncate text-[0.6875rem] text-ink-3">{FILENAME[view]}</span>
          </div>

          <div className="seg shrink-0">
            <button
              type="button"
              aria-pressed={view === 'config'}
              data-active={view === 'config'}
              onClick={() => setView('config')}
              className="seg-item"
            >
              config
            </button>
            <button
              type="button"
              aria-pressed={view === 'stack'}
              data-active={view === 'stack'}
              onClick={() => setView('stack')}
              className="seg-item"
            >
              stack
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex h-[18rem] flex-col sm:h-[20rem] lg:h-[22rem]" onClick={onBodyClick}>
          <div
            ref={logRef}
            className="term-scroll flex-1 overflow-y-auto overscroll-contain"
            role={view === 'output' ? 'log' : undefined}
            aria-live={view === 'output' ? 'polite' : undefined}
            aria-relevant={view === 'output' ? 'additions' : undefined}
            aria-label={view === 'output' ? 'Terminal output' : undefined}
          >
            {view === 'output' ? (
              <div className="p-4 text-[0.75rem] leading-[1.7] sm:p-5 sm:text-[0.8125rem]">
                {entries.map((entry) => (
                  <OutputEntry
                    key={entry.id}
                    entry={entry}
                    reduce={Boolean(reduce)}
                    onScroll={scrollToSection}
                  />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                {view === 'config' ? (
                  <motion.div
                    key="config"
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <pre
                      tabIndex={0}
                      className="t-mono overflow-x-auto p-4 text-[0.6875rem] leading-[1.9] sm:p-5 sm:text-[0.8125rem] sm:leading-[1.85]"
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
                    </pre>
                  </motion.div>
                ) : (
                  <motion.pre
                    key="stack"
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="t-mono overflow-x-auto whitespace-pre p-4 text-[0.6875rem] leading-[1.75] sm:p-5 sm:text-xs sm:leading-[1.8]"
                    aria-label="Technology stack"
                  >
                    <StackTree />
                  </motion.pre>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Command input — appears once the terminal is activated */}
          {activated && (
            <div className="flex items-center gap-2 border-t border-line px-4 py-2.5 text-[0.75rem] sm:text-[0.8125rem]">
              <span className="t-mono shrink-0 text-accent">{PROMPT}</span>
              <span className="relative min-w-0 flex-1">
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  onKeyDown={onInputKeyDown}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  aria-label="Terminal command input"
                  placeholder="help"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  className="t-mono w-full bg-transparent text-ink caret-accent outline-none placeholder:text-ink-3/60"
                />
                {value === '' && !focused && (
                  <span
                    className="term-caret pointer-events-none absolute left-0 top-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  />
                )}
              </span>
            </div>
          )}
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

      {/* Interactive hint */}
      <button
        type="button"
        onClick={activate}
        className="t-mono mt-3 flex items-center gap-2 text-left text-[0.6875rem] text-ink-3 transition-colors hover:text-accent"
      >
        <ArrowUpRight size={12} aria-hidden="true" />
        {activated
          ? 'Type a command · ↑↓ history · Tab complete · Ctrl+L clear · Esc to exit'
          : "Interactive — click to run commands (try 'help')"}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Output                                                              */
/* ------------------------------------------------------------------ */
function OutputEntry({
  entry,
  reduce,
  onScroll,
}: {
  entry: Entry;
  reduce: boolean;
  onScroll: (id: string) => void;
}) {
  if (entry.kind === 'input') {
    return (
      <div className="term-line flex flex-wrap gap-2">
        <span className="t-mono shrink-0 text-accent">{PROMPT}</span>
        <span className="t-mono break-words text-ink">{entry.text}</span>
      </div>
    );
  }

  return (
    <div className="mt-2 space-y-0.5">
      {entry.lines.map((line, index) => (
        <div
          key={index}
          className="term-line t-mono whitespace-pre-wrap break-words"
          style={reduce ? undefined : { animationDelay: `${Math.min(index, 10) * 16}ms` }}
        >
          <LineView line={line} onScroll={onScroll} />
        </div>
      ))}
    </div>
  );
}

function LineView({ line, onScroll }: { line: TerminalLine; onScroll: (id: string) => void }) {
  const tone = TONE_CLASS[line.tone ?? 'default'];

  if (line.href) {
    return (
      <a
        href={line.href}
        target={line.href.startsWith('mailto:') ? undefined : '_blank'}
        rel={line.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
        className={`${tone} underline decoration-current underline-offset-2 hover:opacity-80`}
      >
        {line.text}
      </a>
    );
  }

  if (line.scrollTo) {
    const id = line.scrollTo;
    return (
      <button
        type="button"
        onClick={() => onScroll(id)}
        className={`${tone} text-left hover:underline hover:underline-offset-2`}
      >
        → {line.text}
      </button>
    );
  }

  return <span className={tone}>{line.text === '' ? '\u00A0' : line.text}</span>;
}

function StackTree() {
  return (
    <>
      {buildStackTree().map((line, index) => (
        <span key={index} className={TONE_CLASS[line.tone ?? 'default']}>
          {line.text === '' ? '\u00A0' : line.text}
          {'\n'}
        </span>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Config code primitives (unchanged visual language)                  */
/* ------------------------------------------------------------------ */
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

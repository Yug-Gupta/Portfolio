import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Activity, CornerDownLeft } from 'lucide-react';
import { UserProfile, Project } from '../types';

interface ArchitectureInspectorProps {
  profile: UserProfile;
  projects: Project[];
  onOpenContact: () => void;
  onOpenResume: () => void;
}

interface StackNode {
  name: string;
  role: string;
}

const stackNodes: StackNode[] = [
  { name: 'React web client', role: 'Component-driven UI' },
  { name: 'Express API', role: 'REST & JWT auth' },
  { name: 'MongoDB', role: 'Document storage' },
  { name: 'Neo4j', role: 'Knowledge graph' },
];

export const ArchitectureInspector: React.FC<ArchitectureInspectorProps> = ({
  profile,
  projects,
  onOpenContact,
  onOpenResume
}) => {
  const [activeTab, setActiveTab] = useState<'cluster' | 'terminal'>('cluster');
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<Array<{ type: 'in' | 'out' | 'system'; text: string }>>([
    { type: 'system', text: 'yug-portfolio-shell v1.0 [react • node • aws]' },
    { type: 'system', text: 'Type "help" for a list of available commands.' },
  ]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...logs, { type: 'in' as const, text: `$ ${inputVal}` }];

    if (cmd === 'help') {
      newLogs.push({
        type: 'out',
        text: 'Available commands:\n  • projects    - List projects & tech stacks\n  • whoami      - View developer summary & background\n  • stats       - Achievements & certification metrics\n  • resume      - Open resume\n  • contact     - Open direct message channel\n  • clear       - Clear terminal buffer'
      });
    } else if (cmd === 'projects') {
      const pList = projects.map(p => `  → [${p.year}] ${p.title} (${p.category}) - ${p.technologies.slice(0, 3).join(', ')}`).join('\n');
      newLogs.push({ type: 'out', text: `Projects:\n${pList}` });
    } else if (cmd === 'whoami') {
      newLogs.push({
        type: 'out',
        text: `${profile.name} — ${profile.title}\n${profile.location} • ${profile.availability}\n"${profile.tagline}"`
      });
    } else if (cmd === 'stats') {
      const statsList = profile.stats.map(s => `  • ${s.label}: ${s.value} (${s.description})`).join('\n');
      newLogs.push({ type: 'out', text: `Metrics:\n${statsList}` });
    } else if (cmd === 'resume') {
      newLogs.push({ type: 'out', text: 'Opening resume...' });
      onOpenResume();
    } else if (cmd === 'contact') {
      newLogs.push({ type: 'out', text: 'Opening contact section...' });
      onOpenContact();
    } else if (cmd === 'clear') {
      setLogs([]);
      setInputVal('');
      return;
    } else {
      newLogs.push({
        type: 'out',
        text: `Command not recognized: "${cmd}". Type "help" for valid commands.`
      });
    }

    setLogs(newLogs);
    setInputVal('');
  };

  return (
    <div className="w-full rounded-2xl bg-surface border border-line overflow-hidden text-left shadow-md">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-2 border-b border-line">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-ink-3/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-ink-3/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-ink-3/40" />
          </div>
          <span className="type-meta">yug-gupta-system</span>
        </div>

        {/* Mode Switch */}
        <div className="segmented" role="group" aria-label="Architecture view">
          <button
            type="button"
            onClick={() => setActiveTab('cluster')}
            aria-pressed={activeTab === 'cluster'}
            className={`segmented-item cursor-pointer ${activeTab === 'cluster' ? 'segmented-item-active' : ''}`}
          >
            Topology
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('terminal')}
            aria-pressed={activeTab === 'terminal'}
            className={`segmented-item cursor-pointer ${activeTab === 'terminal' ? 'segmented-item-active' : ''}`}
          >
            CLI
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 min-h-[260px] flex flex-col justify-between bg-surface-2">
        {activeTab === 'cluster' ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-ink-3 pb-2 border-b border-line">
              <span className="flex items-center gap-1.5 text-accent font-medium">
                <Activity className="w-3.5 h-3.5" aria-hidden="true" />
                Stack overview
              </span>
              <span className="text-ink-3">Representative architecture</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {stackNodes.map((node, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-surface border border-line space-y-1"
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono text-ink text-xs font-medium truncate">
                      {node.name}
                    </span>
                    <span className="text-xs font-mono text-accent font-semibold flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                      Active
                    </span>
                  </div>
                  <div className="type-meta">
                    {node.role}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between type-meta border-t border-line">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-accent" aria-hidden="true" />
                GitHub Actions CI
              </span>
              <span>Docker • AWS</span>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between space-y-3">
            <div className="font-mono text-xs space-y-1.5 max-h-[200px] overflow-y-auto pr-1" aria-live="polite">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`whitespace-pre-wrap ${
                    log.type === 'in'
                      ? 'text-accent font-semibold'
                      : log.type === 'system'
                      ? 'text-ink-3'
                      : 'text-ink-2'
                  }`}
                >
                  {log.text}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>

            {/* Input Line */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 border-t border-line">
              <span className="text-xs font-mono text-accent font-bold" aria-hidden="true">$</span>
              <label htmlFor="hero-cli-input" className="sr-only">Terminal command</label>
              <input
                type="text"
                id="hero-cli-input"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'help', 'projects', 'stats'..."
                className="flex-1 bg-transparent text-xs font-mono text-ink placeholder:text-ink-3 outline-none"
              />
              <button
                type="submit"
                aria-label="Run command"
                className="p-1 rounded text-ink-3 hover:text-ink hover:bg-surface-3 transition-colors cursor-pointer"
              >
                <CornerDownLeft className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

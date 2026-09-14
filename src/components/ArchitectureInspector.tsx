import React, { useState } from 'react';
import { Terminal, Cpu, Activity, Server, ArrowRight, CornerDownLeft, Sparkles, Check } from 'lucide-react';
import { UserProfile, Project } from '../types';

interface ArchitectureInspectorProps {
  profile: UserProfile;
  projects: Project[];
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const ArchitectureInspector: React.FC<ArchitectureInspectorProps> = ({
  profile,
  projects,
  onOpenContact,
  onOpenResume
}) => {
  const [activeTab, setActiveTab] = useState<'cluster' | 'terminal'>('cluster');
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<Array<{ type: 'in' | 'out' | 'system'; text: string }>>([
    { type: 'system', text: 'YUG-PORTFOLIO-SHELL v1.0 [react • node • aws]' },
    { type: 'system', text: 'Type "help" for a list of available commands.' },
  ]);

  const clusterNodes = [
    { name: 'react-web-client', status: 'ACTIVE', p99: '4.2ms', rps: '48.2k', health: 100 },
    { name: 'express-api-gateway', status: 'ACTIVE', p99: '8.1ms', rps: '124.0k', health: 100 },
    { name: 'mongodb-atlas-cluster', status: 'ACTIVE', p99: '11.4ms', rps: '32.6k', health: 99 },
    { name: 'neo4j-graph-database', status: 'ACTIVE', p99: '2.8ms', rps: '14.8k', health: 100 },
  ];

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...logs, { type: 'in' as const, text: `$ ${inputVal}` }];

    if (cmd === 'help') {
      newLogs.push({
        type: 'out',
        text: 'Available commands:\n  • projects    - List featured projects & tech stacks\n  • whoami      - View developer summary & background\n  • stats       - Achievements & certification metrics\n  • resume      - Open curriculum vitae\n  • contact     - Open direct message channel\n  • clear       - Clear terminal buffer'
      });
    } else if (cmd === 'projects') {
      const pList = projects.map(p => `  → [${p.year}] ${p.title} (${p.category}) - ${p.technologies.slice(0, 3).join(', ')}`).join('\n');
      newLogs.push({ type: 'out', text: `Featured Architectures:\n${pList}` });
    } else if (cmd === 'whoami') {
      newLogs.push({
        type: 'out',
        text: `${profile.name} — ${profile.title}\n${profile.location} • ${profile.availability}\n"${profile.tagline}"`
      });
    } else if (cmd === 'stats') {
      const statsList = profile.stats.map(s => `  • ${s.label}: ${s.value} (${s.description})`).join('\n');
      newLogs.push({ type: 'out', text: `Telemetry Metrics:\n${statsList}` });
    } else if (cmd === 'resume') {
      newLogs.push({ type: 'out', text: 'Opening Curriculum Vitae...' });
      onOpenResume();
    } else if (cmd === 'contact') {
      newLogs.push({ type: 'out', text: 'Opening Contact Dispatch...' });
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
    <div className="w-full rounded-2xl bg-[#FFFFFF] border border-[#E5DFD6] overflow-hidden text-left shadow-md">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#FAF7F2] border-b border-[#E5DFD6]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DCD5C9]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#DCD5C9]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#DCD5C9]" />
          </div>
          <span className="text-xs font-mono text-[#6E675E]">yug-gupta-system</span>
        </div>

        {/* Mode Switch */}
        <div className="flex items-center gap-1 bg-[#ECE7DF] p-0.5 rounded-md border border-[#DFD8CC]">
          <button
            onClick={() => setActiveTab('cluster')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
              activeTab === 'cluster'
                ? 'bg-[#FFFFFF] text-[#161514] font-medium shadow-xs'
                : 'text-[#6E675E] hover:text-[#161514]'
            }`}
          >
            Topology
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
              activeTab === 'terminal'
                ? 'bg-[#FFFFFF] text-[#161514] font-medium shadow-xs'
                : 'text-[#6E675E] hover:text-[#161514]'
            }`}
          >
            CLI Shell
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 min-h-[260px] flex flex-col justify-between bg-[#FAF7F2]">
        {activeTab === 'cluster' ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#6E675E] pb-2 border-b border-[#E5DFD6]">
              <span className="flex items-center gap-1.5 text-[#C88A58] font-medium">
                <Activity className="w-3.5 h-3.5" />
                SERVICE TOPOLOGY STATUS
              </span>
              <span className="text-[#6E675E]">OVERALL HEALTH 99.98%</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {clusterNodes.map((node, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E5DFD6] space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#161514] text-[11px] font-medium truncate max-w-[170px]">
                      {node.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#B86B35] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C88A58]" />
                      {node.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C564D]">
                    <span>p99: {node.p99}</span>
                    <span>rps: {node.rps}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#80776C] border-t border-[#E5DFD6]">
              <span>CI: passing (GitHub Actions)</span>
              <span>HTTPS / REST APIs</span>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between space-y-3">
            <div className="font-mono text-xs space-y-1.5 max-h-[200px] overflow-y-auto pr-1">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`whitespace-pre-wrap ${
                    log.type === 'in'
                      ? 'text-[#B86B35] font-semibold'
                      : log.type === 'system'
                      ? 'text-[#80776C]'
                      : 'text-[#2A2724]'
                  }`}
                >
                  {log.text}
                </div>
              ))}
            </div>

            {/* Input Line */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 border-t border-[#E5DFD6]">
              <span className="text-xs font-mono text-[#C88A58] font-bold">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'help', 'projects', 'stats'..."
                className="flex-1 bg-transparent text-xs font-mono text-[#161514] placeholder-[#8C857B] focus:outline-hidden"
              />
              <button
                type="submit"
                aria-label="Submit command"
                className="p-1 rounded text-[#6E675E] hover:text-[#161514] hover:bg-[#EBE6DC] transition-colors cursor-pointer"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

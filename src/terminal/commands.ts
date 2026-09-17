import {
  defaultEducations,
  defaultExperiences,
  defaultProfile,
  defaultProjects,
  defaultSkillCategories,
} from '../data/portfolioData';
import { shortSkillName } from '../lib/format';

export type TerminalView = 'config' | 'stack' | 'output';

export type Tone = 'default' | 'strong' | 'muted' | 'accent' | 'ok' | 'error';

export interface TerminalLine {
  text: string;
  tone?: Tone;
  /** external link — rendered as an anchor */
  href?: string;
  /** section id — rendered as a scroll-to action */
  scrollTo?: string;
}

interface CommandResult {
  lines: TerminalLine[];
  /** switch the terminal body to a different view */
  view?: TerminalView;
  /** wipe the output buffer */
  clears?: boolean;
}

export interface CommandApi {
  onOpenResume: () => void;
  openExternal: (url: string) => void;
  scrollTo: (id: string) => void;
}

interface CommandSpec {
  description: string;
  run: (args: string[], api: CommandApi) => CommandResult;
}

const line = (text = '', tone?: Tone): TerminalLine => ({ text, tone });
const action = (text: string, scrollTo: string): TerminalLine => ({
  text,
  tone: 'accent',
  scrollTo,
});

const { socialLinks } = defaultProfile;

/* ------------------------------------------------------------------ */
/* Stack tree (shared by the STACK tab and the `stack` command)        */
/* ------------------------------------------------------------------ */
export function buildStackTree(): TerminalLine[] {
  const lines: TerminalLine[] = [];

  defaultSkillCategories.forEach((category, categoryIndex) => {
    if (categoryIndex > 0) lines.push(line());

    lines.push(line(category.title, 'strong'));

    const skills = category.skills.map((skill) => shortSkillName(skill.name));
    skills.forEach((skill, index) => {
      lines.push(line(`${index === skills.length - 1 ? '└──' : '├──'} ${skill}`));
    });
  });

  return lines;
}

/* ------------------------------------------------------------------ */
/* Help                                                                */
/* ------------------------------------------------------------------ */
const HELP_ORDER = [
  'help',
  'about',
  'projects',
  'skills',
  'experience',
  'certs',
  'contact',
  'resume',
  'github',
  'linkedin',
  'leetcode',
  'config',
  'stack',
  'whoami',
  'date',
  'open',
  'clear',
];

/* ------------------------------------------------------------------ */
/* Command registry — all content derives from the portfolio data      */
/* ------------------------------------------------------------------ */
const COMMANDS: Record<string, CommandSpec> = {
  help: {
    description: 'Show available commands',
    run: () => {
      const width = Math.max(...HELP_ORDER.map((name) => name.length));
      return {
        lines: [
          line('Available commands:', 'muted'),
          line(),
          ...HELP_ORDER.map((name) =>
            line(`${name.padEnd(width + 2)}${COMMANDS[name].description}`)
          ),
          line(),
          line("Tip: run 'projects', then 'open 1' to jump to one.", 'muted'),
        ],
      };
    },
  },

  whoami: {
    description: 'Show profile summary',
    run: () => {
      const education = defaultEducations[0];
      return {
        lines: [
          line(defaultProfile.name, 'strong'),
          line(defaultProfile.title),
          line(),
          line(`${education.degree} — ${education.institution}`),
          line(`${defaultProfile.location} · ${defaultProfile.availability}`, 'muted'),
          line(),
          line('Focus', 'muted'),
          ...defaultProfile.interests.map((interest) => line(`  • ${interest}`)),
        ],
      };
    },
  },

  about: {
    description: 'About me',
    run: () => ({
      lines: [
        line('About', 'muted'),
        line(),
        ...defaultProfile.bioParagraphs.flatMap((paragraph, index) =>
          index === 0 ? [line(paragraph)] : [line(), line(paragraph)]
        ),
        line(),
        action('About section', 'about'),
      ],
    }),
  },

  projects: {
    description: 'View my projects',
    run: () => {
      const lines: TerminalLine[] = [line(`Projects (${defaultProjects.length})`, 'muted'), line()];

      defaultProjects.forEach((project, index) => {
        lines.push(line(`[${index + 1}] ${project.title}`, 'strong'));
        lines.push(line(`    ${project.tagline}`));
        lines.push(line(`    stack: ${project.technologies.join(' · ')}`, 'default'));
        if (project.demoUrl) lines.push({ text: `    live : ${project.demoUrl}`, href: project.demoUrl, tone: 'accent' });
        if (project.githubUrl) lines.push({ text: `    code : ${project.githubUrl}`, href: project.githubUrl, tone: 'accent' });
        lines.push(action(`open ${index + 1}`, `project-${project.id}`));
        lines.push(line());
      });

      return { lines };
    },
  },

  skills: {
    description: 'View my technical skills',
    run: () => ({
      lines: [
        line('Technical skills', 'muted'),
        line(),
        ...defaultSkillCategories.flatMap((category) => [
          line(category.title, 'strong'),
          line(`  ${category.skills.map((skill) => shortSkillName(skill.name)).join(' · ')}`),
          line(),
        ]),
        action('Skills section', 'skills'),
      ],
    }),
  },

  experience: {
    description: 'Experience & education',
    run: () => {
      const lines: TerminalLine[] = [line('Experience', 'muted'), line()];

      defaultExperiences.forEach((experience) => {
        lines.push(line(`${experience.role} — ${experience.company}`, 'strong'));
        lines.push(line(`  ${experience.period} · ${experience.location} · ${experience.type}`, 'muted'));
        lines.push(line(`  ${experience.description}`));
        experience.highlights.forEach((highlight) => lines.push(line(`  • ${highlight}`)));
        lines.push(line());
      });

      lines.push(line('Education', 'muted'), line());
      defaultEducations.forEach((education) => {
        lines.push(line(`${education.degree} — ${education.institution}`, 'strong'));
        lines.push(line(`  ${education.period} · ${education.location}`, 'muted'));
        if (education.grade) lines.push(line(`  ${education.grade}`));
        lines.push(line());
      });

      lines.push(action('Experience & education section', 'experience'));
      return { lines };
    },
  },

  certs: {
    description: 'Certifications',
    run: () => {
      const aws = defaultProfile.stats.find((stat) => /aws/i.test(stat.label));
      const lines: TerminalLine[] = [];

      if (aws) {
        const names = aws.description.split(/,\s*|\s*&\s*/).filter(Boolean);
        lines.push(line(`${aws.label} (${aws.value})`, 'muted'), line());
        names.forEach((name, index) => {
          lines.push(line(`${index === names.length - 1 ? '└──' : '├──'} ${name}`));
        });
      }

      const recognition = defaultProfile.stats.filter((stat) => stat !== aws);
      if (recognition.length > 0) {
        lines.push(line(), line('Recognition', 'muted'), line());
        recognition.forEach((stat) => {
          lines.push(line(`• ${stat.label}: ${stat.value}`));
          lines.push(line(`  ${stat.description}`, 'muted'));
        });
      }

      lines.push(line(), action('Experience & education section', 'experience'));
      return { lines };
    },
  },

  contact: {
    description: 'Contact information',
    run: () => {
      const rows: [string, string][] = [
        ['email', defaultProfile.email],
        ['phone', defaultProfile.phone ?? '—'],
        ['base', defaultProfile.location],
        ['status', defaultProfile.availability],
      ];
      if (socialLinks.github) rows.push(['github', socialLinks.github]);
      if (socialLinks.linkedin) rows.push(['linkedin', socialLinks.linkedin]);

      const width = Math.max(...rows.map(([key]) => key.length));
      return {
        lines: [
          line('Contact', 'muted'),
          line(),
          ...rows.map(([key, value]) =>
            key === 'email'
              ? { text: `${key.padEnd(width + 2)}${value}`, href: `mailto:${value}`, tone: 'accent' as Tone }
              : key === 'github' || key === 'linkedin'
                ? { text: `${key.padEnd(width + 2)}${value}`, href: value, tone: 'accent' as Tone }
                : line(`${key.padEnd(width + 2)}${value}`)
          ),
          line(),
          action('Contact section', 'contact'),
        ],
      };
    },
  },

  resume: {
    description: 'Open résumé',
    run: (_args, api) => {
      api.onOpenResume();
      return {
        lines: [line('Opening résumé…', 'ok'), line('Use the “Résumé” button in the navigation if it did not open.', 'muted')],
      };
    },
  },

  github: {
    description: 'Open GitHub',
    run: (_args, api) => {
      if (!socialLinks.github) return { lines: [line('No GitHub profile is linked.', 'error')] };
      api.openExternal(socialLinks.github);
      return { lines: [line(`Opening ${socialLinks.github}`, 'muted')] };
    },
  },

  linkedin: {
    description: 'Open LinkedIn',
    run: (_args, api) => {
      if (!socialLinks.linkedin) return { lines: [line('No LinkedIn profile is linked.', 'error')] };
      api.openExternal(socialLinks.linkedin);
      return { lines: [line(`Opening ${socialLinks.linkedin}`, 'muted')] };
    },
  },

  leetcode: {
    description: 'Open LeetCode',
    run: () => ({
      lines: [
        line('No LeetCode profile is linked on this site yet.', 'muted'),
        line(),
        line('Problem solving', 'strong'),
        line('  • 500+ problems solved across LeetCode, CodeChef & HackerRank'),
        line('  • LeetCode contest rating 1400+ (top 65% globally)'),
      ],
    }),
  },

  config: {
    description: 'Show profile configuration',
    run: () => ({ lines: [], view: 'config' }),
  },

  stack: {
    description: 'Show technology stack',
    run: () => ({ lines: [], view: 'stack' }),
  },

  date: {
    description: 'Show current date & time',
    run: () => ({
      lines: [
        line(
          `${new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'full',
            timeStyle: 'short',
            timeZone: 'Asia/Kolkata',
          }).format(new Date())} IST`
        ),
      ],
    }),
  },

  open: {
    description: 'Jump to a project (e.g. open 1)',
    run: (args, api) => {
      const target = (args[0] ?? '').toLowerCase();
      if (!target) {
        return {
          lines: [
            line('usage: open <n>', 'error'),
            line("Run 'projects' to list project numbers.", 'muted'),
          ],
        };
      }

      const index = Number.parseInt(target, 10);
      const project = Number.isNaN(index)
        ? defaultProjects.find(
            (item) => item.id === target || item.title.toLowerCase().includes(target)
          )
        : defaultProjects[index - 1];

      if (!project) {
        return { lines: [line(`no project matches “${target}”`, 'error')] };
      }

      api.scrollTo(`project-${project.id}`);
      return { lines: [line(`→ ${project.title}`, 'ok')] };
    },
  },

  clear: {
    description: 'Clear terminal',
    run: () => ({ lines: [], clears: true }),
  },
};

const ALIASES: Record<string, string> = { ls: 'projects', man: 'help' };

const COMMAND_NAMES = Object.keys(COMMANDS);

function resolve(name: string): CommandSpec | undefined {
  return COMMANDS[name] ?? COMMANDS[ALIASES[name] ?? ''];
}

export function runCommand(command: string, api: CommandApi): CommandResult {
  const [name, ...args] = command.trim().split(/\s+/);
  const spec = resolve(name);

  if (!spec) {
    return {
      lines: [
        line(`command not found: ${name}`, 'error'),
        line(),
        line("Type 'help' to see available commands.", 'muted'),
      ],
    };
  }

  return spec.run(args, api);
}

interface Completion {
  value: string;
  matches: string[];
}

/** Lightweight prefix completion — no shell parsing. */
export function completeCommand(input: string): Completion {
  const value = input.trimStart().toLowerCase();
  if (!value) return { value: input, matches: [] };

  const matches = COMMAND_NAMES.filter((name) => name.startsWith(value));
  if (matches.length === 0) return { value: input, matches: [] };
  if (matches.length === 1) return { value: `${matches[0]} `, matches };

  let prefix = matches[0];
  for (const match of matches) {
    while (!match.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }

  return { value: prefix.length > value.length ? prefix : input, matches };
}

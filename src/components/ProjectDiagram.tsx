interface ProjectDiagramProps {
  variant: 'graph' | 'pipeline';
  label: string;
}

/**
 * Diagrammatic (not photographic) project covers.
 * Each is a schematic of the system's real architecture — no fabricated UI.
 */
export function ProjectDiagram({ variant, label }: ProjectDiagramProps) {
  const markerId = `arrow-${variant}`;

  return (
    <svg
      viewBox="0 0 440 300"
      className="h-full w-full"
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L8 4 L0 8 z" className="fill-ink-3" />
        </marker>
      </defs>

      {variant === 'graph' ? (
        <g className="font-mono">
          {/* Documents */}
          <rect x="14" y="94" width="62" height="74" rx="3" className="fill-surface-2 stroke-line" />
          <rect x="22" y="102" width="62" height="74" rx="3" className="fill-surface-2 stroke-line" />
          <rect
            x="30"
            y="110"
            width="62"
            height="74"
            rx="3"
            className="fill-surface stroke-line-strong"
          />
          {[128, 142, 156, 170].map((y, i) => (
            <line
              key={y}
              x1="42"
              x2={i === 3 ? 68 : 82}
              y1={y}
              y2={y}
              className={i === 0 ? 'stroke-accent' : 'stroke-line'}
              strokeWidth="2"
            />
          ))}
          <text x="30" y="202" className="fill-ink-3 text-xs tracking-[0.15em] uppercase">
            documents
          </text>

          {/* Flow: extract */}
          <line
            x1="96"
            y1="146"
            x2="198"
            y2="150"
            className="stroke-line-strong"
            markerEnd={`url(#${markerId})`}
          />
          <line x1="96" y1="146" x2="198" y2="150" className="flow-dash stroke-accent" />
          <text x="116" y="136" className="fill-ink-3 text-xs tracking-[0.15em] uppercase">
            extract
          </text>

          {/* Knowledge graph */}
          {[
            [178, 100],
            [266, 106],
            [174, 202],
            [268, 206],
          ].map(([cx, cy]) => (
            <line
              key={`${cx}-${cy}`}
              x1="220"
              y1="150"
              x2={cx}
              y2={cy}
              className="stroke-line-strong"
            />
          ))}
          <line x1="178" y1="100" x2="266" y2="106" className="stroke-line" />
          <line x1="174" y1="202" x2="268" y2="206" className="stroke-line" />
          {[
            [178, 100],
            [266, 106],
            [174, 202],
            [268, 206],
          ].map(([cx, cy], i) => (
            <circle
              key={`n-${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="8"
              className={i % 2 === 0 ? 'fill-surface stroke-ink-3' : 'fill-surface stroke-line-strong'}
            />
          ))}
          <circle cx="220" cy="150" r="17" className="fill-surface stroke-accent" strokeWidth="1.5" />
          <circle cx="220" cy="150" r="4" className="fill-accent animate-pulse" />
          <text x="220" y="252" textAnchor="middle" className="fill-ink-3 text-xs tracking-[0.15em] uppercase">
            neo4j graph
          </text>

          {/* Flow: cite */}
          <line
            x1="240"
            y1="150"
            x2="332"
            y2="150"
            className="stroke-line-strong"
            markerEnd={`url(#${markerId})`}
          />
          <line x1="240" y1="150" x2="332" y2="150" className="flow-dash stroke-accent" />
          <text x="270" y="136" className="fill-ink-3 text-xs tracking-[0.15em] uppercase">
            ground
          </text>

          {/* Cited answer */}
          <rect
            x="336"
            y="108"
            width="90"
            height="84"
            rx="3"
            className="fill-surface stroke-line-strong"
          />
          {[128, 143, 158].map((y, i) => (
            <line
              key={y}
              x1="350"
              x2={i === 2 ? 386 : 412}
              y1={y}
              y2={y}
              className="stroke-line"
              strokeWidth="2"
            />
          ))}
          <circle cx="356" cy="176" r="8" className="fill-accent" />
          <path
            d="M352.5 176 l2.6 2.6 l5 -5.4"
            className="stroke-white"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="426" y="212" textAnchor="end" className="fill-ink-3 text-xs tracking-[0.15em] uppercase">
            cited answer
          </text>
        </g>
      ) : (
        <g className="font-mono">
          {/* Browser / client */}
          <rect x="16" y="88" width="118" height="124" rx="4" className="fill-surface stroke-line-strong" />
          <line x1="16" y1="110" x2="134" y2="110" className="stroke-line" />
          {[28, 37, 46].map((cx) => (
            <circle key={cx} cx={cx} cy="99" r="2.4" className="fill-ink-3" />
          ))}
          <rect x="30" y="122" width="92" height="9" rx="2" className="fill-surface-2 stroke-line" />
          <rect x="30" y="139" width="74" height="9" rx="2" className="fill-surface-2 stroke-line" />
          <rect x="30" y="156" width="86" height="9" rx="2" className="fill-surface-2 stroke-line" />
          <rect x="30" y="173" width="56" height="9" rx="2" className="fill-surface-2 stroke-line" />
          <text x="16" y="228" className="fill-ink-3 text-xs tracking-[0.15em] uppercase">
            react client
          </text>
          <rect x="16" y="236" width="70" height="20" rx="3" className="fill-surface stroke-line" />
          <text x="26" y="250" className="fill-ink-3 text-xs tracking-[0.1em] uppercase">
            zustand
          </text>

          {/* API node */}
          <rect x="184" y="118" width="78" height="66" rx="4" className="fill-surface stroke-line-strong" />
          <rect x="214" y="133" width="18" height="13" rx="2" className="fill-none stroke-accent" />
          <path
            d="M217 133 v-4 a6 6 0 0 1 12 0 v4"
            className="stroke-accent"
            fill="none"
            strokeWidth="1.4"
          />
          <text x="223" y="159" textAnchor="middle" className="fill-ink text-xs tracking-[0.08em] uppercase">
            express
          </text>
          <text x="223" y="175" textAnchor="middle" className="fill-ink-3 text-xs tracking-[0.08em] uppercase">
            rest · jwt
          </text>

          {/* Database */}
          <path d="M326 104 v72 a44 10 0 0 0 88 0 v-72" className="fill-surface stroke-line-strong" />
          <ellipse cx="370" cy="104" rx="44" ry="10" className="fill-surface-2 stroke-line-strong" />
          <ellipse cx="370" cy="130" rx="44" ry="10" className="fill-none stroke-line" />
          <ellipse cx="370" cy="156" rx="44" ry="10" className="fill-none stroke-line" />
          <text x="370" y="208" textAnchor="middle" className="fill-ink-3 text-xs tracking-[0.15em] uppercase">
            mongodb
          </text>

          {/* Connections */}
          <line
            x1="134"
            y1="150"
            x2="184"
            y2="150"
            className="stroke-line-strong"
            markerStart={`url(#${markerId})`}
            markerEnd={`url(#${markerId})`}
          />
          <line x1="134" y1="150" x2="184" y2="150" className="flow-dash stroke-accent" />
          <text x="159" y="140" textAnchor="middle" className="fill-ink-3 text-xs tracking-[0.12em] uppercase">
            http
          </text>

          <line
            x1="262"
            y1="150"
            x2="326"
            y2="150"
            className="stroke-line-strong"
            markerStart={`url(#${markerId})`}
            markerEnd={`url(#${markerId})`}
          />
          <line x1="262" y1="150" x2="326" y2="150" className="flow-dash stroke-accent" />
          <text x="294" y="140" textAnchor="middle" className="fill-ink-3 text-xs tracking-[0.12em] uppercase">
            mongo
          </text>
        </g>
      )}
    </svg>
  );
}

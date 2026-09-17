import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  intro?: string;
  aside?: ReactNode;
}

export function SectionHeading({ index, label, title, intro, aside }: SectionHeadingProps) {
  return (
    <Reveal className="rule pt-6">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <div className="marker">
            <span className="marker-index">{index}</span>
            <span aria-hidden="true">/</span>
            <span>{label}</span>
          </div>
          <h2 className="t-h2 mt-5 max-w-[18ch]">{title}</h2>
          {intro && <p className="t-lead measure mt-5">{intro}</p>}
        </div>
        {aside && <div className="lg:col-span-4 lg:justify-self-end lg:text-right">{aside}</div>}
      </div>
    </Reveal>
  );
}

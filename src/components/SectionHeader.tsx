import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  number,
  label,
  title,
  subtitle,
  badge,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.sh-animate'), {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={headerRef} className={`mb-10 md:mb-14 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {/* Editorial rule */}
      <div className="section-rule sh-animate">
        <span className="type-eyebrow">[ {number} / {label} ]</span>
        {badge && <span className="type-meta">{badge}</span>}
      </div>

      {/* Title */}
      <h2 className={`type-section sh-animate ${align === 'center' ? 'mx-auto' : ''}`}>
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={`type-body mt-3 max-w-2xl sh-animate ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

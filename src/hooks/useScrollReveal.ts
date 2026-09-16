import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealVariant = 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight';

interface UseScrollRevealOptions {
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  stagger?: number;
  threshold?: number;
  once?: boolean;
}

const VARIANTS: Record<RevealVariant, gsap.TweenVars> = {
  fadeUp: { opacity: 0, y: 40 },
  fadeIn: { opacity: 0 },
  scaleIn: { opacity: 0, scale: 0.92 },
  slideLeft: { opacity: 0, x: 60 },
  slideRight: { opacity: 0, x: -60 },
};

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    variant = 'fadeUp',
    delay = 0,
    duration = 0.8,
    stagger = 0,
    threshold = 0.15,
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const fromVars = VARIANTS[variant];
    const targets = stagger > 0 ? el.children : el;

    gsap.set(targets, fromVars);

    const tween = gsap.to(targets, {
      ...Object.fromEntries(Object.keys(fromVars).map(k => [k, k === 'opacity' ? 1 : 0])),
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      delay,
      stagger: stagger > 0 ? stagger : 0,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: `top ${(1 - threshold) * 100}%`,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [variant, delay, duration, stagger, threshold, once]);

  return ref;
}

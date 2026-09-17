import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently occupying the viewport's
 * reference line (a fraction of the viewport height from the top).
 *
 * A plain scroll computation is used instead of IntersectionObserver so the
 * active section is deterministic when sections are much taller than the
 * viewport. Include a top-of-page sentinel id (e.g. "top") so nothing is
 * highlighted while the hero is on screen.
 */
export function useScrollSpy(ids: string[], refRatio = 0.3) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    let frame = 0;

    const compute = () => {
      frame = 0;
      const line = window.scrollY + window.innerHeight * refRatio;
      let current = '';
      for (const el of elements) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= line) current = el.id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [ids, refRatio]);

  return activeId;
}

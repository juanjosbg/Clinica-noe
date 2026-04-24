import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 to `end` once `start` becomes true.
 * When `start` becomes false again, the count resets to 0 so it can
 * replay the next time the element re-enters the viewport.
 */
export function useCountUp(end: number, start: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setValue(0);
      return;
    }

    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, end, duration]);

  return value;
}

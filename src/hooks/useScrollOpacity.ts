// hooks/useScrollOpacity.ts
import { useEffect, useState, useRef } from 'react';

export function useScrollOpacity(threshold: number = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        setOpacity(ratio >= threshold ? ratio : 0);
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // [0, 0.01, ..., 1]
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, opacity };
}

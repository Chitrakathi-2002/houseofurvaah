import { useRef, useEffect } from 'react';

export function useSpotlight(panelRef) {
  const pos = useRef({ x: 50, y: 50 }); // percent values

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      pos.current = { x, y };
      
      el.style.setProperty('--sx', x + '%');
      el.style.setProperty('--sy', y + '%');
    };

    el.addEventListener('mousemove', handleMove, { passive: true });
    return () => el.removeEventListener('mousemove', handleMove);
  }, [panelRef]);

  return pos;
}

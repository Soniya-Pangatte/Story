import { useState, useEffect } from 'react';

export const useScrollDepth = (maxDepth = 11000) => {
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (documentHeight <= 0) return;
      
      const scrollRatio = scrollY / documentHeight;
      const currentDepth = Math.round(scrollRatio * maxDepth);
      
      setDepth(Math.min(Math.max(currentDepth, 0), maxDepth));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [maxDepth]);

  return depth;
};

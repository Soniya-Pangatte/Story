import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MarineEcosystem() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.snow-layer-1', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1 }
      });
      gsap.to('.snow-layer-2', {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.5 }
      });
      gsap.to('.snow-layer-3', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.5 }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      <div className="snow-layer-1" style={{ position: 'absolute', width: '100%', height: '120%', top: 0, background: 'radial-gradient(circle, rgba(255,255,255,0.05) 2px, transparent 3px) 0 0 / 120px 120px' }} />
      <div className="snow-layer-2" style={{ position: 'absolute', width: '100%', height: '150%', top: 0, background: 'radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 2px) 60px 60px / 90px 90px' }} />
      <div className="snow-layer-3" style={{ position: 'absolute', width: '100%', height: '110%', top: 0, background: 'radial-gradient(circle, rgba(0,255,229,0.03) 4px, transparent 5px) 30px 30px / 150px 150px' }} />
    </div>
  );
}

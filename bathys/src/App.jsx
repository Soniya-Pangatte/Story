import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SVGLoading from './components/SVGLoading';
import DepthGauge from './components/DepthGauge';
import MarineEcosystem from './components/MarineEcosystem';
import Section from './components/Section';
import CreatureCard from './components/CreatureCard';
import SonarPing from './components/SonarPing';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      });
      
      tl.to('.l-surface', { opacity: 0, ease: 'none', duration: 1 })
        .to('.l-twilight', { opacity: 0, ease: 'none', duration: 1 })
        .to('.l-abyssal', { opacity: 0, ease: 'none', duration: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <>
      <SVGLoading onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <div ref={containerRef} style={{ minHeight: '100vh', position: 'relative' }}>
          <div className="bg-layer l-hadal" style={{ position: 'fixed', inset: 0, zIndex: -4, background: '#000000' }} />
          <div className="bg-layer l-abyssal" style={{ position: 'fixed', inset: 0, zIndex: -3, background: 'linear-gradient(180deg, #0d3b5e 0%, #060e1a 100%)' }} />
          <div className="bg-layer l-twilight" style={{ position: 'fixed', inset: 0, zIndex: -2, background: 'linear-gradient(180deg, #2a9abf 0%, #0d3b5e 100%)' }} />
          <div className="bg-layer l-surface" style={{ position: 'fixed', inset: 0, zIndex: -1, background: 'linear-gradient(180deg, #b8e4f9 0%, #2a9abf 100%)' }} />

          <div className="noise-overlay" />
          <div className="vignette-overlay" style={{ background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.6) 150%)' }} />
          
          <DepthGauge />
          <MarineEcosystem />
          
          <main style={{ position: 'relative', zIndex: 10 }}>
            {/* Section 1: Surface */}
            <Section 
              id="surface"
              title="Most of Earth's surface has never been seen."
              subtitle="Oceans cover 71% of our world, yet remain our greatest mystery."
              className="text-[#0a1a2f]"
            >
              <div style={{ marginTop: '3rem', fontSize: '1.5rem', opacity: 0.6, animation: 'bounce 2s infinite' }}>↓</div>
            </Section>

            {/* Section 2: Sunlight Zone */}
            <Section 
              id="sunlight"
              label="Sunlight Zone — 0 to 200m"
              title="The World You Know"
              story="You are standing at the ocean’s surface, in the Sunlight Zone—where life flourishes in warmth and light. Stretching from 0 to 200 meters, this is the only part of the ocean where sunlight is strong enough for photosynthesis, making it the foundation of nearly all marine life. Tiny phytoplankton drift through these waters, producing oxygen and supporting vast ecosystems that include fish, sea turtles, and powerful predators. But this vibrant world is just the beginning. As you descend deeper, light fades, temperatures drop, and the familiar quickly gives way to the unknown."
            >
              <div className="creature-cards-container">
                <CreatureCard icon="🪼" title="Moon Jellyfish" description="Drifts with ocean currents. No brain or heart, yet highly adaptable and resilient." />
                <CreatureCard icon="🐢" title= "Sea Turtle" description="Sea Turtle Navigates using Earth’s magnetic fields. A survivor from over 100 million years ago." />
                <CreatureCard icon="🦈" title="Great White" description="Apex predator with powerful senses, capable of detecting even tiny traces of blood." />
              </div>
            </Section>

            {/* Section 3: Twilight Zone */}
            <Section 
              id="twilight"
              label="Twilight Zone — 200 to 1000m"
              title="The Light Dies Here"
              story="As you descend into the Twilight Zone (200 to 1000 meters), sunlight begins to fade into a dim, bluish glow. Photosynthesis is no longer possible, and the ocean grows colder and more mysterious. Strange creatures adapted to low light dominate this region, many with large eyes or the ability to produce their own light through bioluminescence. This is a world of silhouettes and shadows, where survival depends on stealth, sensitivity, and the ability to thrive in near darkness."
            >
              <SonarPing />
            </Section>

            {/* Section 4: Abyssal Plain */}
            <Section 
              id="abyssal"
              label="Abyssal Plain — 1000 to 6000m"
              title="The Desert of the Deep"
              story="You are now in the freezer of the deep. The water is near freezing, and the pressure is crushing—equivalent to an African elephant standing on your thumb. Food is so overwhelmingly scarce that meals arrive merely as 'marine snow' drifting down from dead organisms far above. Predators here, like the Anglerfish, cannot afford to chase prey. They must conserve energy, waiting in total stillness for a meal to wander toward a deceptive, glowing lure."
            >
              <div className="abyssal-timeline">
                <div className="timeline-mark">1,000m — Midnight Zone begins</div>
                <div className="timeline-mark">2,000m — No sunlight ever</div>
                <div className="timeline-mark">3,800m — Titanic wreck site</div>
                <div className="timeline-mark">4,000m — Abyssal Plain floor</div>
                <div className="timeline-mark">6,000m — Hadal Zone threshold</div>
              </div>
            </Section>

            {/* Section 5: Hadal Zone */}
            <Section 
              id="hadal"
              label="Hadal Zone — 6000 to 11,000m"
              title="The Challenger Deep"
              story="You are standing further down from sea-level than the peak of Mount Everest is up in the sky. Down here in the jagged tectonic trenches, life doesn't rely on the sun at all. It sustains itself by converting toxic, boiling chemicals spewing from hydrothermal vents into energy. It is an alien world existing silently on our own planet, proving that where there is water, life will always conquer the impossible."
            >
              <div className="hadal-feature-grid">
                <div className="hadal-glow-orb" />
                <div className="hadal-return" onClick={() => document.getElementById('surface')?.scrollIntoView({ behavior: 'smooth' })}>
                  ↑ Return to the Surface
                </div>
              </div>
            </Section>
          </main>
        </div>
      )}
    </>
  );
}

export default App;

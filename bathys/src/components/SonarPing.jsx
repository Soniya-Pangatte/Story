import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SonarPing() {
  const [isActive, setIsActive] = useState(false);

  const handlePing = () => {
    if (isActive) return;
    setIsActive(true);
    setTimeout(() => setIsActive(false), 2000);
  };

  return (
    <div style={{ position: 'relative', width: 320, height: 320, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button className="sonar-btn" onClick={handlePing}>PING SONAR</button>
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            style={{ position: 'absolute', borderRadius: '50%', border: '1px solid #00ffe5', zIndex: 1, pointerEvents: 'none' }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 400, height: 400, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <motion.span
          style={{ position: 'absolute', top: '10%', left: '0%', fontSize: '2.5rem', filter: 'grayscale(100%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? [0, 1, 0] : 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        >
          👁
        </motion.span>
        <motion.span
          style={{ position: 'absolute', top: '70%', right: '10%', fontSize: '3.5rem', filter: 'grayscale(100%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? [0, 1, 0] : 0 }}
          transition={{ duration: 1.8, delay: 0.2, ease: 'easeInOut' }}
        >
          🦑
        </motion.span>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SVGLoading({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div 
            style={{ width: 140, height: 140, border: '4px solid #0a1a2f', borderRadius: '50%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
            initial={{ y: -50, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.div style={{ position: 'absolute', width: '100%', height: '4px', background: '#0a1a2f' }} animate={{ rotate: 360 }} transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }} />
            <motion.div style={{ position: 'absolute', width: '4px', height: '100%', background: '#0a1a2f' }} animate={{ rotate: 360 }} transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }} />
            <motion.div
              style={{ position: 'absolute', bottom: 0, width: '100%', background: '#000033', zIndex: -1 }}
              initial={{ height: '0%' }}
              animate={{ height: '100%' }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

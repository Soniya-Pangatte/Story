import React from 'react';
import { motion } from 'framer-motion';

export default function Section({ id, title, subtitle, label, story, children, className = '' }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
  };

  return (
    <motion.section 
      id={id}
      className={`depth-section ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="section-content">
        {label && <motion.div variants={itemVariants} className="zone-label">{label}</motion.div>}
        {title && <motion.h2 variants={itemVariants} className="zone-title">{title}</motion.h2>}
        {subtitle && <motion.p variants={itemVariants} className="zone-sub">{subtitle}</motion.p>}
        {story && <motion.p variants={itemVariants} className="story-passage">{story}</motion.p>}
        <motion.div variants={itemVariants} className="section-interactive">
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}

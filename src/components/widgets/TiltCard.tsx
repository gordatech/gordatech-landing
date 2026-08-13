'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  glare?: boolean;
}

export default function TiltCard({ children, className = '', max = 7, scale = 1.015, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springPx = useSpring(px, { stiffness: 220, damping: 22, mass: 0.6 });
  const springPy = useSpring(py, { stiffness: 220, damping: 22, mass: 0.6 });

  const rotateX = useTransform(springPy, [0, 1], [max, -max]);
  const rotateY = useTransform(springPx, [0, 1], [-max, max]);
  const glareBg = useTransform([springPx, springPy], (latest) => {
    const [xv, yv] = latest as number[];
    return `radial-gradient(circle at ${xv * 100}% ${yv * 100}%, rgba(255,255,255,0.5), transparent 55%)`;
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d' }}
      animate={{ scale: hovered ? scale : 1 }}
      transition={{ scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
          style={{ background: glareBg, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease' }}
        />
      )}
    </motion.div>
  );
}

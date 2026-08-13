import { motion } from 'framer-motion';
import { useMemo, type CSSProperties, type ElementType, type ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  /** Seconds to wait before the animation starts. */
  delay?: number;
  duration?: number;
  /** Starting horizontal offset in pixels. */
  x?: number;
  /** Starting vertical offset in pixels. */
  y?: number;
  /** Element type to render, e.g. 'h1', 'section', 'li'. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className,
  style,
}: FadeInProps) {
  const MotionTag = useMemo(() => motion.create(as), [as]);

  return (
    <MotionTag
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}

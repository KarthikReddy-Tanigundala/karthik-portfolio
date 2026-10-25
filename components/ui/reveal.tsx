"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Stagger delay in seconds. */
  delay?: number;
  /** Distance (px) the element travels up into place. */
  y?: number;
};

/**
 * Scroll-triggered fade-up. Fires once when the element enters the viewport.
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in LensProvider, which keeps server and client markup identical.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

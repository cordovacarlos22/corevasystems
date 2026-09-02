"use client";

import { motion } from "framer-motion";

const EASE = [0.21, 0.47, 0.32, 0.98];

// Fades + slides content in once it scrolls into view. Use for section
// intros, cards, and anything below the fold.
export function Reveal({ children, className, delay = 0, y = 24, once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Pair with StaggerItem to cascade a group of children in sequence.
// Animates on mount (no viewport gate) — use above the fold, e.g. the hero.
export function Stagger({ children, className, stagger = 0.12, delayChildren = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

// Pair with Stagger when children should reveal on scroll instead of on mount.
export function ScrollStagger({ children, className, stagger = 0.12, once = true }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, y = 20, as = "div" }) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </MotionTag>
  );
}

"use client";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  value: number;
  format: (n: number) => string;
  className?: string;
  delay?: number;
};

/** Eases from the previous value to the next, so changes feel like a dial, not a jump. */
export default function NumberTicker({ value, format, className, delay = 0 }: Props) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => format(v));
  const first = useRef(true);

  useEffect(() => {
    const controls = animate(mv, value, {
      duration: first.current ? 1.4 : 0.55,
      delay: first.current ? delay : 0,
      ease: [0.22, 1, 0.36, 1],
    });
    first.current = false;
    return () => controls.stop();
  }, [value, mv, delay]);

  return (
    <motion.span className={`tabular ${className ?? ""}`} aria-live="polite">
      {text}
    </motion.span>
  );
}

"use client";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const text =
  "Most money tools in India sit inside a bank's website, built to sell you a loan. Fermor is built to help you understand one, before you sign anything.";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  );
}

/** Words light up as you scroll through, so the sentence is read at the pace it's revealed. */
export default function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <section className="px-5 py-28 sm:px-8 sm:py-40">
      <div ref={ref} className="mx-auto max-w-[56rem]">
        <p className="font-serif text-[1.9rem] leading-[1.3] tracking-[-0.015em] sm:text-[2.9rem] sm:leading-[1.22]">
          {words.map((w, i) => {
            const start = i / words.length;
            return <Word key={i} word={w} progress={scrollYProgress} range={[start, start + 1 / words.length]} />;
          })}
        </p>
      </div>
    </section>
  );
}

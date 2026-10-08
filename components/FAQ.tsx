"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ease, spring } from "./motion";

const faqs = [
  {
    q: "If it's free, how does Fermor make money?",
    a: "Through advertising and affiliate partners, like a credit card or mutual fund platform we link to. Every ad and affiliate link is marked as one. None of it changes how a result is calculated.",
  },
  {
    q: "Do I need an account?",
    a: "No. Every calculator works without signing in. An account is only useful if you want to save a calculation and come back to it later.",
  },
  {
    q: "Where do my numbers go?",
    a: "Nowhere. The math runs in your browser, so the salary, loan or savings figures you enter aren't sent to our servers to produce a result.",
  },
  {
    q: "How accurate are the results?",
    a: "We use the standard formulas banks and fund houses use, and show them on every tool so you can check. Your bank may round differently or add fees, so treat results as close estimates.",
  },
  {
    q: "Is this financial advice?",
    a: "No. Fermor helps you understand the numbers behind a decision. For advice on your situation, speak to a SEBI-registered adviser.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-page gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <h2 className="text-balance font-serif text-[2.3rem] leading-[1.05] tracking-[-0.02em] sm:text-[3.2rem]">
          Questions people ask us.
        </h2>
        <ul className="border-t border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-line">
                <button
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-[1.08rem] font-medium"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {f.q}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "#2D5B4C" : "#E4EAE6", color: isOpen ? "#FAFBFA" : "#16231D" }}
                    transition={spring}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[40rem] pb-7 pr-12 text-[1rem] leading-[1.7] text-slate">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

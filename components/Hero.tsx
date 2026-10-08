"use client";
import { motion } from "framer-motion";
import Calculator from "./Calculator";
import { ease } from "./motion";

const lines = ["See the math", "behind every", "money decision."];

const promises = [
  { label: "No sign-up needed", icon: "M4 8.5l2.5 2.5L12 5.5" },
  { label: "Runs in your browser", icon: "M3 4.5h10v7H3zM6 13.5h4" },
  { label: "Formula on every tool", icon: "M4 5h8M4 8h8M4 11h5" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="grid-paper pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      {/* soft light in the top right, like morning through a window */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[38rem] w-[38rem] rounded-full bg-sky/40 blur-[120px]" />

      <div className="mx-auto grid max-w-page items-center gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 text-[0.84rem] text-slate"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pine/50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pine" />
            </span>
            Free calculators, built for India
          </motion.p>

          <h1 className="font-serif text-[3.1rem] font-[450] leading-[0.98] tracking-[-0.025em] sm:text-[4.4rem] lg:text-[5.1rem]">
            {lines.map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
            className="text-pretty mt-7 max-w-[34rem] text-[1.08rem] leading-[1.65] text-slate sm:text-[1.15rem]"
          >
            Fermor works out your EMIs, SIP returns, FD interest, tax and take-home pay, and
            shows you every step of how it got there. No sign-up, and the numbers you type
            never leave your device.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#tools" className="rounded-full bg-pine px-6 py-3.5 text-[0.98rem] font-medium text-surface shadow-[0_8px_24px_-10px_rgba(45,91,76,.7)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]">
              Browse all calculators
            </a>
            <a href="#faq" className="rounded-full px-2 py-3.5 text-[0.98rem] text-ink underline sm:px-5 decoration-line underline-offset-[6px] transition-colors hover:decoration-ink">
              How Fermor stays free
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-[0.9rem] text-slate"
          >
            {promises.map((p) => (
              <li key={p.label} className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" className="h-4 w-4 text-pine" aria-hidden="true">
                  <path d={p.icon} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {p.label}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.45, ease }}
          className="w-full lg:max-w-[30rem] lg:justify-self-end"
        >
          <Calculator />
        </motion.div>
      </div>
    </section>
  );
}

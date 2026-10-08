"use client";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import Logo from "./Logo";
import { ease } from "./motion";

const links = [
  { href: "#tools", label: "Calculators" },
  { href: "#moments", label: "Use cases" },
  { href: "#different", label: "Why Fermor" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        className={`mx-auto flex max-w-page items-center justify-between rounded-full px-4 py-2.5 transition-[background-color,box-shadow,backdrop-filter] duration-500 sm:px-5 ${
          scrolled
            ? "bg-surface/75 shadow-[0_0_0_1px_rgba(22,35,29,.07),0_8px_30px_-12px_rgba(22,35,29,.18)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <a href="#top" aria-label="Fermor home"><Logo /></a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-3.5 py-2 text-[0.92rem] text-slate transition-colors hover:bg-mist hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#tools" className="hidden rounded-full bg-ink px-4 py-2 text-[0.9rem] font-medium text-paper transition-transform active:scale-[0.97] sm:inline-block">
            Open a calculator
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-full md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-5">
              <motion.span animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="absolute left-0 top-0 h-[1.5px] w-5 bg-ink" />
              <motion.span animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className="absolute bottom-0 left-0 h-[1.5px] w-5 bg-ink" />
            </span>
          </button>
        </div>
      </motion.nav>

      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease }}
        className="mx-auto mt-2 max-w-page overflow-hidden rounded-3xl bg-surface/95 shadow-[0_0_0_1px_rgba(22,35,29,.07)] backdrop-blur-xl md:hidden"
      >
        <ul className="p-2">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-lg hover:bg-mist">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </header>
  );
}

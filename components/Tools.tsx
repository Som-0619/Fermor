"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { tools, type Tool } from "@/lib/tools";
import { ease } from "./motion";

export function openInHero(mode: "emi" | "sip" | "fd") {
  window.dispatchEvent(new CustomEvent("fermor:open", { detail: mode }));
  document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
}

const draw = {
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 1.4, ease },
};

function Viz({ kind }: { kind: Tool["viz"] }) {
  if (kind === "amort") {
    // Share of each EMI going to interest (falls) vs principal (rises) over the loan
    return (
      <svg viewBox="0 0 300 90" className="h-24 w-full" aria-hidden="true">
        <motion.path {...draw} d="M0 12 C 90 16, 170 30, 230 55 S 285 84, 300 86" fill="none" stroke="#D49B3A" strokeWidth="2" strokeLinecap="round" />
        <motion.path {...draw} d="M0 86 C 90 82, 170 68, 230 43 S 285 14, 300 12" fill="none" stroke="#2D5B4C" strokeWidth="2" strokeLinecap="round" />
        <text x="0" y="8" className="fill-slate text-[9px]">interest</text>
        <text x="300" y="8" textAnchor="end" className="fill-slate text-[9px]">principal</text>
      </svg>
    );
  }
  if (kind === "growth") {
    return (
      <svg viewBox="0 0 300 90" className="h-24 w-full" aria-hidden="true">
        <motion.path {...draw} d="M0 86 L300 52" fill="none" stroke="#2D5B4C" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" />
        <motion.path {...draw} d="M0 86 C 120 82, 210 60, 300 6" fill="none" stroke="#6E9AA6" strokeWidth="2" strokeLinecap="round" />
        <text x="300" y="66" textAnchor="end" className="fill-slate text-[9px]">invested</text>
        <text x="236" y="12" textAnchor="end" className="fill-slate text-[9px]">value</text>
      </svg>
    );
  }
  if (kind === "regime") {
    const rows = [
      { label: "Old", w: 78, c: "#BCD2D8" },
      { label: "New", w: 58, c: "#2D5B4C" },
    ];
    return (
      <div className="space-y-2.5 pt-2" aria-hidden="true">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3 text-[0.78rem] text-slate">
            <span className="w-7">{r.label}</span>
            <div className="h-2 flex-1 rounded-full bg-mist">
              <motion.div
                className="h-full rounded-full"
                style={{ background: r.c }}
                initial={{ width: 0 }}
                whileInView={{ width: `${r.w}%` }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.1, ease }}
              />
            </div>
          </div>
        ))}
        <p className="pt-1 text-[0.78rem] text-slate">Tax payable at ₹15 L, illustrative</p>
      </div>
    );
  }
  return null;
}

function Card({ t }: { t: Tool }) {
  const ref = useRef<HTMLAnchorElement>(null);

  // A soft light follows the pointer across the card
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <a
      ref={ref}
      href={t.inPage ? "#top" : `/calculators/${t.slug}`}
      onClick={(e) => {
        if (t.inPage) {
          e.preventDefault();
          openInHero(t.inPage);
        }
      }}
      onPointerMove={onMove}
      className={`group relative flex min-h-[11.5rem] flex-col justify-between overflow-hidden rounded-[22px] bg-surface p-6 shadow-[0_0_0_1px_rgba(22,35,29,.07)] transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(45,91,76,.25),0_20px_40px_-24px_rgba(22,35,29,.3)] ${
        t.span ? "md:col-span-2" : ""
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(320px circle at var(--x) var(--y), rgba(188,210,216,.35), transparent 70%)" }}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <h3 className="text-[1.08rem] font-semibold tracking-tight">{t.name}</h3>
          <svg viewBox="0 0 16 16" className="h-4 w-4 -translate-x-1 text-pine opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true">
            <path d="M5 11L11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-2 max-w-[26rem] text-[0.95rem] leading-relaxed text-slate">{t.question}</p>
      </div>
      {t.viz && <div className="relative mt-6"><Viz kind={t.viz} /></div>}
      {t.inPage && !t.viz && <span className="relative mt-6 text-[0.82rem] text-pine">Try it above</span>}
    </a>
  );
}

export default function Tools() {
  return (
    <section id="tools" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-page">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 className="text-balance font-serif text-[2.3rem] leading-[1.05] tracking-[-0.02em] sm:text-[3.2rem]">
            Nine calculators for the questions that come up most.
          </h2>
          <p className="max-w-[30rem] text-[1.02rem] leading-relaxed text-slate md:justify-self-end">
            Each one is named after what it answers, uses Indian rules for tax, compounding and
            rounding, and shows its formula next to the result.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          {tools.map((t) => <Card key={t.slug} t={t} />)}
        </div>
      </div>
    </section>
  );
}

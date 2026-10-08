"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useMemo, useState } from "react";
import { emi, fd, sip } from "@/lib/finance";
import { compact, fixed, plain, rupees } from "@/lib/format";
import NumberTicker from "./NumberTicker";
import { ease, spring } from "./motion";

type Mode = "emi" | "sip" | "fd";

type Field = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  show: (v: number) => string;
};

const fields: Record<Mode, Field[]> = {
  emi: [
    { key: "a", label: "Loan amount", min: 100000, max: 10000000, step: 50000, show: compact },
    { key: "b", label: "Interest rate", min: 6, max: 18, step: 0.05, show: (v) => `${v.toFixed(2)}%` },
    { key: "c", label: "Tenure", min: 1, max: 30, step: 1, show: (v) => `${v} yr` },
  ],
  sip: [
    { key: "a", label: "Monthly investment", min: 500, max: 100000, step: 500, show: rupees },
    { key: "b", label: "Expected return", min: 1, max: 20, step: 0.5, show: (v) => `${v}% p.a.` },
    { key: "c", label: "Time period", min: 1, max: 40, step: 1, show: (v) => `${v} yr` },
  ],
  fd: [
    { key: "a", label: "Deposit", min: 10000, max: 10000000, step: 10000, show: compact },
    { key: "b", label: "Interest rate", min: 3, max: 9, step: 0.05, show: (v) => `${v.toFixed(2)}%` },
    { key: "c", label: "Duration", min: 1, max: 10, step: 1, show: (v) => `${v} yr` },
  ],
};

const defaults: Record<Mode, Record<string, number>> = {
  emi: { a: 2500000, b: 8.5, c: 20 },
  sip: { a: 10000, b: 12, c: 15 },
  fd: { a: 500000, b: 7.1, c: 5 },
};

const tabs: { id: Mode; label: string }[] = [
  { id: "emi", label: "Loan EMI" },
  { id: "sip", label: "SIP" },
  { id: "fd", label: "FD" },
];

type Result = {
  headline: string;
  value: number;
  parts: { label: string; value: number; color: string }[];
  total: { label: string; value: number };
  math: string[];
  note: string;
};

function compute(mode: Mode, v: Record<string, number>): Result {
  if (mode === "emi") {
    const r = emi({ principal: v.a, rate: v.b, years: v.c });
    return {
      headline: "Monthly EMI",
      value: r.monthly,
      parts: [
        { label: "Principal", value: r.principal, color: "#2D5B4C" },
        { label: "Interest", value: r.interest, color: "#D49B3A" },
      ],
      total: { label: "Total repaid", value: r.total },
      math: [
        "EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)",
        `r = ${v.b.toFixed(2)}% ÷ 12 = ${fixed(r.r, 6)} per month`,
        `n = ${v.c} × 12 = ${r.n} months`,
        `(1 + r)ⁿ = ${r.growth.toFixed(4)}`,
        `EMI = ${plain(v.a)} × ${fixed(r.r, 6)} × ${r.growth.toFixed(4)} ÷ ${(r.growth - 1).toFixed(4)}`,
        `EMI = ${rupees(r.monthly)} a month`,
      ],
      note: `For every ₹1 you borrow, you pay back ₹${(r.total / v.a).toFixed(2)}.`,
    };
  }
  if (mode === "sip") {
    const r = sip({ monthly: v.a, rate: v.b, years: v.c });
    return {
      headline: "Estimated value",
      value: r.value,
      parts: [
        { label: "Invested", value: r.invested, color: "#2D5B4C" },
        { label: "Gains", value: r.gains, color: "#8FB3BD" },
      ],
      total: { label: "From gains", value: (r.gains / r.value) * 100 },
      math: [
        "FV = P × ((1 + i)ⁿ − 1) ÷ i × (1 + i)",
        `i = ${v.b}% ÷ 12 = ${fixed(r.i, 6)} per month`,
        `n = ${v.c} × 12 = ${r.n} instalments`,
        `(1 + i)ⁿ = ${r.growth.toFixed(4)}`,
        `FV = ${plain(v.a)} × ${((r.growth - 1) / r.i).toFixed(2)} × ${(1 + r.i).toFixed(4)}`,
        `FV = ${rupees(r.value)}`,
      ],
      note: "Assumes a steady return every month. Real markets won't be this smooth.",
    };
  }
  const r = fd({ deposit: v.a, rate: v.b, years: v.c });
  return {
    headline: "Maturity amount",
    value: r.maturity,
    parts: [
      { label: "Deposit", value: v.a, color: "#2D5B4C" },
      { label: "Interest", value: r.interest, color: "#8FB3BD" },
    ],
    total: { label: "Annual yield", value: (Math.pow(r.growth, 1 / v.c) - 1) * 100 },
    math: [
      "A = P × (1 + r ÷ 4)^(4 × t)",
      `r ÷ 4 = ${v.b.toFixed(2)}% ÷ 4 = ${fixed(r.q, 6)} per quarter`,
      `4 × t = ${r.periods} quarters`,
      `(1 + r ÷ 4)^${r.periods} = ${r.growth.toFixed(4)}`,
      `A = ${plain(v.a)} × ${r.growth.toFixed(4)}`,
      `A = ${rupees(r.maturity)}`,
    ],
    note: "Interest compounds quarterly, as at most Indian banks. TDS isn't deducted here.",
  };
}

function Slider({ f, value, onChange }: { f: Field; value: number; onChange: (n: number) => void }) {
  const id = useId();
  const pct = ((value - f.min) / (f.max - f.min)) * 100;
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.86rem] text-slate">{f.label}</label>
        <span className="tabular text-[0.95rem] font-medium">{f.show(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        className="range"
        min={f.min}
        max={f.max}
        step={f.step}
        value={value}
        style={{ ["--fill" as string]: `${pct}%` }}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={f.show(value)}
      />
    </div>
  );
}

export default function Calculator() {
  const [mode, setMode] = useState<Mode>("emi");
  const [values, setValues] = useState(defaults);
  const [showMath, setShowMath] = useState(false);
  const v = values[mode];

  // Tool cards further down the page can open a calculator here
  useEffect(() => {
    const open = (e: Event) => setMode((e as CustomEvent<Mode>).detail);
    window.addEventListener("fermor:open", open);
    return () => window.removeEventListener("fermor:open", open);
  }, []);
  const res = useMemo(() => compute(mode, v), [mode, v]);
  const sum = res.parts[0].value + res.parts[1].value;
  const isPct = mode !== "emi";

  return (
    <div className="relative rounded-[28px] bg-surface p-2 shadow-[0_0_0_1px_rgba(22,35,29,.06),0_30px_60px_-30px_rgba(22,35,29,.28)]">
      {/* Tabs */}
      <div role="tablist" aria-label="Calculator" className="flex gap-1 rounded-[22px] bg-mist/70 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={mode === t.id}
            onClick={() => setMode(t.id)}
            className={`relative flex-1 rounded-[18px] px-3 py-2.5 text-[0.9rem] transition-colors ${
              mode === t.id ? "text-ink" : "text-slate hover:text-ink"
            }`}
          >
            {mode === t.id && (
              <motion.span layoutId="calc-tab" transition={spring} className="absolute inset-0 rounded-[18px] bg-surface shadow-[0_1px_2px_rgba(22,35,29,.08),0_0_0_1px_rgba(22,35,29,.05)]" />
            )}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="px-4 pb-4 pt-6 sm:px-6 sm:pb-6">
        {/* Inputs */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease }}
            className="space-y-5"
          >
            {fields[mode].map((f) => (
              <Slider
                key={f.key}
                f={f}
                value={v[f.key]}
                onChange={(n) => setValues((s) => ({ ...s, [mode]: { ...s[mode], [f.key]: n } }))}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Result */}
        <div className="mt-7 border-t border-line pt-6">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[0.86rem] text-slate">{res.headline}</p>
              <NumberTicker value={res.value} format={rupees} delay={0.9} className="mt-1 block text-[clamp(1.9rem,8vw,2.75rem)] font-semibold leading-none tracking-tightest" />
            </div>
            <div className="shrink-0 whitespace-nowrap text-right">
              <p className="text-[0.8rem] text-slate">{res.total.label}</p>
              <NumberTicker
                value={res.total.value}
                format={isPct ? (n) => `${n.toFixed(1)}%` : compact}
                delay={1}
                className="mt-1 block text-[1.05rem] font-medium"
              />
            </div>
          </div>

          {/* Split bar */}
          <div className="mt-5 flex h-2.5 gap-1 overflow-hidden rounded-full" aria-hidden="true">
            {res.parts.map((p) => (
              <motion.div
                key={p.label}
                className="h-full rounded-full"
                style={{ background: p.color }}
                initial={{ width: "50%" }}
                animate={{ width: `${(p.value / sum) * 100}%` }}
                transition={{ duration: 0.8, ease }}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[0.84rem]">
            {res.parts.map((p, i) => (
              <span key={p.label} className={`flex items-center gap-2 whitespace-nowrap ${i ? "flex-row-reverse" : ""}`}>
                <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                <span className="text-slate">{p.label}</span>
                <span className="tabular font-medium">{compact(p.value)}</span>
              </span>
            ))}
          </div>

          <p className="mt-4 text-[0.86rem] text-slate">{res.note}</p>

          {/* Show the math */}
          <button
            onClick={() => setShowMath((s) => !s)}
            aria-expanded={showMath}
            className="group mt-5 flex w-full items-center justify-between rounded-2xl bg-mist/70 px-4 py-3 text-left text-[0.92rem] font-medium transition-colors hover:bg-mist"
          >
            {showMath ? "Hide the math" : "Show the math"}
            <motion.svg animate={{ rotate: showMath ? 45 : 0 }} transition={spring} viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </motion.svg>
          </button>
          <AnimatePresence initial={false}>
            {showMath && (
              <motion.div
                key="math"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease }}
                className="overflow-hidden"
              >
                <ol className="mt-2 space-y-1.5 overflow-x-auto rounded-2xl border border-line px-4 py-4 font-serif text-[0.98rem] leading-relaxed">
                  {res.math.map((line, i) => (
                    <motion.li
                      key={mode + i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * i + 0.1, duration: 0.4, ease }}
                      className={`tabular whitespace-pre ${i === 0 ? "pb-1.5 text-ink" : i === res.math.length - 1 ? "font-medium text-pine" : "text-slate"}`}
                    >
                      {line}
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

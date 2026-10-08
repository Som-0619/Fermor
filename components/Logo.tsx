/** A small ledger mark: two bars (principal, interest) resting on a baseline. */
export function Mark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="7" fill="#2D5B4C" />
      <rect x="6.5" y="9" width="4" height="9" rx="1.2" fill="#FAFBFA" />
      <rect x="13.5" y="6" width="4" height="12" rx="1.2" fill="#D49B3A" />
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="flex items-center gap-2">
      <Mark />
      <span className="text-[1.15rem] font-semibold tracking-tight">fermor</span>
    </span>
  );
}

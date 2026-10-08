const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** 4325000 -> "43,25,000" (Indian digit grouping) */
export const rupees = (n: number) => `₹${inr.format(Math.round(n))}`;
export const plain = (n: number) => inr.format(Math.round(n));

/** 4325000 -> "₹43.3 L", 12500000 -> "₹1.25 Cr" */
export function compact(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2).replace(/\.?0+$/, "")} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1).replace(/\.0$/, "")} L`;
  return rupees(n);
}

export const fixed = (n: number, d = 5) => n.toFixed(d);

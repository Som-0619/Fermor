// All math runs in the browser. Nothing here touches a network.

export type EmiInput = { principal: number; rate: number; years: number };
export type SipInput = { monthly: number; rate: number; years: number };
export type FdInput = { deposit: number; rate: number; years: number };

export function emi({ principal, rate, years }: EmiInput) {
  const r = rate / 12 / 100;
  const n = Math.round(years * 12);
  const growth = Math.pow(1 + r, n);
  const monthly = r === 0 ? principal / n : (principal * r * growth) / (growth - 1);
  const total = monthly * n;
  return { r, n, growth, monthly, total, interest: total - principal, principal };
}

export function sip({ monthly, rate, years }: SipInput) {
  const i = rate / 12 / 100;
  const n = Math.round(years * 12);
  const growth = Math.pow(1 + i, n);
  const value = i === 0 ? monthly * n : monthly * ((growth - 1) / i) * (1 + i);
  const invested = monthly * n;
  return { i, n, growth, value, invested, gains: value - invested };
}

// Indian bank FDs compound quarterly.
export function fd({ deposit, rate, years }: FdInput) {
  const q = rate / 4 / 100;
  const periods = years * 4;
  const growth = Math.pow(1 + q, periods);
  const maturity = deposit * growth;
  return { q, periods, growth, maturity, interest: maturity - deposit };
}

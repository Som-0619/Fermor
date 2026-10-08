"use client";
import { openInHero } from "./Tools";

type Link = { label: string; slug: string; inPage?: "emi" | "sip" | "fd" };

const moments: { said: string; links: Link[] }[] = [
  { said: "I just got my first offer letter.", links: [{ label: "Salary take-home", slug: "salary" }, { label: "Income tax", slug: "income-tax" }] },
  { said: "We're finally looking at a flat.", links: [{ label: "Loan EMI", slug: "emi", inPage: "emi" }, { label: "Rent or buy", slug: "rent-vs-buy" }] },
  { said: "It's March and HR wants my tax declaration.", links: [{ label: "Income tax", slug: "income-tax" }, { label: "PPF", slug: "ppf" }] },
  { said: "There's ₹2 lakh sitting idle in my savings.", links: [{ label: "Fixed deposit", slug: "fd", inPage: "fd" }, { label: "SIP returns", slug: "sip", inPage: "sip" }] },
  { said: "I'd like to stop working before sixty.", links: [{ label: "Retirement corpus", slug: "retirement" }, { label: "SIP returns", slug: "sip", inPage: "sip" }] },
];

export default function Moments() {
  return (
    <section id="moments" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-page">
        <div className="max-w-[40rem]">
          <h2 className="text-balance font-serif text-[2.3rem] leading-[1.05] tracking-[-0.02em] sm:text-[3.2rem]">
            Made for the moment you need a number.
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-slate">
            Fermor is for anyone in India making a money decision without a finance degree.
            Start from what&apos;s happening, and we&apos;ll point you to the right calculator.
          </p>
        </div>

        <ul className="mt-14 border-t border-line">
          {moments.map((m) => (
            <li key={m.said} className="group grid gap-4 border-b border-line py-7 md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:py-9">
              <p className="font-serif text-[1.55rem] leading-snug text-slate transition-colors duration-500 group-hover:text-ink sm:text-[2.1rem]">
                &ldquo;{m.said}&rdquo;
              </p>
              <div className="flex flex-wrap gap-2">
                {m.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.inPage ? "#top" : `/calculators/${l.slug}`}
                    onClick={(e) => {
                      if (l.inPage) { e.preventDefault(); openInHero(l.inPage); }
                    }}
                    className="rounded-full border border-line bg-surface px-4 py-2 text-[0.9rem] transition-all duration-300 hover:border-pine hover:bg-pine hover:text-surface"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

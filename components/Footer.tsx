import Logo from "./Logo";

const cols = [
  { title: "Loans", items: ["Loan EMI", "Loan prepayment", "Rent or buy"] },
  { title: "Saving and investing", items: ["SIP returns", "Fixed deposit", "PPF", "Retirement corpus"] },
  { title: "Tax and salary", items: ["Income tax", "Salary take-home"] },
  { title: "Fermor", items: ["About", "Methodology", "Privacy", "Contact"] },
];

export default function Footer() {
  return (
    <footer className="px-5 pb-10 pt-6 sm:px-8">
      {/* Closing call to action */}
      <div className="mx-auto max-w-page overflow-hidden rounded-[32px] bg-ink px-6 py-16 text-paper sm:px-14 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h2 className="text-balance font-serif text-[2.4rem] leading-[1.04] tracking-[-0.02em] sm:text-[3.6rem]">
            Start with the number that&apos;s been on your mind.
          </h2>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a href="#tools" className="rounded-full bg-paper px-6 py-3.5 font-medium text-ink transition-transform hover:-translate-y-0.5 active:scale-[0.98]">
              Browse all calculators
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-page gap-12 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-[20rem] text-[0.92rem] leading-relaxed text-slate">
            Free, honest personal finance calculators, built for India.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-[0.88rem] font-medium">{c.title}</p>
              <ul className="mt-3 space-y-2">
                {c.items.map((i) => (
                  <li key={i}><a href="#tools" className="text-[0.9rem] text-slate transition-colors hover:text-ink">{i}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-page flex-col gap-3 border-t border-line pt-6 text-[0.82rem] text-slate sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Fermor. Results are estimates, not financial advice.</p>
        <a href="mailto:fermor.in.contact@gmail.com" className="hover:text-ink">fermor.in.contact@gmail.com</a>
      </div>
    </footer>
  );
}

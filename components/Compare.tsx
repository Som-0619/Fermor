const rows = [
  { q: "Asks for your phone number first", bank: "Often", us: "Never" },
  { q: "Shows how the result was worked out", bank: "Rarely", us: "On every tool" },
  { q: "Sends what you type to a server", bank: "Usually", us: "No, it runs on your device" },
  { q: "Nudges you toward its own products", bank: "That's the point", us: "Ads are always labelled" },
  { q: "Designed for a phone first", bank: "Sometimes", us: "Always" },
];

export default function Compare() {
  return (
    <section id="different" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-page gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 className="text-balance font-serif text-[2.3rem] leading-[1.05] tracking-[-0.02em] sm:text-[3.2rem]">
            A calculator that isn&apos;t trying to sell you something.
          </h2>
          <p className="mt-5 max-w-[30rem] text-[1.02rem] leading-relaxed text-slate">
            We started Fermor after reverse-engineering our own loan schedules from bank PDFs.
            These are the rules we hold ourselves to.
          </p>
          <div className="mt-10 rounded-[22px] bg-pine p-6 text-surface">
            <p className="text-[1.02rem] leading-relaxed">
              Don&apos;t take our word for it. Open your browser&apos;s network tab while you use any
              Fermor calculator. None of the numbers you enter are sent anywhere.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <thead>
              <tr className="text-[0.88rem] text-slate">
                <th scope="col" className="w-[44%] pb-4 font-normal"><span className="sr-only">Question</span></th>
                <th scope="col" className="pb-4 font-normal">A typical bank calculator</th>
                <th scope="col" className="pb-4 font-medium text-ink">Fermor</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.q} className="border-t border-line align-top">
                  <th scope="row" className="py-5 pr-6 text-[1rem] font-medium">{r.q}</th>
                  <td className="py-5 pr-6 text-[0.98rem] text-slate">{r.bank}</td>
                  <td className="py-5 text-[0.98rem]">
                    <span className="flex items-start gap-2">
                      <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-pine" aria-hidden="true">
                        <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {r.us}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

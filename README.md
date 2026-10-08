# Fermor — homepage

A new homepage for [Fermor](https://fermor.in), free personal finance calculators built for India. - https://fermor-wine.vercel.app/

**Live:** _add your Vercel URL here_

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

Deploy: push to GitHub, import the repo in Vercel, keep the defaults. No env vars.

**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion. Fonts are self-hosted through Fontsource, so there are no third-party font requests.

## What the page is trying to say

Fermor's edge isn't that it has calculators. Banks have calculators. It's that Fermor
**shows the math, needs no sign-up, and never sends your numbers anywhere.** Every
section is there to make one of those three things believable.

| Section | Job |
|---|---|
| Hero | Lead with the product itself. A working EMI / SIP / FD calculator sits next to the headline, and **Show the math** expands the formula with your numbers substituted in. The promise and the proof sit side by side. |
| Statement | One sentence on the problem (bank calculators exist to sell loans), revealed word by word as you scroll. |
| Calculators | All nine tools, each described by the question it answers rather than its name. EMI, SIP and FD cards open that calculator in the hero. |
| Use cases | Who it's for, told through real moments ("I just got my first offer letter") that lead to the right tool. |
| Why Fermor | A plain comparison with a typical bank calculator, plus a claim people can verify: open the network tab and see that nothing is sent. |
| FAQ | Answers the first doubt a free product raises: how does it make money? |

## Design decisions

- **Colour.** A cool, green-tinted paper (`#F1F4F1`) with deep pine ink. Pine stands for
  principal and money you put in; saffron is only ever used for interest, the cost of
  borrowing; a soft sky blue is used for returns. The colours carry meaning in the charts
  instead of being decoration.
- **Type.** Newsreader (a calm text serif) for headlines and the formulas, Onest for
  interface and numbers. Onest has clear tabular figures, which matters when every
  number on the page is money.
- **Indian formatting.** Amounts use lakh/crore grouping (`₹21,69,600`, `₹52.1 L`), and FDs
  compound quarterly like most Indian banks.
- **Motion.** One orchestrated load sequence (headline lines rise out of a mask, then the
  calculator settles in and its numbers count up). After that, motion only answers what
  you do: the tab pill slides, numbers ease between values, the split bar resizes, the
  formula unfolds line by line. Respects `prefers-reduced-motion`.
- **Accessibility.** Real `<input type="range">` sliders with `aria-valuetext`, tab roles on
  the calculator switcher, `aria-expanded` on disclosures, visible focus rings, a semantic
  comparison table.

## Structure

```
app/                  layout, page, placeholder calculator routes
components/           one file per section, plus Calculator and NumberTicker
lib/finance.ts        EMI, SIP and FD formulas (pure functions)
lib/format.ts         en-IN currency and lakh/crore formatting
lib/tools.ts          the calculator list used by the grid and routes
```

## Out of scope

The six calculators other than EMI, SIP and FD link to placeholder routes
(`/calculators/[slug]`), since the brief was the homepage.

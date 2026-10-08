import Link from "next/link";
import { notFound } from "next/navigation";
import { tools } from "@/lib/tools";
import Logo from "@/components/Logo";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) notFound();
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="max-w-[32rem]">
        <Link href="/" aria-label="Fermor home"><Logo /></Link>
        <h1 className="mt-10 font-serif text-[2.6rem] leading-[1.05] tracking-[-0.02em]">{tool.name}</h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-slate">{tool.question}</p>
        <p className="mt-6 text-[0.95rem] leading-relaxed text-slate">
          This page is outside the scope of the homepage assignment. The EMI, SIP and FD
          calculators work on the homepage.
        </p>
        <Link href="/#tools" className="mt-8 inline-block rounded-full bg-pine px-6 py-3.5 font-medium text-surface">
          Back to all calculators
        </Link>
      </div>
    </main>
  );
}

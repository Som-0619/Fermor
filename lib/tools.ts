export type Tool = {
  slug: string;
  name: string;
  question: string;
  inPage?: "emi" | "sip" | "fd";
  span?: 2;
  viz?: "amort" | "growth" | "regime";
};

export const tools: Tool[] = [
  { slug: "emi", name: "Loan EMI", question: "What will this loan cost me each month, and in total?", inPage: "emi", span: 2, viz: "amort" },
  { slug: "sip", name: "SIP returns", question: "What could ₹5,000 a month become in fifteen years?", inPage: "sip", span: 2, viz: "growth" },
  { slug: "income-tax", name: "Income tax", question: "Old regime or new regime: which leaves me with more?", span: 2, viz: "regime" },
  { slug: "salary", name: "Salary take-home", question: "My CTC is ₹18 lakh. What actually reaches my account?" },
  { slug: "fd", name: "Fixed deposit", question: "How much will my FD pay at maturity?", inPage: "fd" },
  { slug: "ppf", name: "PPF", question: "What will 15 years of PPF add up to?" },
  { slug: "prepayment", name: "Loan prepayment", question: "Should I prepay, or lower my EMI?" },
  { slug: "retirement", name: "Retirement corpus", question: "How much do I need to stop working at 55?" },
  { slug: "rent-vs-buy", name: "Rent or buy", question: "Is buying this flat better than renting it?" },
];

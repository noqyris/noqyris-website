import type { ServiceFaq } from "@/content/types";

export function FaqList({ faqs }: { faqs: ServiceFaq[] }) {
  return (
    <div>
      {faqs.map((faq) => (
        <details key={faq.question} className="hairline-t group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span
              aria-hidden="true"
              className="text-fg-faint transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-fg-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

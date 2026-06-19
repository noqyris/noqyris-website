import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mono-label text-fg-faint", className)}>{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  children,
  className,
}: {
  eyebrow: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-display-lg">{children}</h2>
    </div>
  );
}

/** Giant editorial numeral pinned to a section's top-right corner.
 *  Parent Container must be `relative`. */
export function SectionNumeral({ n }: { n: string }) {
  return (
    <span
      aria-hidden="true"
      className="section-numeral pointer-events-none absolute top-16 right-6 hidden select-none md:block lg:right-10"
    >
      {n}
    </span>
  );
}

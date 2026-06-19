import type { ProcessStep } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.name} className="bg-bg">
          <Reveal delay={i * 60} className="flex h-full flex-col gap-6 p-6">
            <span className="mono-label text-fg-faint">
              0{i + 1} {step.name}
            </span>
            <p className="text-sm text-fg-muted">{step.body}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

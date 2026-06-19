import type { ProductMetric } from "@/content/types";

/** Traction slot — renders only when a metric exists. */
export function MetricStat({ metric }: { metric: ProductMetric }) {
  return (
    <div>
      <p className="font-display text-xl font-semibold">{metric.value}</p>
      <p className="mono-label mt-0.5 text-fg-faint">{metric.label}</p>
    </div>
  );
}

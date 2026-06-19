import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ReplaySplash } from "./ReplaySplash";

export const metadata: Metadata = {
  title: "Splash preview",
  robots: { index: false, follow: false },
};

// Internal preview surface for the brand splash. The intro plays on first load
// of the session (it's wired into the root layout); the button below clears the
// session flag and reloads so it can be watched again.
export default function PreviewPage() {
  return (
    <Container className="grid min-h-[70vh] place-items-center py-24 text-center">
      <div className="flex flex-col items-center gap-6">
        <Eyebrow>Splash preview</Eyebrow>
        <h1 className="text-display-md max-w-2xl">
          The intro plays on first load — once per session.
        </h1>
        <p className="max-w-md text-fg-muted">
          The lime cube drops in, flips, the wordmark writes itself, the dot
          blinks, then the curtain lifts to reveal the site. Skipped under
          reduced motion.
        </p>
        <ReplaySplash />
      </div>
    </Container>
  );
}

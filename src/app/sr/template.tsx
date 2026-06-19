import { PageTransition } from "@/components/motion/PageTransition";

// Serbian-subtree page transition — see app/(en)/template.tsx.
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}

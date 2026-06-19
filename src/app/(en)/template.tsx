import { PageTransition } from "@/components/motion/PageTransition";

// Remounts on each navigation within the (en) group → replays the enter
// transition. Sits between the layout (chrome) and the page, so Header/Footer
// stay put.
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}

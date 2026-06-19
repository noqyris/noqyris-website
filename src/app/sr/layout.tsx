import { SiteChrome } from "@/components/layout/SiteChrome";

export default function SrLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteChrome lang="sr">{children}</SiteChrome>;
}

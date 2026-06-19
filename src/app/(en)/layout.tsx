import { SiteChrome } from "@/components/layout/SiteChrome";

export default function EnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteChrome lang="en">{children}</SiteChrome>;
}

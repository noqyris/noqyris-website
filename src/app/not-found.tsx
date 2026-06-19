import { SiteChrome } from "@/components/layout/SiteChrome";
import { NotFoundView } from "@/views/NotFoundView";

// Root catch-all for unmatched URLs (both / and /sr/...). Wrapped in SiteChrome
// so the 404 keeps the header, footer, and language switcher — not a chrome-less
// dead-end. Copy is English; a Serbian-localized 404 for /sr/* misses would need
// a dedicated app/sr catch-all (see docs/LAUNCH.md).
export default function NotFound() {
  return (
    <SiteChrome lang="en">
      <NotFoundView lang="en" />
    </SiteChrome>
  );
}

import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

const variants = {
  primary:
    "bg-accent text-accent-ink hover:bg-fg focus-visible:bg-fg transition-colors",
  outline:
    "border border-line text-fg hover:border-accent hover:text-accent transition-colors",
  ghost: "text-fg-muted hover:text-fg transition-colors",
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const classes = cn(
    "inline-flex items-center gap-2 rounded-full font-medium",
    variants[variant],
    sizes[size],
    className,
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

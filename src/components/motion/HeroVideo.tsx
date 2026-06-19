"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";

/**
 * Optional hero background video (the backmost layer). Drop-in: enabled by
 * `site.heroVideo` (see docs/AI-ASSETS.md). Autoplays muted/looped; under
 * prefers-reduced-motion only the poster shows. A dark overlay keeps the
 * headline readable over any footage.
 */
export function HeroVideo({ src }: { src: string }) {
  const reduce = useReducedMotion();
  const poster = `${src}-poster.jpg`;

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {reduce ? (
        <Image src={poster} alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          className="size-full object-cover opacity-40"
        >
          <source src={`${src}.webm`} type="video/webm" />
          <source src={`${src}.mp4`} type="video/mp4" />
        </video>
      )}
      {/* Readability overlay so the wordmark/headline stay legible. */}
      <div className="absolute inset-0 bg-bg/55" />
    </div>
  );
}

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Shared 1200×630 OG template, mirroring the site's mixed-type headlines.
 *  Satori can't consume woff2/variable fonts, hence the static instances. */
export async function buildOgImage({
  title,
  em,
  subtitle,
}: {
  title: string;
  /** Trailing phrase rendered in Instrument Serif italic + accent. */
  em?: string;
  subtitle?: string;
}) {
  const dir = join(process.cwd(), "src/fonts");
  const [clash, serif] = await Promise.all([
    readFile(join(dir, "ClashDisplay-Semibold.otf")),
    readFile(join(dir, "InstrumentSerif-Italic.ttf")),
  ]);

  const titleSize = (title + (em ?? "")).length > 32 ? 68 : 84;

  // One flex item per word so the headline wraps naturally — a single
  // title span plus an em span would push the em onto its own line.
  const words = [
    ...title.split(" ").map((t) => ({ t, em: false })),
    ...(em ? em.split(" ").map((t) => ({ t, em: true })) : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0B0B0C",
          backgroundImage:
            "radial-gradient(560px circle at 12% 0%, rgba(212,255,79,0.10), transparent 70%)",
          color: "#F2F2F0",
          fontFamily: "Clash Display",
        }}
      >
        <div style={{ display: "flex", fontSize: 36 }}>
          noqyris<span style={{ color: "#D4FF4F" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            columnGap: 20,
            rowGap: 6,
            fontSize: titleSize,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 1020,
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              style={
                word.em
                  ? {
                      fontFamily: "Instrument Serif",
                      fontStyle: "italic",
                      fontSize: titleSize * 1.04,
                      color: "#D4FF4F",
                    }
                  : {}
              }
            >
              {word.t}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
          }}
        >
          <span style={{ color: "#9C9CA3" }}>{subtitle ?? site.tagline}</span>
          <span style={{ color: "#D4FF4F" }}>
            {site.url.replace("https://", "")}
          </span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Clash Display", data: clash, style: "normal", weight: 600 },
        { name: "Instrument Serif", data: serif, style: "italic", weight: 400 },
      ],
    },
  );
}

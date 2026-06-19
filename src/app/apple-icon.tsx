import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const clash = await readFile(
    join(process.cwd(), "src/fonts/ClashDisplay-Semibold.otf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0B0C",
          color: "#F2F2F0",
          fontFamily: "Clash Display",
          fontSize: 112,
        }}
      >
        n<span style={{ color: "#D4FF4F" }}>.</span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Clash Display", data: clash, style: "normal", weight: 600 },
      ],
    },
  );
}

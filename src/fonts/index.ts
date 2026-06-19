import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";

export const display = localFont({
  src: "./ClashDisplay-Variable.woff2",
  display: "swap",
  variable: "--font-display",
  weight: "200 700",
});

export const sans = localFont({
  src: "./Satoshi-Variable.woff2",
  display: "swap",
  variable: "--font-sans",
  weight: "300 900",
});

export const serif = Instrument_Serif({
  subsets: ["latin"],
  style: "italic",
  weight: "400",
  display: "swap",
  variable: "--font-serif",
});

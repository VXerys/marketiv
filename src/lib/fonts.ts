import localFont from "next/font/local";
import { Inter, Space_Grotesk } from "next/font/google";

export const playfairDisplay = localFont({
  variable: "--font-playfair",
  src: [
    {
      path: "../assets/fonts/playfair/PlayfairDisplay-VariableFont_wght.ttf",
      style: "normal",
      weight: "400 900",
    },
    {
      path: "../assets/fonts/playfair/PlayfairDisplay-Italic-VariableFont_wght.ttf",
      style: "italic",
      weight: "400 900",
    },
  ],
  display: "swap",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

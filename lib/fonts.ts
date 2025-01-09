import {
  Audiowide,
  Geist,
  Playwrite_AU_SA,
  Rubik_Bubbles,
} from "next/font/google";

export const geistFont = Geist({
  subsets: ["latin"],
  fallback: ["Arial", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"],
});
export const audiowideFont = Audiowide({ weight: "400", subsets: ["latin"] });
export const playwriteFont = Playwrite_AU_SA();
export const rubikBubblesFont = Rubik_Bubbles({
  weight: "400",
  subsets: ["latin"],
});

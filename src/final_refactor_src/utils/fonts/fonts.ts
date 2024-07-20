// Font families used in the application
import localFont from "next/font/local";
import { Heebo } from "next/font/google";

const globalFont = Heebo({ subsets: ["latin"] });

// custom fonts
export const sejongHospitalLight = localFont({
  src: "@/final_refactor_src/assets/fonts/Sejonghospital-Light.ttf",
});

export const sejongHospitalBold = localFont({
  src: "@/final_refactor_src/assets/fonts/Sejonghospital-Bold.ttf",
});

export default globalFont;

// Font families used in the application
import localFont from "next/font/local";
import { Heebo } from "next/font/google";

const globalFont = Heebo({ subsets: ["latin"] });

// custom fonts
export const sejongHospitalLight = localFont({
  src: "../../assets/fonts/Sejonghospital-Light.ttf",
});

export const sejongHospitalBold = localFont({
  src: "../../assets/fonts/Sejonghospital-Bold.ttf",
});

export default globalFont;

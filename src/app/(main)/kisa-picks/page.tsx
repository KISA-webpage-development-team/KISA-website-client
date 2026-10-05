import type { Metadata } from "next";
import KisaPicksMap from "@/features/info-page/kisa-picks/KisaPicksMap";

export const metadata: Metadata = {
  title: "KISA Picks",
  description:
    "A KISA-curated Ann Arbor map for restaurants, cafes, stores, drinks, and things to do.",
};

export default function KisaPicksPage() {
  return <KisaPicksMap />;
}

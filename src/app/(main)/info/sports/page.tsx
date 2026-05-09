import type { Metadata } from "next";
import InfoOverviewTemplate from "@/features/info-page/components/InfoOverviewTemplate";
import { sportsInfoData } from "@/features/info-page/data/sportsInfoData";

export const metadata: Metadata = sportsInfoData.pageMetadata;

export default function SportsInfoPage() {
  return <InfoOverviewTemplate data={sportsInfoData.overview} />;
}

import type { Metadata } from "next";
import InfoOverviewTemplate from "@/features/info-page/components/InfoOverviewTemplate";
import { travelInfoData } from "@/features/info-page/data/travelInfoData";

export const metadata: Metadata = travelInfoData.pageMetadata;

export default function TravelInfoPage() {
  return <InfoOverviewTemplate data={travelInfoData.overview} />;
}

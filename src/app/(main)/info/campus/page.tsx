import type { Metadata } from "next";
import InfoOverviewTemplate from "@/features/info-page/components/InfoOverviewTemplate";
import { campusInfoData } from "@/features/info-page/data/campusInfoData";

export const metadata: Metadata = campusInfoData.pageMetadata;

export default function CampusInfoPage() {
  return <InfoOverviewTemplate data={campusInfoData.overview} />;
}

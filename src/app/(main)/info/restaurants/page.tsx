import type { Metadata } from "next";
import InfoOverviewTemplate from "@/features/info-page/components/InfoOverviewTemplate";
import { restaurantsInfoData } from "@/features/info-page/data/restaurantsInfoData";

export const metadata: Metadata = restaurantsInfoData.pageMetadata;

export default function RestaurantsInfoPage() {
  return <InfoOverviewTemplate data={restaurantsInfoData.overview} />;
}

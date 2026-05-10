import type { Metadata } from "next";
import InfoOverviewTemplate from "@/features/info-page/components/InfoOverviewTemplate";
import { housingInfoData } from "@/features/info-page/data/housingInfoData";

export const metadata: Metadata = housingInfoData.pageMetadata;

export default function HousingInfoPage() {
  return (
    <section className="flex flex-col gap-20">
      <InfoOverviewTemplate data={housingInfoData.overviewOnCampus} />
      <InfoOverviewTemplate data={housingInfoData.overviewOffCampus} />
    </section>
  );
}

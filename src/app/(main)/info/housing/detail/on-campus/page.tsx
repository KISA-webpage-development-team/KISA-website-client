import InfoDetailTemplate from "@/features/info-page/components/InfoDetailTemplate";
import { housingInfoData } from "@/features/info-page/data/housingInfoData";

export default function OnCampusHousingDetail() {
  return <InfoDetailTemplate data={housingInfoData.details.onCampus} />;
}

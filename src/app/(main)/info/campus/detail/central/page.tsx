import InfoDetailTemplate from "@/features/info-page/components/InfoDetailTemplate";
import { campusInfoData } from "@/features/info-page/data/campusInfoData";

export default function CentralCampusDetail() {
  return <InfoDetailTemplate data={campusInfoData.details.central} />;
}

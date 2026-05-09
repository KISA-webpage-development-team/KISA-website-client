import InfoDetailTemplate from "@/features/info-page/components/InfoDetailTemplate";
import { travelInfoData } from "@/features/info-page/data/travelInfoData";

export default function DetroitTravelDetail() {
  return <InfoDetailTemplate data={travelInfoData.details.detroit} />;
}

import InfoDetailTemplate from "@/features/info-page/components/InfoDetailTemplate";
import { sportsInfoData } from "@/features/info-page/data/sportsInfoData";

export default function SportsMiscSportsDetail() {
  return <InfoDetailTemplate data={sportsInfoData.details.miscSports} />;
}

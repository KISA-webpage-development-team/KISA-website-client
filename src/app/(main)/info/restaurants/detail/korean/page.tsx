import InfoDetailTemplate from "@/features/info-page/components/InfoDetailTemplate";
import { restaurantsInfoData } from "@/features/info-page/data/restaurantsInfoData";

export default function KoreanRestaurantsDetail() {
  return <InfoDetailTemplate data={restaurantsInfoData.details.korean} />;
}

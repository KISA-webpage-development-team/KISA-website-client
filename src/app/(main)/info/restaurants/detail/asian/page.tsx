import InfoDetailTemplate from "@/features/info-page/components/InfoDetailTemplate";
import { restaurantsInfoData } from "@/features/info-page/data/restaurantsInfoData";

export default function AsianRestaurantsDetail() {
  return <InfoDetailTemplate data={restaurantsInfoData.details.asian} />;
}

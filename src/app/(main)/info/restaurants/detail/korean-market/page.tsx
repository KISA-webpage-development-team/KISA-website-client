import InfoDetailTemplate from "@/features/info-page/components/InfoDetailTemplate";
import { restaurantsInfoData } from "@/features/info-page/data/restaurantsInfoData";

export default function KoreanMarketRestaurantsDetail() {
  return (
    <InfoDetailTemplate data={restaurantsInfoData.details.koreanMarket} />
  );
}

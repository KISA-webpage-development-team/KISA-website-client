import {
  Badge,
  Card,
  CardTitle,
  LinkButton,
  StatusView,
} from "@umichkisa-ds/web";

import FeaturedCarousel from "@/features/home/components/FeaturedCarousel";
import type { AdminCarouselItem } from "@/types/carousel";
import { NEW_CAROUSEL_ITEM_HREF } from "./carouselAdminRoutes";

type CarouselPreviewProps = {
  carouselItems: AdminCarouselItem[];
  isDirty: boolean;
};

/**
 * The real home carousel in admin mode, rendering the on-screen (possibly
 * unsaved) order of the live items.
 */
export default function CarouselPreview({
  carouselItems,
  isDirty,
}: CarouselPreviewProps) {
  const hasItems = carouselItems.length > 0;

  return (
    <Card
      role="region"
      aria-labelledby="carousel-preview-heading"
      className="flex flex-col gap-4"
    >
      <div className="flex items-center justify-between gap-2">
        <CardTitle as="h2" id="carousel-preview-heading">
          미리보기
        </CardTitle>
        {isDirty ? <Badge variant="warning">저장되지 않은 순서</Badge> : null}
      </div>
      {hasItems ? (
        <FeaturedCarousel items={carouselItems} adminMode />
      ) : (
        <StatusView
          variant="not-found"
          icon="image"
          title="게시 중인 항목이 없습니다."
          description="홈페이지 메인 배너가 현재 숨겨져 있습니다."
          action={
            <LinkButton href={NEW_CAROUSEL_ITEM_HREF} variant="secondary">
              새 항목 추가
            </LinkButton>
          }
        />
      )}
    </Card>
  );
}

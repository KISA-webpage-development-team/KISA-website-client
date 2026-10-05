import {
  Badge,
  Button,
  Card,
  CardTitle,
  LinkButton,
  StatusView,
} from "@umichkisa-ds/web";

import FeaturedCarousel from "@/features/home/components/FeaturedCarousel";
import type { AdminCarouselItem } from "@/types/carousel";
import {
  NEW_CAROUSEL_ITEM_HREF,
  editCarouselItemHref,
} from "./carouselAdminRoutes";

type CarouselPreviewProps = {
  carouselItems: AdminCarouselItem[];
  isDirty: boolean;
  onArchive: (carouselItem: AdminCarouselItem) => void;
  onRemove: (carouselItem: AdminCarouselItem) => void;
};

/**
 * The real home carousel in admin mode, rendering the on-screen (possibly
 * unsaved) order of the live items.
 */
export default function CarouselPreview({
  carouselItems,
  isDirty,
  onArchive,
  onRemove,
}: CarouselPreviewProps) {
  const hasItems = carouselItems.length > 0;

  const renderSlideActions = (carouselItem: AdminCarouselItem) => (
    <>
      <LinkButton
        href={editCarouselItemHref(carouselItem.carouselItemID)}
        variant="secondary"
        size="sm"
      >
        수정
      </LinkButton>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onArchive(carouselItem)}
      >
        보관
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onRemove(carouselItem)}
      >
        삭제
      </Button>
      {carouselItem.link ? (
        <LinkButton
          href={carouselItem.link}
          target="_blank"
          rel="noopener noreferrer"
          variant="tertiary"
          size="sm"
        >
          링크 열기
        </LinkButton>
      ) : null}
    </>
  );

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
        <FeaturedCarousel
          items={carouselItems}
          adminMode={{ renderSlideActions }}
        />
      ) : (
        <StatusView
          variant="not-found"
          icon="image"
          title="게시 중인 항목이 없습니다."
          description="홈페이지 캐러셀이 현재 숨겨져 있습니다."
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

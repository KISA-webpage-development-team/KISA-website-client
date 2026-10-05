import { Reorder, useDragControls } from "framer-motion";
import { Button, Card, IconButton, LinkButton } from "@umichkisa-ds/web";

import type { AdminCarouselItem } from "@/types/carousel";
import CarouselItemSummary from "./CarouselItemSummary";
import { editCarouselItemHref } from "./carouselAdminRoutes";

type LiveItemRowProps = {
  carouselItem: AdminCarouselItem;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: (carouselItemID: number) => void;
  onMoveDown: (carouselItemID: number) => void;
  onArchive: (carouselItem: AdminCarouselItem) => void;
  onRemove: (carouselItem: AdminCarouselItem) => void;
};

/**
 * One draggable Live row. Dragging starts only from the handle so the row's
 * buttons stay clickable; the up/down buttons are the keyboard path.
 */
export default function LiveItemRow({
  carouselItem,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onArchive,
  onRemove,
}: LiveItemRowProps) {
  const dragControls = useDragControls();
  const { carouselItemID, title } = carouselItem;

  return (
    <Reorder.Item
      value={carouselItem}
      dragListener={false}
      dragControls={dragControls}
    >
      <Card className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <IconButton
            icon="menu"
            size="sm"
            variant="tertiary"
            aria-label={`${title} 드래그하여 순서 변경`}
            onPointerDown={(event) => dragControls.start(event)}
            className="shrink-0 cursor-grab touch-none active:cursor-grabbing"
          />
          <CarouselItemSummary carouselItem={carouselItem} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <IconButton
            icon="chevron-down"
            size="sm"
            variant="tertiary"
            aria-label={`${title} 위로 이동`}
            className="rotate-180"
            disabled={isFirst}
            onClick={() => onMoveUp(carouselItemID)}
          />
          <IconButton
            icon="chevron-down"
            size="sm"
            variant="tertiary"
            aria-label={`${title} 아래로 이동`}
            disabled={isLast}
            onClick={() => onMoveDown(carouselItemID)}
          />
          <LinkButton
            href={editCarouselItemHref(carouselItemID)}
            variant="tertiary"
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
        </div>
      </Card>
    </Reorder.Item>
  );
}

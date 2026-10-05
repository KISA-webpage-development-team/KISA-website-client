import { Reorder } from "framer-motion";
import { Alert, Button, LoadingSpinner } from "@umichkisa-ds/web";

import type { AdminCarouselItem } from "@/types/carousel";
import LiveItemRow from "./LiveItemRow";

// Past this many live items the last ones are rarely seen before visitors
// scroll on. A warning only — saving is never blocked.
const LIVE_ITEM_SOFT_LIMIT = 6;

type LiveItemListProps = {
  carouselItems: AdminCarouselItem[];
  isDirty: boolean;
  isSavingOrder: boolean;
  onMoveUp: (carouselItemID: number) => void;
  onMoveDown: (carouselItemID: number) => void;
  onReorder: (carouselItems: AdminCarouselItem[]) => void;
  onResetToDateOrder: () => void;
  onDiscard: () => void;
  onSaveOrder: () => void;
  onArchive: (carouselItem: AdminCarouselItem) => void;
  onRemove: (carouselItem: AdminCarouselItem) => void;
};

/**
 * Live tab: the on-screen order of the live items with drag-and-drop and
 * up/down reordering. Nothing reaches the server until Save order.
 */
export default function LiveItemList({
  carouselItems,
  isDirty,
  isSavingOrder,
  onMoveUp,
  onMoveDown,
  onReorder,
  onResetToDateOrder,
  onDiscard,
  onSaveOrder,
  onArchive,
  onRemove,
}: LiveItemListProps) {
  const hasItems = carouselItems.length > 0;
  const isOverSoftLimit = carouselItems.length > LIVE_ITEM_SOFT_LIMIT;
  const lastIndex = carouselItems.length - 1;

  if (!hasItems) {
    return (
      <p className="type-body-sm py-6 text-center text-muted-foreground">
        게시 중인 항목이 없습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {isOverSoftLimit ? (
        <Alert
          variant="warning"
          title={`게시 중인 항목이 ${LIVE_ITEM_SOFT_LIMIT}개를 넘었습니다.`}
        >
          뒤쪽 항목은 방문자에게 거의 보이지 않습니다. 저장은 그대로 할 수
          있습니다.
        </Alert>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button
          variant="tertiary"
          size="sm"
          onClick={onResetToDateOrder}
          disabled={isSavingOrder}
        >
          종료일 순으로 정렬
        </Button>
        {isDirty ? (
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onDiscard}
              disabled={isSavingOrder}
            >
              변경 취소
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onSaveOrder}
              disabled={isSavingOrder}
            >
              {isSavingOrder ? <LoadingSpinner size="sm" /> : null}
              순서 저장
            </Button>
          </div>
        ) : null}
      </div>

      <Reorder.Group
        axis="y"
        values={carouselItems}
        onReorder={onReorder}
        className="flex flex-col gap-2"
      >
        {carouselItems.map((carouselItem, index) => (
          <LiveItemRow
            key={carouselItem.carouselItemID}
            carouselItem={carouselItem}
            isFirst={index === 0}
            isLast={index === lastIndex}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            onArchive={onArchive}
            onRemove={onRemove}
          />
        ))}
      </Reorder.Group>
    </div>
  );
}

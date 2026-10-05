import { useState } from "react";
import { Button, Card, FormItem, Input, LinkButton } from "@umichkisa-ds/web";

import type { AdminCarouselItem } from "@/types/carousel";
import CarouselItemSummary from "./CarouselItemSummary";
import { templateCarouselItemHref } from "./carouselAdminRoutes";

const SEARCH_INPUT_ID = "carousel-archive-search";

type ArchiveItemListProps = {
  carouselItems: AdminCarouselItem[];
  onRestore: (carouselItem: AdminCarouselItem) => void;
  onEdit: (carouselItem: AdminCarouselItem) => void;
  onRemove: (carouselItem: AdminCarouselItem) => void;
};

/**
 * Archive tab: archived and expired items, newest first, with a title search
 * that filters the already-loaded list in the browser.
 */
export default function ArchiveItemList({
  carouselItems,
  onRestore,
  onEdit,
  onRemove,
}: ArchiveItemListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredItems = normalizedQuery
    ? carouselItems.filter((carouselItem) =>
        carouselItem.title.toLowerCase().includes(normalizedQuery),
      )
    : carouselItems;

  const hasArchive = carouselItems.length > 0;
  const hasResults = filteredItems.length > 0;

  if (!hasArchive) {
    return (
      <p className="type-body-sm py-6 text-center text-muted-foreground">
        보관된 항목이 없습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <FormItem htmlFor={SEARCH_INPUT_ID} label="제목 검색">
        <Input
          id={SEARCH_INPUT_ID}
          type="search"
          placeholder="제목으로 검색"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </FormItem>

      {hasResults ? (
        <ul className="flex flex-col gap-2">
          {filteredItems.map((carouselItem) => (
            <li key={carouselItem.carouselItemID}>
              <Card className="flex flex-col gap-4 md:flex-row md:items-center">
                <CarouselItemSummary carouselItem={carouselItem} />
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onRestore(carouselItem)}
                  >
                    복원
                  </Button>
                  <LinkButton
                    href={templateCarouselItemHref(carouselItem.carouselItemID)}
                    variant="secondary"
                    size="sm"
                  >
                    템플릿으로 사용
                  </LinkButton>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEdit(carouselItem)}
                  >
                    수정
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
            </li>
          ))}
        </ul>
      ) : (
        <p className="type-body-sm py-6 text-center text-muted-foreground">
          검색 결과가 없습니다.
        </p>
      )}
    </div>
  );
}

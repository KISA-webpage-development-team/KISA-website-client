import {
  Button,
  LoadingSpinner,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@umichkisa-ds/web";

import type { AdminBoardYear } from "@/types/members";

type BoardYearBarProps = {
  /** Every board year, newest first. */
  years: AdminBoardYear[];
  selectedYear: AdminBoardYear;
  /** Unsaved order: switching or adding a year would drop it. */
  isLocked: boolean;
  isPublishing: boolean;
  onSelect: (startYear: number) => void;
  onNewYear: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
  onDelete: () => void;
};

const statusLabel = (boardYear: AdminBoardYear) =>
  boardYear.published ? "게시 중" : "게시 전";

/**
 * Board year picker with the selected year's status and its Publish,
 * Unpublish and Delete actions.
 */
export default function BoardYearBar({
  years,
  selectedYear,
  isLocked,
  isPublishing,
  onSelect,
  onNewYear,
  onPublish,
  onUnpublish,
  onDelete,
}: BoardYearBarProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={String(selectedYear.startYear)}
            onValueChange={(value) => onSelect(Number(value))}
            disabled={isLocked}
          >
            <SelectTrigger aria-label="연도 선택" className="w-56" />
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year.startYear} value={String(year.startYear)}>
                  {`${year.label} · ${statusLabel(year)}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {selectedYear.published ? (
            <Button variant="secondary" size="sm" onClick={onUnpublish}>
              게시 취소
            </Button>
          ) : (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={onPublish}
                disabled={isPublishing}
              >
                {isPublishing ? <LoadingSpinner size="sm" /> : null}
                게시
              </Button>
              <Button variant="destructive" size="sm" onClick={onDelete}>
                연도 삭제
              </Button>
            </>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={onNewYear}
            disabled={isLocked}
          >
            새 연도 추가
          </Button>
        </div>
      </div>
      {isLocked ? (
        <p className="type-caption text-muted-foreground">
          순서를 저장하거나 변경을 취소한 뒤 다른 연도로 바꿀 수 있습니다.
        </p>
      ) : null}
    </div>
  );
}

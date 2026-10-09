import { Reorder } from "framer-motion";
import { Badge, Button, LoadingSpinner } from "@umichkisa-ds/web";

import type { AdminBoardEntry, BoardTier } from "@/types/members";
import BoardEntryRow from "./BoardEntryRow";

const TIER_LABEL: Record<BoardTier, string> = {
  president: "회장단",
  member: "임원",
};

type BoardEntryListProps = {
  presidents: AdminBoardEntry[];
  members: AdminBoardEntry[];
  isDirty: boolean;
  isSavingOrder: boolean;
  onMoveUp: (boardMemberID: number) => void;
  onMoveDown: (boardMemberID: number) => void;
  onReorder: (tier: BoardTier, entries: AdminBoardEntry[]) => void;
  onDiscard: () => void;
  onSaveOrder: () => void;
  onEdit: (entry: AdminBoardEntry) => void;
  onDelete: (entry: AdminBoardEntry) => void;
};

/**
 * The selected board year's entries, president tier first, each tier with
 * drag-and-drop and up/down reordering. Nothing reaches the server until
 * Save order.
 */
export default function BoardEntryList({
  presidents,
  members,
  isDirty,
  isSavingOrder,
  onMoveUp,
  onMoveDown,
  onReorder,
  onDiscard,
  onSaveOrder,
  onEdit,
  onDelete,
}: BoardEntryListProps) {
  // The preview above already shows the empty state.
  if (presidents.length === 0 && members.length === 0) return null;

  const renderTier = (tier: BoardTier, entries: AdminBoardEntry[]) => {
    const headingID = `board-tier-${tier}-heading`;
    const lastIndex = entries.length - 1;

    return (
      <section aria-labelledby={headingID} className="flex flex-col gap-2">
        <h3
          id={headingID}
          className="type-h4 flex items-center gap-2 text-foreground"
        >
          {TIER_LABEL[tier]}
          <Badge size="sm">{entries.length}</Badge>
        </h3>
        {entries.length === 0 ? (
          <p className="type-body-sm text-muted-foreground">
            {TIER_LABEL[tier]}에 등록된 사람이 없습니다.
          </p>
        ) : (
          <Reorder.Group
            axis="y"
            values={entries}
            onReorder={(next: AdminBoardEntry[]) => onReorder(tier, next)}
            className="flex flex-col gap-2"
          >
            {entries.map((entry, index) => (
              <BoardEntryRow
                key={entry.boardMemberID}
                entry={entry}
                isFirst={index === 0}
                isLast={index === lastIndex}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </Reorder.Group>
        )}
      </section>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {isDirty ? (
        <div className="flex flex-wrap items-center justify-end gap-2">
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
      {renderTier("president", presidents)}
      {renderTier("member", members)}
    </div>
  );
}

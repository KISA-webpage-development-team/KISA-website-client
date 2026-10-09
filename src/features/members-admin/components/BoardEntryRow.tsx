import { Reorder, useDragControls } from "framer-motion";
import { format, parseISO } from "date-fns";
import { Badge, Button, Card, IconButton } from "@umichkisa-ds/web";

import type { AdminBoardEntry } from "@/types/members";

type BoardEntryRowProps = {
  entry: AdminBoardEntry;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: (boardMemberID: number) => void;
  onMoveDown: (boardMemberID: number) => void;
  onEdit: (entry: AdminBoardEntry) => void;
  onDelete: (entry: AdminBoardEntry) => void;
};

// The backend sends timestamps in UTC without an offset.
const formatTimestamp = (isoTimestamp: string) =>
  format(
    parseISO(
      /(Z|[+-]\d{2}:\d{2})$/.test(isoTimestamp)
        ? isoTimestamp
        : `${isoTimestamp}Z`,
    ),
    "yyyy.MM.dd",
  );

/**
 * One draggable entry row. Dragging starts only from the handle so the row's
 * buttons stay clickable; the up/down buttons are the keyboard path.
 */
export default function BoardEntryRow({
  entry,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
}: BoardEntryRowProps) {
  const dragControls = useDragControls();
  const { boardMemberID, name } = entry;
  const canReorder = !(isFirst && isLast);
  const editedLabel = `${entry.updatedBy ?? "알 수 없음"} 수정 · ${formatTimestamp(entry.updated)}`;

  return (
    <Reorder.Item value={entry} dragListener={false} dragControls={dragControls}>
      <Card className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {canReorder ? (
            <IconButton
              icon="menu"
              size="sm"
              variant="tertiary"
              aria-label={`${name} 드래그하여 순서 변경`}
              onPointerDown={(event) => dragControls.start(event)}
              className="shrink-0 cursor-grab touch-none active:cursor-grabbing"
            />
          ) : null}
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex min-w-0 flex-col">
              <div className="flex min-w-0 items-center gap-2">
                <p className="type-label truncate text-foreground">{name}</p>
                {entry.isLead ? (
                  <Badge variant="brand" size="sm" className="shrink-0">
                    팀장
                  </Badge>
                ) : null}
              </div>
              <p className="type-caption text-muted-foreground">
                {`${entry.major} · ${entry.classYear}`}
              </p>
              <p className="type-caption truncate text-muted-foreground">
                {editedLabel}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {entry.roles.map((role) => (
                <Badge key={role} variant="default" size="sm">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          {canReorder ? (
            <div className="flex items-center gap-2">
              <IconButton
                icon="chevron-down"
                size="sm"
                variant="tertiary"
                aria-label={`${name} 위로 이동`}
                className="rotate-180"
                disabled={isFirst}
                onClick={() => onMoveUp(boardMemberID)}
              />
              <IconButton
                icon="chevron-down"
                size="sm"
                variant="tertiary"
                aria-label={`${name} 아래로 이동`}
                disabled={isLast}
                onClick={() => onMoveDown(boardMemberID)}
              />
            </div>
          ) : null}
          <div className="ml-auto flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => onEdit(entry)}>
              수정
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(entry)}
            >
              삭제
            </Button>
          </div>
        </div>
      </Card>
    </Reorder.Item>
  );
}

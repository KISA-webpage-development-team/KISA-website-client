import {
  Badge,
  Button,
  Card,
  CardTitle,
  StatusView,
} from "@umichkisa-ds/web";

import BoardRoster from "@/features/about-page/components/BoardRoster";
import type { AdminBoardEntry, AdminBoardYear } from "@/types/members";

type BoardPreviewProps = {
  boardYear: AdminBoardYear;
  presidents: AdminBoardEntry[];
  members: AdminBoardEntry[];
  isDirty: boolean;
  onAddEntry: () => void;
};

/**
 * The public members page roster for the selected board year, published or
 * not, in the on-screen (possibly unsaved) order.
 */
export default function BoardPreview({
  boardYear,
  presidents,
  members,
  isDirty,
  onAddEntry,
}: BoardPreviewProps) {
  const hasEntries = presidents.length + members.length > 0;

  return (
    <Card
      role="region"
      aria-labelledby="board-preview-heading"
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle as="h2" id="board-preview-heading">
            미리보기 · {boardYear.label} Board
          </CardTitle>
          {isDirty ? <Badge variant="warning">저장되지 않은 순서</Badge> : null}
        </div>
        {boardYear.published ? null : (
          <p className="type-caption text-muted-foreground">
            게시 전이라 임원진 소개 페이지에는 아직 보이지 않습니다.
          </p>
        )}
      </div>
      {hasEntries ? (
        <BoardRoster presidents={presidents} members={members} />
      ) : (
        <StatusView
          variant="not-found"
          icon="user-round"
          title="등록된 임원이 없습니다."
          description={`${boardYear.label} 임원진에 사람을 추가하세요.`}
          action={
            <Button variant="secondary" onClick={onAddEntry}>
              임원 추가
            </Button>
          }
        />
      )}
    </Card>
  );
}

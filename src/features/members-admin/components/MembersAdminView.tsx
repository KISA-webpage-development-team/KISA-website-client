"use client";

import { useState } from "react";
import {
  Alert,
  Button,
  Container,
  LoadingSpinner,
  StatusView,
  toast,
} from "@umichkisa-ds/web";

import { publishBoardYear, saveBoardOrder } from "@/apis/members/mutations";
import { useAdminBoard } from "@/apis/members/swrHooks";
import type { CustomAxiosError } from "@/lib/axios/types";
import useAdmin from "@/lib/next-auth/useAdmin";
import type { AdminBoardEntry, AdminBoardYear } from "@/types/members";
import { useBoardOrder } from "../hooks/useBoardOrder";
import { roleSuggestions } from "../utils/boardYear";
import BoardEntryDeleteDialog from "./BoardEntryDeleteDialog";
import BoardEntryDialog, { type EntryDialogState } from "./BoardEntryDialog";
import BoardEntryList from "./BoardEntryList";
import BoardPreview from "./BoardPreview";
import BoardYearBar from "./BoardYearBar";
import BoardYearConfirmDialog from "./BoardYearConfirmDialog";
import NewBoardYearDialog from "./NewBoardYearDialog";

type YearAction = {
  kind: "unpublish" | "delete";
  boardYear: AdminBoardYear;
};

const NO_YEARS: AdminBoardYear[] = [];
const NO_ENTRIES: AdminBoardEntry[] = [];

/**
 * /admin/website/members — board year picker and actions, a preview of the
 * selected year, its entry list with ordering, and the year / entry dialogs.
 * Every mutation toasts, then revalidates the admin board.
 */
export default function MembersAdminView() {
  const { token } = useAdmin();
  const { years: loadedYears, isLoading, error, mutate } = useAdminBoard(token);
  const years = loadedYears ?? NO_YEARS;

  const [selectedStartYear, setSelectedStartYear] = useState<number | null>(
    null,
  );
  // Newest first, so the fallback is the newest year.
  const selectedYear =
    years.find((year) => year.startYear === selectedStartYear) ?? years[0];
  const order = useBoardOrder(selectedYear?.entries ?? NO_ENTRIES);

  const [isNewYearOpen, setIsNewYearOpen] = useState(false);
  const [yearAction, setYearAction] = useState<YearAction | null>(null);
  const [entryDialog, setEntryDialog] = useState<EntryDialogState | null>(
    null,
  );
  const [deletingEntry, setDeletingEntry] = useState<AdminBoardEntry | null>(
    null,
  );
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  const isLoadingList = isLoading || (!loadedYears && !error);
  const hasLoadError = !loadedYears && error !== undefined;
  const isLastPublishedYear =
    years.filter((year) => year.published).length === 1;

  const yearActionTarget = (kind: YearAction["kind"]) =>
    yearAction?.kind === kind ? yearAction.boardYear : null;

  const openAddEntry = () => setEntryDialog({ mode: "create" });

  const handleCreated = async (startYear: number) => {
    await mutate();
    setSelectedStartYear(startYear);
  };

  const handlePublish = async () => {
    if (!token || !selectedYear || isPublishing) return;
    setIsPublishing(true);
    try {
      await publishBoardYear(selectedYear.startYear, token);
      toast.success("게시되었습니다.");
    } catch {
      toast.error("게시에 실패했습니다.");
    }
    await mutate();
    setIsPublishing(false);
  };

  const handleSaveOrder = async () => {
    if (!token || !selectedYear || isSavingOrder) return;
    setIsSavingOrder(true);
    try {
      await saveBoardOrder(selectedYear.startYear, order.order, token);
      toast.success("순서가 저장되었습니다.");
    } catch (saveError) {
      const isStale = (saveError as CustomAxiosError).response?.status === 409;
      toast.error(
        isStale
          ? "페이지를 불러온 뒤 이 연도의 멤버가 바뀌었습니다. 목록을 다시 불러옵니다."
          : "순서 저장에 실패했습니다.",
      );
    }
    await mutate();
    setIsSavingOrder(false);
  };

  const renderContent = () => {
    if (isLoadingList) {
      return (
        <div className="flex justify-center py-6">
          <LoadingSpinner size="lg" />
        </div>
      );
    }

    if (hasLoadError) {
      return (
        <Alert variant="error" title="멤버 목록을 불러오지 못했습니다.">
          잠시 후 페이지를 새로고침해 주세요.
        </Alert>
      );
    }

    if (!selectedYear) {
      return (
        <StatusView
          variant="not-found"
          icon="user-round"
          title="등록된 멤버가 없습니다."
          description="새 연도를 추가해 멤버를 등록하세요."
          action={
            <Button variant="primary" onClick={() => setIsNewYearOpen(true)}>
              새 연도 추가
            </Button>
          }
        />
      );
    }

    return (
      <>
        <BoardYearBar
          years={years}
          selectedYear={selectedYear}
          isLocked={order.isDirty}
          isPublishing={isPublishing}
          onSelect={setSelectedStartYear}
          onNewYear={() => setIsNewYearOpen(true)}
          onPublish={handlePublish}
          onUnpublish={() =>
            setYearAction({ kind: "unpublish", boardYear: selectedYear })
          }
          onDelete={() =>
            setYearAction({ kind: "delete", boardYear: selectedYear })
          }
        />
        <BoardPreview
          boardYear={selectedYear}
          presidents={order.presidents}
          members={order.members}
          isDirty={order.isDirty}
          onAddEntry={openAddEntry}
        />
        <BoardEntryList
          presidents={order.presidents}
          members={order.members}
          isDirty={order.isDirty}
          isSavingOrder={isSavingOrder}
          onMoveUp={order.moveUp}
          onMoveDown={order.moveDown}
          onReorder={order.setTierOrder}
          onDiscard={order.discard}
          onSaveOrder={handleSaveOrder}
          onEdit={(entry) => setEntryDialog({ mode: "edit", entry })}
          onDelete={setDeletingEntry}
        />
      </>
    );
  };

  return (
    <Container as="section" size="lg">
      <div className="flex flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="type-h1 text-foreground">멤버 관리</h1>
          {selectedYear ? (
            <Button variant="primary" onClick={openAddEntry}>
              멤버 추가
            </Button>
          ) : null}
        </header>
        {renderContent()}
      </div>

      <NewBoardYearDialog
        open={isNewYearOpen}
        onOpenChange={setIsNewYearOpen}
        years={years}
        token={token}
        onCreated={handleCreated}
      />
      <BoardYearConfirmDialog
        kind="unpublish"
        boardYear={yearActionTarget("unpublish")}
        isLastPublishedYear={isLastPublishedYear}
        token={token}
        onOpenChange={(open) => {
          if (!open) setYearAction(null);
        }}
        onDone={mutate}
      />
      <BoardYearConfirmDialog
        kind="delete"
        boardYear={yearActionTarget("delete")}
        isLastPublishedYear={isLastPublishedYear}
        token={token}
        onOpenChange={(open) => {
          if (!open) setYearAction(null);
        }}
        onDone={mutate}
      />
      {selectedYear ? (
        <BoardEntryDialog
          state={entryDialog}
          startYear={selectedYear.startYear}
          roleSuggestions={roleSuggestions(years, selectedYear.startYear)}
          token={token}
          onClose={() => setEntryDialog(null)}
          onSaved={mutate}
        />
      ) : null}
      <BoardEntryDeleteDialog
        entry={deletingEntry}
        token={token}
        onOpenChange={(open) => {
          if (!open) setDeletingEntry(null);
        }}
        onDone={mutate}
      />
    </Container>
  );
}

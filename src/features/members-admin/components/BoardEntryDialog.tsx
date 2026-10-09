"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@umichkisa-ds/web";

import type { AdminBoardEntry } from "@/types/members";
import BoardEntryForm from "./BoardEntryForm";
import MembersLeaveDialog from "./MembersLeaveDialog";

export type EntryDialogState =
  | { mode: "create" }
  | { mode: "edit"; entry: AdminBoardEntry };

type BoardEntryDialogProps = {
  /** Null keeps the dialog closed. */
  state: EntryDialogState | null;
  startYear: number;
  roleSuggestions: string[];
  token: string | undefined;
  onClose: () => void;
  onSaved: () => Promise<unknown>;
};

/**
 * Adds or edits an entry. Closing with unsaved changes (the close button,
 * Esc, outside click or cancel) asks first.
 */
export default function BoardEntryDialog({
  state,
  startYear,
  roleSuggestions,
  token,
  onClose,
  onSaved,
}: BoardEntryDialogProps) {
  const [isDirty, setIsDirty] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const entry = state?.mode === "edit" ? state.entry : undefined;

  const close = () => {
    setIsLeaveDialogOpen(false);
    setIsDirty(false);
    onClose();
  };

  const requestClose = () => {
    if (isDirty) {
      setIsLeaveDialogOpen(true);
      return;
    }
    close();
  };

  const handleSaved = () => {
    void onSaved();
    close();
  };

  return (
    <>
      <Dialog
        open={state !== null}
        onOpenChange={(open) => {
          if (!open) requestClose();
        }}
      >
        <DialogContent size="md">
          <DialogTitle>{entry ? "임원 정보 수정" : "임원 추가"}</DialogTitle>
          {state ? (
            <BoardEntryForm
              key={entry?.boardMemberID ?? "new"}
              entry={entry}
              startYear={startYear}
              roleSuggestions={roleSuggestions}
              token={token}
              onCancel={requestClose}
              onSaved={handleSaved}
              onDirtyChange={setIsDirty}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <MembersLeaveDialog
        open={isLeaveDialogOpen}
        onOpenChange={setIsLeaveDialogOpen}
        onLeave={close}
      />
    </>
  );
}

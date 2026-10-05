"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@umichkisa-ds/web";

import type { AdminCarouselItem } from "@/types/carousel";
import CarouselItemForm from "./CarouselItemForm";
import CarouselLeaveDialog from "./CarouselLeaveDialog";

type CarouselEditDialogProps = {
  /** The item being edited; null keeps the dialog closed. */
  carouselItem: AdminCarouselItem | null;
  token: string | undefined;
  onClose: () => void;
};

/**
 * Edits a live or archived item in place. Closing with unsaved changes (the
 * close button, Esc, outside click or cancel) asks first.
 */
export default function CarouselEditDialog({
  carouselItem,
  token,
  onClose,
}: CarouselEditDialogProps) {
  const [isDirty, setIsDirty] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);

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

  return (
    <>
      <Dialog
        open={carouselItem !== null}
        onOpenChange={(open) => {
          if (!open) requestClose();
        }}
      >
        <DialogContent size="lg">
          <DialogTitle>배너 수정</DialogTitle>
          {carouselItem ? (
            <CarouselItemForm
              key={carouselItem.carouselItemID}
              mode="edit"
              initialItem={carouselItem}
              token={token}
              onCancel={requestClose}
              onSaved={close}
              onDirtyChange={setIsDirty}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <CarouselLeaveDialog
        open={isLeaveDialogOpen}
        onOpenChange={setIsLeaveDialogOpen}
        description="닫으면 수정한 내용과 새로 올린 이미지가 사라집니다."
        onLeave={close}
      />
    </>
  );
}

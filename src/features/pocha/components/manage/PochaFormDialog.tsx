"use client";

import { Dialog, DialogContent, DialogTitle } from "@umichkisa-ds/web";

import { PochaInfo } from "@/types/pocha";

interface PochaFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "update";
  existingPochaInfo?: PochaInfo;
  onSubmitSuccess?: () => void;
}

export default function PochaFormDialog({
  open,
  onOpenChange,
  mode,
}: PochaFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg">
        <DialogTitle>
          {mode === "create" ? "포차 생성하기" : "포차 수정하기"}
        </DialogTitle>
        <div className="type-body text-muted-foreground">
          placeholder — form moves here in Task 2
        </div>
      </DialogContent>
    </Dialog>
  );
}

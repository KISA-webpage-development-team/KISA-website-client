import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@umichkisa-ds/web";

type MembersLeaveDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLeave: () => void;
};

/** Confirms closing the entry form with unsaved changes. */
export default function MembersLeaveDialog({
  open,
  onOpenChange,
  onLeave,
}: MembersLeaveDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm">
        <DialogTitle>저장하지 않은 변경 사항이 있습니다.</DialogTitle>
        <DialogDescription>닫으면 입력한 내용이 사라집니다.</DialogDescription>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            계속 작성
          </Button>
          <Button variant="destructive" onClick={onLeave}>
            나가기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

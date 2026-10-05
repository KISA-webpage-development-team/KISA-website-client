import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@umichkisa-ds/web";

type CarouselLeaveDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: string;
  onLeave: () => void;
};

/** Confirms leaving a carousel item form with unsaved changes. */
export default function CarouselLeaveDialog({
  open,
  onOpenChange,
  description,
  onLeave,
}: CarouselLeaveDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm">
        <DialogTitle>저장하지 않은 변경 사항이 있습니다.</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
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

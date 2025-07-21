import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onReset?: () => void;
  onApply?: () => void;
  isApplyDisabled?: boolean;
}

export default function TagDetailModal({
  isOpen,
  onClose,
  title,
  children,
  onReset,
  onApply,
  isApplyDisabled = false,
}: FilterModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] min-w-[300px] w-fit flex flex-col bg-white">
        {/* Header */}
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className={`${sejongHospitalBold.className}`}>
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-hidden">{children}</div>

        {/* Footer */}
        <DialogFooter className="flex-shrink-0 flex flex-row items-center gap-2">
          <Button
            variant="outline"
            onClick={onReset || onClose}
            className={`${sejongHospitalBold.className} w-1/2 md:w-auto`}
          >
            초기화
          </Button>
          <Button
            onClick={onApply || onClose}
            disabled={isApplyDisabled}
            className={`${sejongHospitalBold.className} w-1/2 md:w-auto`}
          >
            적용
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

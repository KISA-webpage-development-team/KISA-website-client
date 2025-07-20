import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { X } from "lucide-react";

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg min-w-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2
            className={`text-lg font-semibold ${sejongHospitalBold.className}`}
          >
            {title}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">{children}</div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={onReset || onClose}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            초기화
          </button>
          <button
            onClick={onApply || onClose}
            disabled={isApplyDisabled}
            className={`px-4 py-2 rounded ${
              isApplyDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
}

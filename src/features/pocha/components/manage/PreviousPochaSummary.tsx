// PreviousPochaSummary.tsx
import {
  Card,
  CardDescription,
  CardTitle,
  Icon,
  cn,
} from "@umichkisa-ds/web";

import { PochaInfoWithoutStatus } from "@/types/pocha";
import {
  formatDateInTz,
  formatTimeInTz,
  tzAbbreviation,
} from "@/utils/formats/timezone";

interface PreviousPochaSummaryProps {
  pochaInfo: PochaInfoWithoutStatus;
  onClick?: () => void;
  isSelected?: boolean;
}

function PreviousPochaSummary({
  pochaInfo,
  onClick,
  isSelected,
}: PreviousPochaSummaryProps) {
  const start = pochaInfo.startDate;
  const end = pochaInfo.endDate;
  const sameDay = formatDateInTz(start) === formatDateInTz(end);
  const tz = tzAbbreviation(start);
  const dateLine = sameDay
    ? `${formatDateInTz(start)} · ${formatTimeInTz(start)} → ${formatTimeInTz(end)} (${tz})`
    : `${formatDateInTz(start)} ${formatTimeInTz(start)} → ${formatDateInTz(end)} ${formatTimeInTz(end)} (${tz})`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      hoverable
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn(
        "cursor-pointer",
        isSelected && "bg-brand-accent-subtle border-brand-primary"
      )}
    >
      <CardTitle as="h3">{pochaInfo.title}</CardTitle>
      {pochaInfo.description && (
        <CardDescription className="line-clamp-2">
          {pochaInfo.description}
        </CardDescription>
      )}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon name="calendar" size="sm" />
        <span className="type-body-sm">{dateLine}</span>
      </div>
    </Card>
  );
}

export default PreviousPochaSummary;

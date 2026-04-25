import { Icon } from "@umichkisa-ds/web";

import {
  formatDateInTz,
  formatTimeInTz,
  tzAbbreviation,
} from "@/utils/formats/timezone";

interface PochaDateBlockProps {
  label: string;
  date: Date | string;
}

export default function PochaDateBlock({ label, date }: PochaDateBlockProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon name="calendar" size="sm" />
        <span className="type-body-sm">{label}</span>
      </div>
      <p className="type-h4 font-semibold text-foreground">
        {formatDateInTz(date)}
      </p>
      <p className="type-body-sm text-muted-foreground">
        {formatTimeInTz(date)} ({tzAbbreviation(date)})
      </p>
    </div>
  );
}

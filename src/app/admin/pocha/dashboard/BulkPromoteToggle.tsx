"use client";

import { Button, Icon } from "@umichkisa-ds/web";

interface Props {
  selectMode: boolean;
  disabled: boolean;
  onToggle: () => void;
}

export default function BulkPromoteToggle({
  selectMode,
  disabled,
  onToggle,
}: Props) {
  return (
    <div className="flex items-center gap-4">
      <span className="type-body-sm text-muted-foreground hidden sm:inline">
        {selectMode ? "Tap cards to select" : "Promote multiple at once"}
      </span>
      <Button
        variant={selectMode ? "primary" : "secondary"}
        size="md"
        onClick={onToggle}
        disabled={disabled}
        aria-pressed={selectMode}
      >
        <Icon
          name={selectMode ? "check" : "circle-check"}
          size="sm"
          aria-hidden
        />
        {selectMode ? "Done" : "Bulk promote"}
      </Button>
    </div>
  );
}

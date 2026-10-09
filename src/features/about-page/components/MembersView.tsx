"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  LoadingSpinner,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  StatusView,
} from "@umichkisa-ds/web";

import type { BoardYear } from "@/types/members";
import BoardRoster from "./BoardRoster";

type MembersViewProps = {
  /** Published board years, newest first; null when the request failed. */
  boardYears: BoardYear[] | null;
};

/**
 * /about/members — the selected board year's roster, with a picker over the
 * published board years.
 */
export default function MembersView({ boardYears }: MembersViewProps) {
  const router = useRouter();
  const [isRetrying, startRetry] = useTransition();
  const [selectedStartYear, setSelectedStartYear] = useState<string | null>(
    null,
  );

  if (boardYears === null) {
    return (
      <StatusView
        variant="error"
        title="임원진 정보를 불러오지 못했습니다."
        description="잠시 후 다시 시도해 주세요."
        action={
          <Button
            variant="primary"
            onClick={() => startRetry(() => router.refresh())}
            disabled={isRetrying}
          >
            {isRetrying ? <LoadingSpinner size="sm" /> : null}
            다시 시도
          </Button>
        }
      />
    );
  }

  const boardYear =
    boardYears.find((year) => String(year.startYear) === selectedStartYear) ??
    boardYears[0];

  if (!boardYear) {
    return (
      <section className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="type-h1 text-foreground">KISA Board</h1>
          <p className="type-body text-muted-foreground">학생회 조직도</p>
        </header>
        <StatusView
          variant="not-found"
          icon="user-round"
          title="공개된 임원진이 없습니다."
          description="임원진 소개가 곧 업데이트됩니다."
        />
      </section>
    );
  }

  const presidents = boardYear.entries.filter(
    (entry) => entry.tier === "president",
  );
  const members = boardYear.entries.filter((entry) => entry.tier === "member");

  return (
    <section className="flex flex-col gap-6">
      {/* Page header — title + Korean subtitle, with year picker right-aligned */}
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="type-h1 text-foreground">{boardYear.label} Board</h1>
          <p className="type-body text-muted-foreground">학생회 조직도</p>
        </div>
        <div className="w-full md:w-auto">
          <Select
            value={String(boardYear.startYear)}
            onValueChange={setSelectedStartYear}
          >
            <SelectTrigger
              aria-label="Select cohort year"
              className="w-full md:w-40"
            />
            <SelectContent>
              {boardYears.map((year) => (
                <SelectItem key={year.startYear} value={String(year.startYear)}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <BoardRoster presidents={presidents} members={members} />
    </section>
  );
}

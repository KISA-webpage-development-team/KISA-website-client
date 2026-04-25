// PreviousPochaList.tsx
import { useMemo, useState } from "react";
import useSWR from "swr";
import { Alert, Card, Skeleton } from "@umichkisa-ds/web";

import { fetcher } from "@/lib/swr/fetchers";
import { PochaInfoWithoutStatus } from "@/types/pocha";
import PreviousPochaSummary from "./PreviousPochaSummary";
import PreviousPochaDetailDialog from "./PreviousPochaDetailDialog";

interface PreviousPochaListProps {
  onSelectPocha?: (pocha: PochaInfoWithoutStatus) => void;
  selectedPochaId?: number;
}

function PreviousPochaList({
  onSelectPocha,
  selectedPochaId,
}: PreviousPochaListProps) {
  const dateIso = useMemo(
    () => new Date().toISOString().split(".")[0],
    []
  );

  const [detailPocha, setDetailPocha] =
    useState<PochaInfoWithoutStatus | null>(null);

  const {
    data: rawList,
    error,
    isLoading,
  } = useSWR<PochaInfoWithoutStatus[]>(
    `/pocha/previous/?date=${dateIso}`,
    fetcher
  );

  const previousPochaList = useMemo(
    () =>
      rawList?.map((pocha) => ({
        ...pocha,
        startDate: new Date(pocha.startDate),
        endDate: new Date(pocha.endDate),
      })),
    [rawList]
  );

  const count = previousPochaList?.length ?? 0;
  const showDialog = !onSelectPocha;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <Card key={i} hoverable={false}>
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-1" />
            </Card>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="error" title="이전 포차 정보를 불러오지 못했습니다.">
          {error instanceof Error
            ? error.message
            : "잠시 후 다시 시도해주세요."}
        </Alert>
      );
    }

    if (!previousPochaList || previousPochaList.length === 0) {
      return <Alert variant="info">아직 진행된 포차가 없습니다.</Alert>;
    }

    return (
      <div className="flex flex-col gap-3">
        {previousPochaList.map((pocha) => (
          <PreviousPochaSummary
            key={pocha.pochaID}
            pochaInfo={pocha}
            onClick={
              onSelectPocha
                ? () => onSelectPocha(pocha)
                : () => setDetailPocha(pocha)
            }
            isSelected={selectedPochaId === pocha.pochaID}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="flex flex-col w-full gap-4">
      <div className="flex items-center gap-2">
        <h2 className="type-h2 font-semibold text-foreground">
          이전 포차 목록
        </h2>
        {!isLoading && !error && previousPochaList && (
          <span className="type-caption text-muted-foreground">{count}개</span>
        )}
      </div>

      {renderContent()}

      {showDialog && (
        <PreviousPochaDetailDialog
          pocha={detailPocha}
          onClose={() => setDetailPocha(null)}
        />
      )}
    </section>
  );
}

export default PreviousPochaList;

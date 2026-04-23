// PreviousPochaList.tsx
import { HorizontalDivider } from '@/components/ui/divider';
import { sejongHospitalBold } from '@/utils/fonts/textFonts';
import { useMemo } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/swr/fetchers';
import React from 'react';
import { PochaInfoWithoutStatus } from '@/types/pocha';
import PreviousPochaSummary from './PreviosPochaSummary';

interface PreviousPochaListProps {
  onSelectPocha?: (pocha: PochaInfoWithoutStatus) => void;
  selectedPochaId?: number;
}

function PreviousPochaList({
  onSelectPocha,
  selectedPochaId,
}: PreviousPochaListProps) {
  const dateIso = useMemo(
    () => new Date().toISOString().split('.')[0],
    []
  );

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

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return (
      <div className='flex flex-col w-full gap-6 items-center justify-center p-8'>
        <p className='text-red-500'>
          이전 포차 정보를 불러오는데 실패했습니다.
        </p>
        <p className='text-sm text-gray-500'>
          {error instanceof Error
            ? error.message
            : 'An unexpected error occurred.'}
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full gap-6'>
      <h2 className={`${sejongHospitalBold.className} text-2xl`}>
        이전 포차 목록
      </h2>

      {previousPochaList && previousPochaList.length > 0 ? (
        previousPochaList.map((pocha) => (
          <PreviousPochaSummary
            key={pocha.pochaID}
            pochaInfo={pocha}
            onClick={onSelectPocha ? () => onSelectPocha(pocha) : undefined}
            isSelected={selectedPochaId === pocha.pochaID}
          />
        ))
      ) : (
        <p className='text-gray-500'>이전 포차가 없습니다.</p>
      )}

      <HorizontalDivider />
    </div>
  );
}

export default PreviousPochaList;

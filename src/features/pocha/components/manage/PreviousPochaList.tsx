// PreviousPochaList.tsx
import { HorizontalDivider } from '@/components/ui/divider';
import { sejongHospitalBold } from '@/utils/fonts/textFonts';
import { useEffect, useState } from 'react';
import { getPreviousPochaList } from '@/apis/pocha/queries';
import React from 'react';
import { HookStatus } from '@/types/hook';
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
  const [status, setStatus] = useState<HookStatus>('loading');
  const [previousPochaList, setPreviousPochaList] =
    useState<PochaInfoWithoutStatus[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPreviousPochaList = async () => {
      try {
        const res = await getPreviousPochaList(new Date());
        setPreviousPochaList(res);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred.');
        }
      }
    };
    fetchPreviousPochaList();
  }, []);

  if (status === 'loading') {
    return <></>;
  }

  if (status === 'error') {
    return (
      <div className='flex flex-col w-full gap-6 items-center justify-center p-8'>
        <p className='text-red-500'>
          이전 포차 정보를 불러오는데 실패했습니다.
        </p>
        <p className='text-sm text-gray-500'>{error}</p>
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

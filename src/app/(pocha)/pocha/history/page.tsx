'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { UserSession } from '@/lib/next-auth/types';
import { sejongHospitalBold } from '@/utils/fonts/textFonts';
import { LoadingSpinner, NotAuthorized } from '@/components/ui/feedback';
import LoginButton from '@/components/layout/header/LoginButton';
import UserInfo from '@/components/layout/header/UserInfo';
import useAdmin from '@/lib/next-auth/useAdmin';
import PreviousPochaList from '@/features/pocha/components/manage/PreviousPochaList';
import OrderHistoryTable from '@/features/pocha/components/dashboard/OrderHistoryTable';
import OrderDashboard from '@/features/pocha/components/dashboard/OrderDashboard';
import { PochaInfoWithoutStatus } from '@/types/pocha';
export default function HistoryPage() {
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };
  const { isAdmin, token, status: adminStatus } = useAdmin();
  const [selectedPocha, setSelectedPocha] =
    useState<PochaInfoWithoutStatus | null>(null);

  if (adminStatus === 'loading') {
    return <LoadingSpinner />;
  }

  if (!isAdmin) {
    return <NotAuthorized />;
  }

  return (
    <section className='px-2 max-w-screen-2xl mx-auto mb-10'>
      <div className='flex items-center justify-between gap-4 mb-6'>
        <h1 className={`${sejongHospitalBold.className} text-3xl`}>
          포차 주문 기록
        </h1>
        <div className='flex items-center gap-4'>
          {session?.user?.email && session.user.name && session.user.image && (
            <UserInfo
              email={session.user.email}
              image={session.user.image}
              name={session.user.name}
            />
          )}
          <LoginButton isAuthenticated={Boolean(session)} />
        </div>
      </div>

      <div className='flex gap-6'>
        {/* Left: Previous Pocha List */}
        <div className='basis-1/3'>
          <PreviousPochaList
            onSelectPocha={setSelectedPocha}
            selectedPochaId={selectedPocha?.pochaID}
          />
        </div>

        {/* Right: Order History for Selected Pocha */}
        <div className='basis-2/3'>
          {selectedPocha ? (
            <div className='flex flex-col gap-6'>
              <div className='bg-white p-6 rounded-lg shadow'>
                <h2 className={`${sejongHospitalBold.className} text-2xl mb-2`}>
                  {selectedPocha.title}
                </h2>
                <p className='text-gray-600 mb-2'>
                  {selectedPocha.description}
                </p>
                <div className='text-sm text-gray-500'>
                  <div>
                    시작:{' '}
                    {new Date(selectedPocha.startDate).toLocaleString('ko-KR')}
                  </div>
                  <div>
                    종료:{' '}
                    {new Date(selectedPocha.endDate).toLocaleString('ko-KR')}
                  </div>
                </div>
              </div>
{/* PochaHistoryTable로 교체 */}
              <OrderHistoryTable
                token={token || ''}
                pochaID={selectedPocha.pochaID}
              />
            </div>
          ) : (
            <div className='flex items-center justify-center h-64 bg-gray-50 rounded-lg'>
              <p className='text-gray-500'>왼쪽에서 포차를 선택하세요</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@umichkisa-ds/web';
import { UserSession } from '@/lib/next-auth/types';
import LoginButton from '@/components/layout/header/LoginButton';
import UserInfo from '@/components/layout/header/UserInfo';
import useAdmin from '@/lib/next-auth/useAdmin';
import PreviousPochaList from '@/features/pocha/components/manage/PreviousPochaList';
import OrderHistoryTable from '@/features/pocha/components/dashboard/OrderHistoryTable';
import { PochaInfoWithoutStatus } from '@/types/pocha';

export default function HistoryPage() {
  const { data: session } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };
  const { token } = useAdmin();
  const [selectedPocha, setSelectedPocha] =
    useState<PochaInfoWithoutStatus | null>(null);

  return (
    <section className='mx-auto mb-10 w-full max-w-screen-2xl px-2'>
      <div className='mb-6 flex items-center justify-between gap-4'>
        <h1 className='type-h1 text-foreground'>포차 주문 기록</h1>
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
              <Card>
                <CardHeader>
                  <CardTitle as='h2'>{selectedPocha.title}</CardTitle>
                  {selectedPocha.description && (
                    <CardDescription>
                      {selectedPocha.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <dl className='type-caption flex flex-col gap-2 text-[--color-muted-foreground]'>
                    <div className='flex gap-2'>
                      <dt>시작</dt>
                      <dd>
                        {new Date(selectedPocha.startDate).toLocaleString(
                          'ko-KR',
                        )}
                      </dd>
                    </div>
                    <div className='flex gap-2'>
                      <dt>종료</dt>
                      <dd>
                        {new Date(selectedPocha.endDate).toLocaleString(
                          'ko-KR',
                        )}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <OrderHistoryTable
                token={token || ''}
                pochaID={selectedPocha.pochaID}
              />
            </div>
          ) : (
            <Card>
              <CardContent>
                <p className='type-body flex h-64 items-center justify-center text-[--color-muted-foreground]'>
                  왼쪽에서 포차를 선택하세요
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

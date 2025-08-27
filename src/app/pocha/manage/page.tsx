'use client';

import { useState } from 'react';

import useAdmin from '@/lib/next-auth/useAdmin';
import usePocha from '@/features/pocha/hooks/usePocha';

// ui components
import PochaInfoForm from '@/features/pocha/components/manage/PochaForm';
import { LoadingSpinner, NotAuthorized } from '@/components/ui/feedback';
import { PochaManageProvider } from '@/features/pocha/contexts/PochaManageContext';
import { CustomButton } from '@/components/ui/button';

import { sejongHospitalBold } from '@/utils/fonts/textFonts';

export default function ManagePage() {
  return (
    <section className='full-width-container px-2'>
      <h1 className={`${sejongHospitalBold.className} text-3xl`}>포차 관리</h1>

      <PochaManageProvider>
        <PochaManagePageContent />
      </PochaManageProvider>
    </section>
  );
}

function PochaManagePageContent() {
  const [isNewPochaFormOpen, setIsNewPochaFormOpen] = useState<boolean>(false);

  const { isAdmin, email, token, status: adminStatus } = useAdmin();
  const { pochaInfo, status: pochaStatus, error: pochaFetchError } = usePocha();

  const isLoading = adminStatus === 'loading' || pochaStatus === 'loading';
  const noPochaAvailable =
    pochaStatus === 'success' && Object.keys(pochaInfo).length === 0;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (pochaFetchError) {
    throw new Error(pochaFetchError);
  }

  // only admin can view this page
  if (!isAdmin) {
    return <NotAuthorized />;
  }

  return (
    <>
      {noPochaAvailable && (
        <div className='flex flex-col w-full gap-2'>
          <CustomButton
            text='새로운 포차 추가하기'
            onClick={() => setIsNewPochaFormOpen(true)}
          />
          {isNewPochaFormOpen && <PochaInfoForm />}
        </div>
      )}
    </>
  );
}

// if ongoing/scheduled pocha exists, hide 'add new pocha' button, show pocha summary and edit button
// if no pocha exists = response: {}, 204, show 'add new pocha' button

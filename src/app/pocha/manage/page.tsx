'use client';

import { useState, useEffect } from 'react';
import useAdmin from '@/lib/next-auth/useAdmin';
import usePocha from '@/features/pocha/hooks/usePocha';
import useMenu from '@/features/pocha/hooks/useMenu';
import { useSession } from 'next-auth/react';
import { UserSession } from '@/lib/next-auth/types';

// ui components
import PochaInfoForm from '@/features/pocha/components/manage/PochaForm';
import { LoadingSpinner, NotAuthorized } from '@/components/ui/feedback';
import { PochaManageProvider } from '@/features/pocha/contexts/PochaManageContext';
import { CustomButton } from '@/components/ui/button';
import PochaSummary from '@/features/pocha/components/manage/PochaSummary';
import { sejongHospitalBold } from '@/utils/fonts/textFonts';
import { usePochaManage } from '@/features/pocha/contexts/PochaManageContext';
import { MenuItemRaw } from '@/types/pocha';
import { convertMenuByCategoryToRawList } from '@/features/pocha/utils/convertMenuType';

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
  const [isEditing, setIsEditing] = useState<boolean>(false);
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
  const pochaid = pochaInfo?.pochaID;
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const { menuList, status: menuStatus } = useMenu(pochaid, session?.token);
  const { setMenus } = usePochaManage();
  useEffect(() => {
    if (!noPochaAvailable && menuStatus === 'success' && menuList) {
      setMenus(convertMenuByCategoryToRawList(menuList));
      //수정이
    }
  }, [noPochaAvailable, menuStatus]);

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
      {!noPochaAvailable && (
        <div>
          <PochaSummary pochaInfo={pochaInfo} />
          <CustomButton
            text='수정하기'
            onClick={() => {
              setIsEditing(true);
            }}
          />
          {isEditing && <PochaInfoForm existingPochaInfo={pochaInfo} />}
        </div>
      )}
    </>
  );
}

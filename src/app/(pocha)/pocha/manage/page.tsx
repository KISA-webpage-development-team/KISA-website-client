"use client";

import { useState, useEffect, useMemo } from "react";

// ui components
import PochaForm from "@/features/pocha/components/manage/PochaForm";
import { LoadingSpinner, NotAuthorized } from "@/components/ui/feedback";
import { CustomButton } from "@/components/ui/button";
import PochaSummary from "@/features/pocha/components/manage/PochaSummary";
import { PochaManageProvider } from "@/features/pocha/contexts/PochaManageContext";

// hooks
import useAdmin from "@/lib/next-auth/useAdmin";
import usePocha from "@/features/pocha/hooks/usePocha";
import useMenu from "@/features/pocha/hooks/useMenu";
import { usePochaManage } from "@/features/pocha/contexts/PochaManageContext";

import { convertMenuByCategoryToRawList } from "@/features/pocha/utils/convertMenuType";
import PochaManagePageHeader from "@/features/pocha/components/manage/PochaManagePageHeader";
import PreviousPochaList from "@/features/pocha/components/manage/PreviousPochaList";

export default function ManagePage() {
  return (
    <section className="px-2 max-w-screen-md mx-auto mb-10">
      <PochaManagePageHeader />
      <PochaManageProvider>
        <PochaManagePageContent />
      </PochaManageProvider>
    </section>
  );
}

function PochaManagePageContent() {
  const [isNewPochaFormOpen, setIsNewPochaFormOpen] = useState<boolean>(false);
  const [isEditPochaFormOpen, setIsEditPochaFormOpen] =
    useState<boolean>(false);

  const { isAdmin, token, status: adminStatus } = useAdmin();
  const { pochaInfo, status: pochaStatus, error: pochaFetchError } = usePocha();

  const { menuList, status: menuStatus } = useMenu(pochaInfo?.pochaID, token);

  const { setMenus } = usePochaManage();
  const menuListRaw = useMemo(
    () => convertMenuByCategoryToRawList(menuList || []),
    [menuList]
  );

  const isLoading = adminStatus === "loading" || pochaStatus === "loading";
  const noPochaAvailable =
    pochaStatus === "success" && Object.keys(pochaInfo).length === 0;

  // pre-fill pocha menu list if available (edit mode)
  useEffect(() => {
    if (!noPochaAvailable && menuStatus === "success" && menuList) {
      setMenus(menuListRaw);
    }
  }, [noPochaAvailable, menuStatus]);

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
        <div className="flex flex-col w-full gap-2">
          <CustomButton
            text="새로운 포차 추가하기"
            onClick={() => setIsNewPochaFormOpen(true)}
          />
          {isNewPochaFormOpen && <PochaForm />}
        </div>
      )}
      {!noPochaAvailable && (
        <div className="flex flex-col gap-6">
          <PochaSummary
            pochaInfo={pochaInfo}
            menuList={menuListRaw}
            isEditPochaFormOpen={isEditPochaFormOpen}
            setIsEditPochaFormOpen={setIsEditPochaFormOpen}
          />

          {isEditPochaFormOpen && (
            <PochaForm mode="update" existingPochaInfo={pochaInfo} />
          )}
        </div>
      )}
      <div className="mt-10">
        <PreviousPochaList />
      </div>
    </>
  );
}

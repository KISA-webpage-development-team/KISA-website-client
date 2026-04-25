"use client";

import { useState, useEffect, useMemo } from "react";
import { Button, Card, CardContent } from "@umichkisa-ds/web";

// ui components
import PochaFormDialog from "@/features/pocha/components/manage/PochaFormDialog";
import { LoadingSpinner, NotAuthorized } from "@/components/ui/feedback";
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
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogMode, setDialogMode] = useState<"create" | "update">("create");

  const { isAdmin, token, status: adminStatus } = useAdmin();
  const {
    pochaInfo,
    status: pochaStatus,
    error: pochaFetchError,
    refetch: refetchPocha,
  } = usePocha();

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
        <Card>
          <CardContent>
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <h3 className="type-h3 !font-semibold text-foreground">
                진행 중인 포차가 없습니다
              </h3>
              <p className="type-body text-muted-foreground">
                새로운 포차를 만들어 메뉴를 등록하세요.
              </p>
              <Button
                onClick={() => {
                  setDialogMode("create");
                  setDialogOpen(true);
                }}
              >
                새로운 포차 추가하기
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      {!noPochaAvailable && (
        <div className="flex flex-col gap-6">
          <PochaSummary
            pochaInfo={pochaInfo}
            menuList={menuListRaw}
            onEditClick={() => {
              setDialogMode("update");
              setDialogOpen(true);
            }}
          />
        </div>
      )}
      {dialogOpen && (
        <PochaFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          mode={dialogMode}
          existingPochaInfo={dialogMode === "update" ? pochaInfo : undefined}
          onSubmitSuccess={refetchPocha}
        />
      )}
      <div className="mt-10">
        <PreviousPochaList />
      </div>
    </>
  );
}

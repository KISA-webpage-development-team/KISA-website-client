"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { mutate } from "swr";
import {
  Button,
  Card,
  CardContent,
  Container,
  LoadingSpinner,
  StatusView,
} from "@umichkisa-ds/web";

// ui components
import PochaFormDialog from "@/features/pocha/components/manage/PochaFormDialog";
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
    <Container as="section" size="md">
      <PochaManagePageHeader />
      <PochaManageProvider>
        <PochaManagePageContent />
      </PochaManageProvider>
    </Container>
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

  // Sync the latest menu fetch into the manage context — runs on initial
  // load AND on every SWR revalidation (e.g. after PUT /pocha/{id}/ mutates
  // the menusStore in MSW). Without `menuListRaw` in deps, the context kept
  // showing the original fetch and the summary card never reflected edits.
  useEffect(() => {
    if (!noPochaAvailable && menuStatus === "success" && menuList) {
      setMenus(menuListRaw);
    }
  }, [noPochaAvailable, menuStatus, menuListRaw]);

  // Centralized post-submit refresh. The dialog calls this after a successful
  // create/update; we own the SWR revalidation here so cache keys stay
  // co-located with the hooks that read them.
  const handleSubmitSuccess = useCallback(async () => {
    refetchPocha();
    await mutate(
      (key) =>
        (typeof key === "string" && key.startsWith("/pocha/previous/")) ||
        (Array.isArray(key) &&
          typeof key[0] === "string" &&
          key[0].startsWith("/pocha/menu/"))
    );
  }, [refetchPocha]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (pochaFetchError) {
    throw new Error(pochaFetchError);
  }

  // only admin can view this page
  if (!isAdmin) {
    return <StatusView fullScreen variant="not-authorized" />;
  }

  return (
    <>
      {noPochaAvailable && (
        <Card>
          <CardContent>
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <h3 className="type-h3 font-semibold text-foreground">
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
          onSubmitSuccess={handleSubmitSuccess}
        />
      )}
      <div className="mt-10">
        <PreviousPochaList />
      </div>
    </>
  );
}

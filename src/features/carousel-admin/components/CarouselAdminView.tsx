"use client";

import { useState } from "react";
import {
  Alert,
  Badge,
  Container,
  LinkButton,
  LoadingSpinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  toast,
} from "@umichkisa-ds/web";

import { saveCarouselOrder } from "@/apis/carousel/mutations";
import { useAdminCarousel } from "@/apis/carousel/swrHooks";
import type { CustomAxiosError } from "@/lib/axios/types";
import useAdmin from "@/lib/next-auth/useAdmin";
import type { AdminCarouselItem } from "@/types/carousel";
import { useCarouselOrder } from "../hooks/useCarouselOrder";
import ArchiveItemList from "./ArchiveItemList";
import CarouselConfirmDialog from "./CarouselConfirmDialog";
import CarouselEditDialog from "./CarouselEditDialog";
import CarouselPreview from "./CarouselPreview";
import CarouselRestoreDialog from "./CarouselRestoreDialog";
import LiveItemList from "./LiveItemList";
import { NEW_CAROUSEL_ITEM_HREF } from "./carouselAdminRoutes";

type ItemAction = {
  kind: "edit" | "archive" | "remove" | "restore";
  carouselItem: AdminCarouselItem;
};

const NO_ITEMS: AdminCarouselItem[] = [];

/**
 * /admin/website/carousel — preview, Live and Archive tabs, and the
 * edit / archive / remove / restore dialogs. Every mutation toasts, then
 * revalidates the admin list.
 */
export default function CarouselAdminView() {
  const { token } = useAdmin();
  const { carousel, isLoading, error, mutate } = useAdminCarousel(token);
  const liveItems = carousel?.live ?? NO_ITEMS;
  const archiveItems = carousel?.archive ?? NO_ITEMS;
  const liveOrder = useCarouselOrder(liveItems);

  const [itemAction, setItemAction] = useState<ItemAction | null>(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  const isLoadingList = isLoading || (!carousel && !error);
  const hasLoadError = !carousel && error !== undefined;
  const isLastLiveItem = liveItems.length === 1;

  const actionItem = (kind: ItemAction["kind"]) =>
    itemAction?.kind === kind ? itemAction.carouselItem : null;

  const openAction =
    (kind: ItemAction["kind"]) => (carouselItem: AdminCarouselItem) =>
      setItemAction({ kind, carouselItem });

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) setItemAction(null);
  };

  const handleSaveOrder = async () => {
    if (!token || isSavingOrder) return;
    setIsSavingOrder(true);
    try {
      await saveCarouselOrder(
        liveOrder.items.map((carouselItem) => carouselItem.carouselItemID),
        token,
      );
      toast.success("순서가 저장되었습니다.");
    } catch (saveError) {
      const isStale = (saveError as CustomAxiosError).response?.status === 409;
      toast.error(
        isStale
          ? "페이지를 불러온 뒤 게시 중인 항목이 바뀌었습니다. 목록을 다시 불러옵니다."
          : "순서 저장에 실패했습니다.",
      );
    }
    await mutate();
    setIsSavingOrder(false);
  };

  const renderContent = () => {
    if (isLoadingList) {
      return (
        <div className="flex justify-center py-6">
          <LoadingSpinner size="lg" />
        </div>
      );
    }

    if (hasLoadError) {
      return (
        <Alert variant="error" title="배너 목록을 불러오지 못했습니다.">
          잠시 후 페이지를 새로고침해 주세요.
        </Alert>
      );
    }

    return (
      <>
        <CarouselPreview
          carouselItems={liveOrder.items}
          isDirty={liveOrder.isDirty}
        />

        <Tabs defaultValue="live" variant="underline">
          <TabsList>
            <TabsTrigger value="live" className="gap-2">
              게시 중<Badge size="sm">{liveItems.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="archive" className="gap-2">
              보관함
              <Badge size="sm">{archiveItems.length}</Badge>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="live" className="pt-4">
            <LiveItemList
              carouselItems={liveOrder.items}
              isDirty={liveOrder.isDirty}
              isSavingOrder={isSavingOrder}
              onMoveUp={liveOrder.moveUp}
              onMoveDown={liveOrder.moveDown}
              onReorder={liveOrder.setOrder}
              onResetToDateOrder={liveOrder.resetToDateOrder}
              onDiscard={liveOrder.discard}
              onSaveOrder={handleSaveOrder}
              onEdit={openAction("edit")}
              onArchive={openAction("archive")}
              onRemove={openAction("remove")}
            />
          </TabsContent>
          <TabsContent value="archive" className="pt-4">
            <ArchiveItemList
              carouselItems={archiveItems}
              onRestore={openAction("restore")}
              onEdit={openAction("edit")}
              onRemove={openAction("remove")}
            />
          </TabsContent>
        </Tabs>
      </>
    );
  };

  return (
    <Container as="section" size="lg">
      <div className="flex flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="type-h1 text-foreground">메인 배너 관리</h1>
          <LinkButton href={NEW_CAROUSEL_ITEM_HREF} variant="primary">
            새 항목 추가
          </LinkButton>
        </header>
        {renderContent()}
      </div>

      <CarouselEditDialog
        carouselItem={actionItem("edit")}
        token={token}
        onClose={() => setItemAction(null)}
      />
      <CarouselConfirmDialog
        kind="archive"
        carouselItem={actionItem("archive")}
        isLastLiveItem={isLastLiveItem}
        token={token}
        onOpenChange={handleDialogOpenChange}
        onDone={mutate}
      />
      <CarouselConfirmDialog
        kind="remove"
        carouselItem={actionItem("remove")}
        isLastLiveItem={isLastLiveItem}
        token={token}
        onOpenChange={handleDialogOpenChange}
        onDone={mutate}
      />
      <CarouselRestoreDialog
        carouselItem={actionItem("restore")}
        token={token}
        onOpenChange={handleDialogOpenChange}
        onDone={mutate}
      />
    </Container>
  );
}

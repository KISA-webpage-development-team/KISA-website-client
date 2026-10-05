"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  IconButton,
  LinkButton,
  LoadingSpinner,
  StatusView,
} from "@umichkisa-ds/web";

import { useCarouselItem } from "@/apis/carousel/swrHooks";
import useAdmin from "@/lib/next-auth/useAdmin";
import CarouselItemForm from "./CarouselItemForm";
import CarouselLeaveDialog from "./CarouselLeaveDialog";
import { CAROUSEL_ADMIN_HREF } from "./carouselAdminRoutes";

type CarouselItemFormViewProps = {
  /** Use as template: the item whose fields and image pre-fill the form. */
  sourceItemID: number | null;
};

/**
 * /admin/website/carousel/new (?from={id}). Loads the template source if any,
 * then mounts the form beside its live preview.
 */
export default function CarouselItemFormView({
  sourceItemID,
}: CarouselItemFormViewProps) {
  const router = useRouter();
  const { token } = useAdmin();
  const { item, error } = useCarouselItem(sourceItemID, token);
  const [isDirty, setIsDirty] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);

  const leave = () => {
    setIsLeaveDialogOpen(false);
    router.push(CAROUSEL_ADMIN_HREF);
  };

  const requestLeave = () => {
    if (isDirty) {
      setIsLeaveDialogOpen(true);
      return;
    }
    leave();
  };

  const renderContent = () => {
    if (sourceItemID !== null && !item) {
      if (error?.response?.status === 404) {
        return (
          <StatusView
            variant="not-found"
            title="템플릿으로 쓸 항목을 찾을 수 없습니다."
            description="삭제되었거나 존재하지 않는 항목입니다."
            action={
              <LinkButton href={CAROUSEL_ADMIN_HREF} variant="secondary">
                목록으로
              </LinkButton>
            }
          />
        );
      }
      if (error) {
        return (
          <StatusView
            variant="error"
            title="배너를 불러오지 못했습니다."
            description="잠시 후 페이지를 새로고침해 주세요."
            action={
              <LinkButton href={CAROUSEL_ADMIN_HREF} variant="secondary">
                목록으로
              </LinkButton>
            }
          />
        );
      }
      return (
        <div className="flex justify-center py-6">
          <LoadingSpinner size="lg" />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-6">
        <header className="flex items-start gap-2">
          <IconButton
            icon="arrow-left"
            aria-label="목록으로"
            variant="tertiary"
            onClick={requestLeave}
          />
          <div className="flex flex-col gap-2">
            <h1 className="type-h1 text-foreground">
              {item ? "템플릿으로 새 항목 만들기" : "새 배너"}
            </h1>
            {item ? (
              <p className="type-body-sm text-muted-foreground">
                &quot;{item.title}&quot; 항목을 바탕으로 새 항목을 만듭니다.
                원본 항목은 바뀌지 않습니다.
              </p>
            ) : null}
          </div>
        </header>
        <CarouselItemForm
          key={item?.carouselItemID ?? "new"}
          mode="create"
          initialItem={item}
          token={token}
          onCancel={requestLeave}
          onSaved={leave}
          onDirtyChange={setIsDirty}
        />
      </div>
    );
  };

  return (
    <Container as="section" size="xl">
      {renderContent()}
      <CarouselLeaveDialog
        open={isLeaveDialogOpen}
        onOpenChange={setIsLeaveDialogOpen}
        description="페이지를 나가면 입력한 내용과 새로 올린 이미지가 사라집니다."
        onLeave={leave}
      />
    </Container>
  );
}

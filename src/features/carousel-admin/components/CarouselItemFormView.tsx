"use client";

import {
  Container,
  LinkButton,
  LoadingSpinner,
  StatusView,
} from "@umichkisa-ds/web";

import { useCarouselItem } from "@/apis/carousel/swrHooks";
import useAdmin from "@/lib/next-auth/useAdmin";
import CarouselItemForm from "./CarouselItemForm";
import { CAROUSEL_ADMIN_HREF } from "./carouselAdminRoutes";

type CarouselItemFormViewProps =
  | {
      mode: "create";
      /** Use as template: the item whose fields and image pre-fill the form. */
      sourceItemID: number | null;
    }
  | { mode: "edit"; carouselItemID: number | null };

/**
 * /admin/website/carousel/new (?from={id}) and /admin/website/carousel/[id]/edit.
 * Loads the edited item or the template source, then mounts the form.
 */
export default function CarouselItemFormView(props: CarouselItemFormViewProps) {
  const { token } = useAdmin();
  const isEdit = props.mode === "edit";
  const loadItemID = isEdit ? props.carouselItemID : props.sourceItemID;
  const needsItem = isEdit || loadItemID !== null;
  const { item, error } = useCarouselItem(loadItemID, token);

  const renderNotFound = () => (
    <StatusView
      variant="not-found"
      title={
        isEdit
          ? "캐러셀 항목을 찾을 수 없습니다."
          : "템플릿으로 쓸 항목을 찾을 수 없습니다."
      }
      description="삭제되었거나 존재하지 않는 항목입니다."
      action={
        <LinkButton href={CAROUSEL_ADMIN_HREF} variant="secondary">
          목록으로
        </LinkButton>
      }
    />
  );

  const renderContent = () => {
    if (needsItem && loadItemID === null) return renderNotFound();

    if (needsItem && !item) {
      if (error?.response?.status === 404) return renderNotFound();
      if (error) {
        return (
          <StatusView
            variant="error"
            title="캐러셀 항목을 불러오지 못했습니다."
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
      <CarouselItemForm
        key={item?.carouselItemID ?? "new"}
        mode={props.mode}
        initialItem={item}
        token={token}
      />
    );
  };

  return (
    <Container as="section" size="xl">
      {renderContent()}
    </Container>
  );
}

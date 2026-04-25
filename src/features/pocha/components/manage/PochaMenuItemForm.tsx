import React, { useState, useMemo } from "react";
import { usePochaManage } from "../../contexts/PochaManageContext";
import { MenuItemRaw } from "@/types/pocha";
import { useTypedSession } from "@/lib/next-auth/useTypedSession";
import { defaultImageURL, getMenuImagePath } from "../../utils/getImagePath";
import {
  Button,
  DialogFooter,
  FileUpload,
  FileUploadValue,
  toast,
} from "@umichkisa-ds/web";
import { useForm, Form } from "@umichkisa-ds/form";
import {
  uploadMenuImage,
  deleteMenuImage,
} from "@/apis/cloudinary/menuImage";
import {
  isSameMenu,
  hasMenuWithNameKor,
  hasMenuWithNameEng,
} from "../../utils/menuIdentity";

interface PochaMenuItemFormProps {
  closeItemForm: () => void;
  mode?: "create" | "update";
  initialData?: MenuItemRaw;
  /**
   * Pre-fill `isImmediatePrep` when entering create mode from a specific
   * section (즉시 제공 vs 조리 필요). Ignored in update mode.
   */
  presetImmediatePrep?: boolean;
}

interface MenuItemFormValues {
  nameKor: string;
  nameEng: string;
  category: string;
  price: number;
  stock: number;
  isImmediatePrep: boolean;
  ageCheckRequired: boolean;
}

export default function PochaMenuItemForm({
  mode = "create",
  initialData,
  presetImmediatePrep,
  closeItemForm,
}: PochaMenuItemFormProps) {
  const { menus, setMenus } = usePochaManage();

  const { data: session } = useTypedSession();

  const initialFileUploadValue: FileUploadValue | null = useMemo(() => {
    if (mode === "update") {
      const existing = getMenuImagePath(initialData?.menuID);
      if (existing && existing !== defaultImageURL) {
        return { url: existing, publicId: "" };
      }
    }
    return null;
  }, [mode, initialData]);

  const [fileUploadValue, setFileUploadValue] =
    useState<FileUploadValue | null>(initialFileUploadValue);

  const handleUpload = async (file: File): Promise<FileUploadValue> => {
    if (!session?.token) {
      toast.error("로그인이 필요합니다.");
      throw new Error("Not logged in");
    }
    return uploadMenuImage(file, session.token);
  };

  const handleRemove = async (publicId: string): Promise<void> => {
    if (publicId && session?.token) {
      await deleteMenuImage(publicId, session.token);
    }
  };

  const methods = useForm<MenuItemFormValues>({
    mode: "onTouched",
    defaultValues: {
      nameKor: initialData?.nameKor ?? "",
      nameEng: initialData?.nameEng ?? "",
      category: initialData?.category ?? "",
      price: initialData?.price ?? 0,
      stock: initialData?.stock ?? 0,
      isImmediatePrep:
        mode === "update"
          ? Boolean(initialData?.isImmediatePrep)
          : Boolean(presetImmediatePrep),
      ageCheckRequired: Boolean(initialData?.ageCheckRequired),
    },
  });

  const {
    formState: { isValid, isSubmitting },
  } = methods;

  const onSubmit = async (values: MenuItemFormValues) => {
    const newMenuItem: MenuItemRaw = {
      nameKor: values.nameKor,
      nameEng: values.nameEng,
      category: values.category,
      price: Number(values.price),
      stock: Number(values.stock),
      isImmediatePrep: values.isImmediatePrep === true,
      ageCheckRequired: values.ageCheckRequired === true,
      imageURL: fileUploadValue?.url ?? "",
    };

    if (mode === "create") {
      setMenus([...menus, newMenuItem]);
      toast.success("메뉴가 추가되었습니다.");
    } else {
      const updatedMenus = menus.map((menu) =>
        initialData && isSameMenu(menu, initialData) ? newMenuItem : menu
      );
      setMenus(updatedMenus);
      toast.success("수정되었습니다.");
    }

    closeItemForm();
  };

  const handleCloseForm = () => {
    if (fileUploadValue?.publicId && session?.token) {
      deleteMenuImage(fileUploadValue.publicId, session.token);
    }
    closeItemForm();
  };

  return (
    <Form
      form={methods}
      onSubmit={onSubmit}
      className="flex flex-col gap-4 w-full overflow-hidden"
    >
      <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto">
          <div className="flex flex-col gap-4 w-full">
            <Form.Input
              name="nameKor"
              label="메뉴 이름 (한글)"
              rules={{
                required: "메뉴 이름을 입력하세요.",
                validate: (value: string) => {
                  if (mode === "create" && hasMenuWithNameKor(menus, value)) {
                    return "이미 존재하는 메뉴입니다.";
                  }
                  if (
                    mode === "update" &&
                    value !== initialData?.nameKor &&
                    hasMenuWithNameKor(menus, value)
                  ) {
                    return "이미 존재하는 메뉴입니다.";
                  }
                  return true;
                },
              }}
            />
            <Form.Input
              name="nameEng"
              label="메뉴 이름 (영어)"
              rules={{
                required: "메뉴 이름을 입력하세요.",
                validate: (value: string) => {
                  if (mode === "create" && hasMenuWithNameEng(menus, value)) {
                    return "이미 존재하는 메뉴입니다.";
                  }
                  if (
                    mode === "update" &&
                    value !== initialData?.nameEng &&
                    hasMenuWithNameEng(menus, value)
                  ) {
                    return "이미 존재하는 메뉴입니다.";
                  }
                  return true;
                },
              }}
            />
            <Form.Input
              name="category"
              label="카테고리"
              rules={{ required: "카테고리를 선택하세요." }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Form.Input
              name="price"
              type="number"
              label="가격 ($)"
              rules={{
                required: "가격을 입력하세요.",
                min: { value: 0, message: "가격 >= 0" },
                valueAsNumber: true,
              }}
            />
            <Form.Input
              name="stock"
              type="number"
              label="재고"
              rules={{
                required: "재고를 입력하세요.",
                min: { value: 0, message: "재고 >= 0" },
                valueAsNumber: true,
              }}
            />
            <div className="flex flex-row items-center gap-4">
              <Form.Checkbox name="isImmediatePrep" label="즉시 준비 가능" />
              <Form.Checkbox name="ageCheckRequired" label="나이 확인 필수" />
            </div>
          </div>

          <FileUpload
            value={fileUploadValue}
            onChange={setFileUploadValue}
            onUpload={handleUpload}
            onRemove={handleRemove}
          />
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="secondary"
          onClick={handleCloseForm}
        >
          취소
        </Button>
        <Button type="submit" disabled={!isValid || isSubmitting}>
          {mode === "create" ? "메뉴 추가하기" : "메뉴 수정하기"}
        </Button>
      </DialogFooter>
    </Form>
  );
}

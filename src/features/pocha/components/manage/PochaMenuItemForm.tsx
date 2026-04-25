import React, { useState, useMemo } from "react";
import { usePochaManage } from "../../contexts/PochaManageContext";
import { MenuItemRaw } from "@/types/pocha";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import { defaultImageURL, getMenuImagePath } from "../../utils/getImagePath";
import {
  Button,
  FileUpload,
  FileUploadValue,
  IconButton,
  toast,
} from "@umichkisa-ds/web";
import { useForm, Form } from "@umichkisa-ds/form";

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

  const { data: session } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

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

  const deleteImageFromCloudinary = async (publicId: string) => {
    try {
      if (!publicId || !session?.token) return;

      const response = await fetch("/api/delete-from-cloudinary", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) {
        console.error("Failed to delete image from Cloudinary");
      }
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    }
  };

  const handleUpload = async (file: File): Promise<FileUploadValue> => {
    if (!session?.token) {
      toast.error("로그인이 필요합니다.");
      throw new Error("Not logged in");
    }

    const timestamp = new Date().getTime();
    const fileName = `pocha-menu-${timestamp}`;
    const formattedFileName = fileName.replace(/ /g, "-");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("public_id", `/${formattedFileName}`);
    formData.append("folder", "temp");
    formData.append("resource_type", "image");

    const response = await fetch("/api/upload-to-cloudinary", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const result = await response.json();
    return { url: result.secure_url, publicId: result.public_id };
  };

  const handleRemove = async (publicId: string): Promise<void> => {
    if (publicId) {
      await deleteImageFromCloudinary(publicId);
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
        menu.nameEng === initialData?.nameEng ? newMenuItem : menu
      );
      setMenus(updatedMenus);
      toast.success("수정되었습니다.");
    }

    closeItemForm();
  };

  // Add this function to handle form closure cleanup
  const handleCloseForm = () => {
    // Cleanup: only delete if WE uploaded (publicId is set;
    // pre-existing images carry empty publicId)
    if (fileUploadValue?.publicId) {
      deleteImageFromCloudinary(fileUploadValue.publicId);
    }
    closeItemForm();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <IconButton
          icon="arrow-left"
          variant="tertiary"
          size="sm"
          aria-label="뒤로"
          onClick={handleCloseForm}
        />
        <h3 className="type-body !font-semibold text-foreground">
          {mode === "create" ? "메뉴 추가하기" : "메뉴 수정하기"}
        </h3>
      </div>

      <Form
        form={methods}
        onSubmit={onSubmit}
        className="flex flex-col gap-4 w-full"
      >
          <div className="flex flex-col gap-4 w-full">
            <Form.Input
              name="nameKor"
              label="메뉴 이름 (한글)"
              rules={{
                required: "메뉴 이름을 입력하세요.",
                validate: (value: string) => {
                  if (
                    mode === "create" &&
                    menus.some((m) => m.nameKor === value)
                  ) {
                    return "이미 존재하는 메뉴입니다.";
                  }
                  if (
                    mode === "update" &&
                    value !== initialData?.nameKor &&
                    menus.some((m) => m.nameKor === value)
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
                  if (
                    mode === "create" &&
                    menus.some((m) => m.nameEng === value)
                  ) {
                    return "이미 존재하는 메뉴입니다.";
                  }
                  if (
                    mode === "update" &&
                    value !== initialData?.nameEng &&
                    menus.some((m) => m.nameEng === value)
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

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseForm}
            >
              취소
            </Button>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {mode === "create" ? "추가" : "수정"}
            </Button>
          </div>
        </Form>
    </div>
  );
}

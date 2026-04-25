import React, { useState, useMemo } from "react";
import { usePochaManage } from "../../contexts/PochaManageContext";
import { MenuItemRaw } from "@/types/pocha";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import { HorizontalDivider } from "@/components/ui/divider";
import { defaultImageURL, getMenuImagePath } from "../../utils/getImagePath";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  toast,
} from "@umichkisa-ds/web";
import { useForm, Form } from "@umichkisa-ds/form";

interface PochaMenuItemFormProps {
  closeItemForm: () => void;
  mode?: "create" | "update";
  initialData?: MenuItemRaw;
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
  closeItemForm,
}: PochaMenuItemFormProps) {
  const { menus, setMenus } = usePochaManage();

  const [imageURL, setImageURL] = useState<string>("");
  const { data: session } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const [cloudinaryPublicId, setCloudinaryPublicId] = useState<string>("");

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

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const uploadImage = async (file: File) => {
    try {
      if (!session?.token) {
        toast.error("로그인이 필요합니다.");
        return;
      }

      setIsUploading(true);

      // Create a unique filename for Cloudinary
      const timestamp = new Date().getTime();
      const fileName = `pocha-menu-${timestamp}`;

      // format filename for cloudinary
      const formattedFileName = fileName.replace(/ /g, "-");

      // Create FormData for the upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("public_id", `/${formattedFileName}`);
      formData.append("folder", "temp");
      formData.append("resource_type", "image");

      // Upload to Cloudinary
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

      // Set the image URL from Cloudinary response
      setImageURL(result.secure_url);
      setCloudinaryPublicId(result.public_id);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
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
      isImmediatePrep: Boolean(initialData?.isImmediatePrep),
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
      imageURL,
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

  // Add this function to handle image removal
  const removeImage = () => {
    if (cloudinaryPublicId) {
      deleteImageFromCloudinary(cloudinaryPublicId);
    }
    setImageURL("");
    setCloudinaryPublicId("");
  };

  // Add this function to handle form closure cleanup
  const handleCloseForm = () => {
    // Clean up temporary image if modal is closed without submitting
    if (cloudinaryPublicId && imageURL) {
      deleteImageFromCloudinary(cloudinaryPublicId);
    }
    closeItemForm();
  };

  const showImageSection = useMemo(() => {
    if (mode === "create") {
      return true;
    }
    if (
      mode === "update" &&
      getMenuImagePath(initialData?.menuID) !== defaultImageURL
    ) {
      return true;
    }
    return false;
  }, [mode, initialData]);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) handleCloseForm();
      }}
    >
      {/* overflow-y-auto override: DS Dialog has no built-in bounded-scroll
          variant; form can exceed viewport on small screens. Outer portal
          already applies `p-4` so max-h-screen leaves adequate breathing room.
          Collect for DS fix (needs a scrollable Dialog variant). */}
      <DialogContent
        size="lg"
        className="max-h-screen overflow-y-auto"
      >
        <DialogTitle>
          {mode === "create" ? "메뉴 추가하기" : "메뉴 수정하기"}
        </DialogTitle>

        <Form
          form={methods}
          onSubmit={onSubmit}
          className="flex flex-col gap-4 w-full mt-4"
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

          {/* Image Upload Section */}
          {/* only shows when getMenuImagePath is not defaultImageURL */}
          {showImageSection && (
            <>
              <HorizontalDivider />
              <div className="flex flex-col gap-2">
                <label className="type-label !font-semibold text-foreground">
                  메뉴 이미지
                </label>
                <div className="flex flex-row gap-8">
                  {/* original image */}

                  {mode === "update" && (
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-gray-500">
                        기존 이미지
                      </span>
                      <img
                        src={getMenuImagePath(initialData?.menuID)}
                        alt="메뉴 이미지"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}

                  {/* upload image */}
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-500">새 이미지</span>
                    <div className="flex flex-row gap-2">
                      {imageURL && (
                        <div className="mt-2">
                          <img
                            src={imageURL}
                            alt="메뉴 이미지"
                            className="w-32 h-32 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="mt-2 text-sm text-red-600 hover:text-red-800"
                          >
                            이미지 제거
                          </button>
                        </div>
                      )}
                      <div className="flex flex-col gap-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            // only png
                            const file = e.target.files?.[0];
                            if (file) {
                              uploadImage(file);
                            }
                          }}
                          disabled={isUploading}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        {isUploading && (
                          <div className="text-sm text-blue-600">
                            이미지 업로드 중...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <Button
            type="submit"
            disabled={!isValid || isSubmitting || isUploading}
            className="w-full mt-4"
          >
            {mode === "create" ? "메뉴 추가하기" : "메뉴 수정하기"}
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

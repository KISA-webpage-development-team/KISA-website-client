import React, { useState } from "react";
import { usePochaManage } from "../../contexts/PochaManageContext";
import { useMemo } from "react";
import CustomField from "@/deprecated-components/shared/CustomField";
import { MenuItemRaw } from "@/types/pocha";
import { CustomButton } from "@/components/ui/button";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import PochaCloseIcon from "@/components/ui/icon/PochaCloseIcon";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import { HorizontalDivider } from "@/components/ui/divider";
import { defaultImageURL, getMenuImagePath } from "../../utils/getImagePath";
import Image from "next/image";
import VerticalDivider from "@/components/ui/divider/VerticalDivider";

interface PochaMenuItemFormProps {
  closeItemForm: () => void;
  mode?: "create" | "update";
  initialData?: MenuItemRaw;
}

const isDuplicate = (
  menus: MenuItemRaw[],
  nameKor: string,
  nameEng: string
) => {
  return menus.some(
    (menu) => menu.nameKor === nameKor || menu.nameEng === nameEng
  );
};

export default function PochaMenuItemForm({
  mode = "create",
  initialData,
  closeItemForm,
}: PochaMenuItemFormProps) {
  const { menus, setMenus } = usePochaManage();

  const [nameKor, setNameKor] = useState<string>(initialData?.nameKor || null);
  const [nameEng, setNameEng] = useState<string>(initialData?.nameEng || null);
  const [category, setCategory] = useState<string>(
    initialData?.category || null
  );
  const [price, setPrice] = useState<number>(initialData?.price || null);
  const [stock, setStock] = useState<number>(initialData?.stock || null);
  const [isImmediatePrep, setIsImmediatePrep] = useState<boolean>(
    Boolean(initialData?.isImmediatePrep) || null
  );
  const [ageCheckRequired, setAgeCheckRequired] = useState<boolean>(
    Boolean(initialData?.ageCheckRequired) || null
  );
  const [imageURL, setImageURL] = useState<string>("");
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  // Add this state variable after the imageURL state
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState<string>("");

  // Add this function after the uploadImage function
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

  // Add this state variable after the imageURL state
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Replace the empty uploadImage function with this complete implementation
  const uploadImage = async (file: File) => {
    try {
      if (!session?.token) {
        alert("로그인이 필요합니다.");
        return;
      }

      setIsUploading(true);

      // Create a unique filename for Cloudinary
      const timestamp = new Date().getTime();
      const fileName = `pocha-menu-${nameEng || "temp"}-${timestamp}`;

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
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
    }
  };
  const textFields = useMemo(
    () => [
      {
        value: nameKor,
        setValue: setNameKor,
        label: "메뉴 이름 (한글)",
        type: "text",
        isError: nameKor?.length === 0,
        errorMsg: "메뉴 이름을 입력하세요.",
        errorState: "error",
        required: true,
      },
      {
        value: nameEng,
        setValue: setNameEng,
        label: "메뉴 이름 (영어)",
        type: "text",
        // strictly english only
        isError: nameEng?.length === 0 || !/^[a-zA-Z]+$/.test(nameEng.trim()),
        errorMsg: "메뉴 이름을 입력하세요.",
        errorState: "error",
        required: true,
      },
      {
        value: category,
        setValue: setCategory,
        label: "카테고리",
        type: "text",
        isError: category?.length === 0,
        errorMsg: "카테고리를 선택하세요.",
        errorState: "error",
        required: true,
      },
    ],
    [nameKor, nameEng, category]
  );

  const numberFields = useMemo(
    () => [
      {
        value: price,
        setValue: setPrice,
        label: "가격 ($)",
        type: "number",
        isError: price < 0,
        errorMsg: "가격 >= 0",
        errorState: "error",
        required: true,
      },
      {
        value: stock,
        setValue: setStock,
        label: "재고",
        type: "number",
        isError: stock < 0,
        errorMsg: "재고 >= 0",
        errorState: "error",
        required: true,
      },
    ],
    [price, stock]
  );

  const checkboxFields = useMemo(
    () => [
      {
        value: isImmediatePrep,
        setValue: setIsImmediatePrep,
        label: "즉시 준비 가능",
        type: "checkbox",
        isError: false,
        errorMsg: "",
        errorState: "error",
      },
      {
        value: ageCheckRequired,
        setValue: setAgeCheckRequired,
        label: "나이 확인 필수",
        type: "checkbox",
        isError: false,
        errorMsg: "",
        errorState: "error",
      },
    ],
    [isImmediatePrep, ageCheckRequired]
  );

  const handleSubmitButtonClick = () => {
    const newMenuItem: MenuItemRaw = {
      nameKor,
      nameEng,
      category,
      price: parseFloat(price.toString()),
      stock: parseInt(stock.toString()),
      isImmediatePrep: isImmediatePrep === true ? true : false,
      ageCheckRequired: ageCheckRequired === true ? true : false,
      imageURL, // Add image URL
    };

    // check if the menu item already exists
    if (isDuplicate(menus, newMenuItem.nameKor, newMenuItem.nameEng)) {
      alert("이미 존재하는 메뉴입니다.");
      return;
    }

    setMenus([...menus, newMenuItem]);
    closeItemForm();
  };

  const handleUpdateButtonClick = () => {
    const newMenuItem: MenuItemRaw = {
      nameKor,
      nameEng,
      category,
      price: parseFloat(price.toString()),
      stock: parseInt(stock.toString()),
      isImmediatePrep: isImmediatePrep === true ? true : false,
      ageCheckRequired: ageCheckRequired === true ? true : false,
      imageURL, // Add image URL
    };

    // find the menu item to update
    const updatedMenus = menus.map((menu) => {
      if (menu.nameEng === initialData?.nameEng) {
        return newMenuItem;
      }
      return menu;
    });
    setMenus(updatedMenus);

    closeItemForm();
  };

  // form validity check
  const isFormValid = useMemo(() => {
    for (const field of textFields) {
      if (field.value === null || field.value === "" || field.isError) {
        return false;
      }
    }
    for (const field of numberFields) {
      if (
        field.value === null ||
        field.value?.toString() === "" ||
        field.isError
      ) {
        return false;
      }
    }

    return true;
  }, [textFields, numberFields]);

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
    <div className="fixed inset-0 z-[99999] bg-black/30">
      <div className="relative z-[100000] w-full h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-md text-black border-2 border-[#71717A] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-2 border-b border-gray-200">
            <h2 className={`text-xl ${sejongHospitalBold.className}`}>
              메뉴 추가하기
            </h2>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={handleCloseForm}
            >
              <PochaCloseIcon size="large" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-4 w-full">
                {textFields?.map((field, index) => (
                  <CustomField
                    key={`pocha-menu-item-textfield-${index}`}
                    {...field}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-4">
                {numberFields?.map((field, index) => (
                  <CustomField
                    key={`pocha-menu-item-numberfield-${index}`}
                    {...field}
                  />
                ))}
                <div className="flex flex-row items-center gap-4">
                  {checkboxFields?.map((field, index) => (
                    <CustomField
                      key={`pocha-menu-item-checkboxfield-${index}`}
                      {...field}
                    />
                  ))}
                </div>
              </div>

              {/* Image Upload Section */}
              {/* only shows when getMenuImagePath is not defaultImageURL */}
              {showImageSection && (
                <>
                  <HorizontalDivider />
                  <div className="flex flex-col gap-2">
                    <label
                      className={`font-medium ${sejongHospitalBold.className}`}
                    >
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

              <CustomButton
                text={mode === "create" ? "메뉴 추가하기" : "메뉴 수정하기"}
                onClick={
                  mode === "create"
                    ? handleSubmitButtonClick
                    : handleUpdateButtonClick
                }
                disabled={!isFormValid || isUploading}
                type="secondary"
                className={`${sejongHospitalBold.className} w-full mt-4`}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

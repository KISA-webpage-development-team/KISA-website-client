import React, { useState } from "react";
import { usePochaManage } from "../../contexts/PochaManageContext";
import { CustomButton, CustomImageButton } from "@/components/ui/button";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import { PencilIcon, TrashcanIcon } from "@/components/ui/icon";
import { MenuItemRaw } from "@/types/pocha";
import PochaMenuItemForm from "./PochaMenuItemForm";
import Image from "next/image";
import { getMenuImagePath } from "../../utils/getImagePath";

export default function PochaMenuItemList() {
  const { menus, setMenus } = usePochaManage();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuItemRaw | null>(null);

  const onDelete = (nameEngToDelete: string, nameKor: string) => {
    if (window.confirm(`정말 ${nameKor}을(를) 삭제하시겠습니까?`)) {
      const updatedMenus = menus.filter(
        (menu) => menu.nameEng !== nameEngToDelete
      );
      setMenus(updatedMenus);
    }
  };

  const onEdit = (menu: MenuItemRaw) => {
    setEditingMenu(menu);
    setIsEditFormOpen(true);
  };

  const handleItemFormClose = () => {
    setIsEditFormOpen(false);
    setEditingMenu(null);
  };

  // getMenuImagePath(menu.menuID)
  return (
    <div className="flex flex-col gap-4">
      {menus.map((menu) => (
        <div
          className="flex flex-row gap-6
         bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {/* <figure className="relative h-[6rem] w-[6rem] items-center flex-shrink-0">
            <Image
              src={getMenuImagePath(menu?.menuID)}
              alt={menu.nameEng}
              fill
              className="rounded-[15px] border-gray-300 shadow-md object-cover"
            />
          </figure> */}
          <div
            key={menu.nameEng}
            className={`flex flex-col ${sejongHospitalBold.className} gap-2 w-full
          `}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg">
                {menu.nameKor} ({menu.nameEng})
              </h3>
              <div className="flex items-center">
                <CustomImageButton
                  text="수정하기"
                  type="tertiary"
                  onClick={() => onEdit(menu)}
                  icon={<PencilIcon color="gray" />}
                  forSubmit={false}
                />
                <CustomImageButton
                  text="삭제하기"
                  type="tertiary"
                  onClick={() => onDelete(menu.nameEng, menu.nameKor)}
                  icon={<TrashcanIcon color="gray" />}
                  forSubmit={false}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 text-base">
              <span>
                카테고리:{" "}
                <span className={`${sejongHospitalLight.className}`}>
                  {menu.category}
                </span>
              </span>
              <span>
                가격:{" "}
                <span className={`${sejongHospitalLight.className}`}>
                  ${menu.price?.toLocaleString()}
                </span>
              </span>
              <span>
                재고:{" "}
                <span className={`${sejongHospitalLight.className}`}>
                  {menu.stock}개
                </span>
              </span>
              <div className="flex gap-4">
                <span>
                  즉시 준비:{" "}
                  <span className={`${sejongHospitalLight.className}`}>
                    {menu.isImmediatePrep ? "예" : "아니오"}
                  </span>
                </span>
                <span>
                  연령 확인:{" "}
                  <span className={`${sejongHospitalLight.className}`}>
                    {menu.ageCheckRequired ? "필요" : "불필요"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {isEditFormOpen && (
        <PochaMenuItemForm
          closeItemForm={handleItemFormClose}
          mode="update"
          initialData={editingMenu}
        />
      )}
    </div>
  );
}

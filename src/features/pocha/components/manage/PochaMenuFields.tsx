import React from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import { useState } from "react";
import PochaMenuItemForm from "./PochaMenuItemForm";
import { usePochaManage } from "../../contexts/PochaManageContext";
import PochaMenuItemList from "./PochaMenuItemList";
import { CustomButton } from "@/components/ui/button";
import ErrorDisplay from "@/deprecated-components/shared/ErrorDisplay";
export default function PochaMenuFields() {
  const [isItemFormOpen, setIsItemFormOpen] = useState<boolean>(false);
  const { menus } = usePochaManage();

  const handleItemAddButtonClick = () => {
    setIsItemFormOpen(true);
  };

  const handleItemFormClose = () => {
    setIsItemFormOpen(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`flex items-start gap-1
      ${sejongHospitalBold.className} text-xl`}
        >
          메뉴
        </h2>
        <CustomButton
          text="추가하기"
          onClick={handleItemAddButtonClick}
          className={`${sejongHospitalBold.className}`}
        />
      </div>

      {menus.length > 0 ? (
        <PochaMenuItemList />
      ) : (
        <ErrorDisplay text="최소 1개의 메뉴를 추가해주세요." state="error" />
      )}
      {isItemFormOpen && (
        <PochaMenuItemForm closeItemForm={handleItemFormClose} mode="create" />
      )}
    </div>
  );
}

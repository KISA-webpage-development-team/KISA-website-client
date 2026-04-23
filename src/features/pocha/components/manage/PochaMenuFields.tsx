import React, { useState } from "react";
import { Alert, Button } from "@umichkisa-ds/web";

import { usePochaManage } from "../../contexts/PochaManageContext";
import PochaMenuItemForm from "./PochaMenuItemForm";
import PochaMenuItemList from "./PochaMenuItemList";

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
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-h3 !font-semibold">메뉴</h2>
        <Button variant="secondary" onClick={handleItemAddButtonClick}>
          추가하기
        </Button>
      </div>

      {menus.length > 0 ? (
        <PochaMenuItemList />
      ) : (
        <Alert variant="warning">최소 1개의 메뉴를 추가해주세요.</Alert>
      )}
      {isItemFormOpen && (
        <PochaMenuItemForm closeItemForm={handleItemFormClose} mode="create" />
      )}
    </div>
  );
}

import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  IconButton,
} from "@umichkisa-ds/web";

import { MenuItemRaw } from "@/types/pocha";

import { usePochaManage } from "../../contexts/PochaManageContext";
import PochaMenuItemForm from "./PochaMenuItemForm";

export default function PochaMenuItemList() {
  const { menus, setMenus } = usePochaManage();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuItemRaw | null>(null);
  const [deletingMenu, setDeletingMenu] = useState<MenuItemRaw | null>(null);

  const onEdit = (menu: MenuItemRaw) => {
    setEditingMenu(menu);
    setIsEditFormOpen(true);
  };

  const onRequestDelete = (menu: MenuItemRaw) => {
    setDeletingMenu(menu);
  };

  const onConfirmDelete = () => {
    if (!deletingMenu) return;
    setMenus(menus.filter((menu) => menu.nameEng !== deletingMenu.nameEng));
    setDeletingMenu(null);
  };

  const handleDeleteDialogChange = (open: boolean) => {
    if (!open) setDeletingMenu(null);
  };

  const handleItemFormClose = () => {
    setIsEditFormOpen(false);
    setEditingMenu(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {menus.map((menu) => (
        <Card key={menu.nameEng}>
          <CardContent>
            <div className="flex flex-row gap-6">
              {/* <figure className="relative h-[6rem] w-[6rem] items-center flex-shrink-0">
                <Image
                  src={getMenuImagePath(menu?.menuID)}
                  alt={menu.nameEng}
                  fill
                  className="rounded-[15px] border-gray-300 shadow-md object-cover"
                />
              </figure> */}
              <div className="flex w-full flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="type-body !font-semibold text-foreground">
                    {menu.nameKor}
                    <span className="type-body !font-normal text-muted-foreground"> ({menu.nameEng})</span>
                  </h3>
                  <div className="flex items-center gap-1">
                    <IconButton
                      icon="pencil"
                      variant="tertiary"
                      size="sm"
                      aria-label="수정하기"
                      onClick={() => onEdit(menu)}
                    />
                    <IconButton
                      icon="trash-2"
                      variant="tertiary"
                      size="sm"
                      aria-label="삭제하기"
                      onClick={() => onRequestDelete(menu)}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 type-body-sm text-muted-foreground">
                  <span>{menu.category}</span>
                  <span aria-hidden>·</span>
                  <span>${menu.price?.toLocaleString()}</span>
                  <span aria-hidden>·</span>
                  <span>재고 {menu.stock}개</span>
                  {menu.isImmediatePrep && (
                    <Badge variant="outline" size="sm">즉시 제공</Badge>
                  )}
                  {menu.ageCheckRequired && (
                    <Badge variant="outline" size="sm">연령 확인</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {isEditFormOpen && (
        <PochaMenuItemForm
          closeItemForm={handleItemFormClose}
          mode="update"
          initialData={editingMenu}
        />
      )}

      <Dialog
        open={deletingMenu !== null}
        onOpenChange={handleDeleteDialogChange}
      >
        <DialogContent size="sm">
          <DialogTitle>메뉴 삭제</DialogTitle>
          <DialogDescription>
            {deletingMenu
              ? `정말 ${deletingMenu.nameKor}을(를) 삭제하시겠습니까?`
              : ""}
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setDeletingMenu(null)}
            >
              취소
            </Button>
            <Button variant="destructive" onClick={onConfirmDelete}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

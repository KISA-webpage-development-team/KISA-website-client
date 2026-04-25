import React, { useState } from "react";
import Image from "next/image";
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
import {
  defaultImageURL,
  getMenuImagePath,
} from "@/features/pocha/utils/getImagePath";

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

  const immediatePrepMenus = menus.filter((m) => m.isImmediatePrep);
  const cookingMenus = menus.filter((m) => !m.isImmediatePrep);

  return (
    <div className="flex flex-col gap-6">
      {immediatePrepMenus.length > 0 && (
        <MenuSection
          label="즉시 제공"
          count={immediatePrepMenus.length}
          items={immediatePrepMenus}
          onEdit={onEdit}
          onRequestDelete={onRequestDelete}
        />
      )}
      {cookingMenus.length > 0 && (
        <MenuSection
          label="조리 필요"
          count={cookingMenus.length}
          items={cookingMenus}
          onEdit={onEdit}
          onRequestDelete={onRequestDelete}
        />
      )}

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

function MenuSection({
  label,
  count,
  items,
  onEdit,
  onRequestDelete,
}: {
  label: string;
  count: number;
  items: MenuItemRaw[];
  onEdit: (menu: MenuItemRaw) => void;
  onRequestDelete: (menu: MenuItemRaw) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="type-body-sm text-muted-foreground">
        {label} · {count}
      </p>
      <div className="flex flex-col gap-4">
        {items.map((menu) => (
          <MenuRow
            key={menu.nameEng}
            menu={menu}
            onEdit={onEdit}
            onRequestDelete={onRequestDelete}
          />
        ))}
      </div>
    </div>
  );
}

function MenuRow({
  menu,
  onEdit,
  onRequestDelete,
}: {
  menu: MenuItemRaw;
  onEdit: (menu: MenuItemRaw) => void;
  onRequestDelete: (menu: MenuItemRaw) => void;
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-row gap-4">
          <MenuThumbnail menu={menu} />
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="type-body !font-semibold text-foreground">
                {menu.nameKor}
                <span className="type-body !font-normal text-muted-foreground">
                  {" "}
                  ({menu.nameEng})
                </span>
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

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 type-body-sm text-muted-foreground">
              <span>{menu.category}</span>
              <span aria-hidden>·</span>
              <span>${menu.price?.toLocaleString()}</span>
              <span aria-hidden>·</span>
              <span>재고 {menu.stock}개</span>
              {menu.ageCheckRequired && (
                <Badge variant="warning" size="sm">
                  연령 확인
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MenuThumbnail({ menu }: { menu: MenuItemRaw }) {
  const [src, setSrc] = useState<string>(
    menu.menuID ? getMenuImagePath(menu.menuID) : defaultImageURL
  );

  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-surface-subtle">
      <Image
        src={src}
        alt={menu.nameEng}
        fill
        sizes="64px"
        className="object-cover"
        onError={() => setSrc(defaultImageURL)}
      />
    </div>
  );
}

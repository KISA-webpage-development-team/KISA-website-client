/*
 * MenuList
 * - fetch necessary data for menu list (menuList, underAge)
 * - render MenuListItems for each category
 * - owns the selected-menu state for the detail Sheet
 */

import React, { memo, useState } from "react";

import MenuListItem from "./MenuListItem";
import MenuItemDetail from "./MenuItemDetail";
import { Skeleton, StatusView } from "@umichkisa-ds/web";

// Hooks
import { useAuth } from "@/lib/auth/authContext";
import useMenu from "../../hooks/useMenu";
import useUserAge from "../../hooks/useUserAge";

// Types
import { MenuItem, Cart } from "@/types/pocha";

interface MenuListProps {
  pochaid: number | undefined;
  cart: Cart | undefined;
}

function MenuListSkeleton() {
  return (
    <div className="w-full flex flex-col py-5 mb-16 gap-6">
      {Array.from({ length: 2 }).map((_, c) => (
        <div key={c} className="flex flex-col gap-2">
          <Skeleton className="h-6 w-32" />
          <div className="flex flex-col gap-4 mt-1">
            {Array.from({ length: 3 }).map((__, r) => (
              <div key={r} className="flex flex-row items-center gap-4 py-2">
                <Skeleton
                  variant="rectangular"
                  className="h-24 w-24 rounded-md"
                />
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MenuList({ pochaid, cart }: MenuListProps) {
  const { session } = useAuth();

  const { menuList, status: menuStatus } = useMenu(pochaid, session?.token);
  const { underAge, status: userStatus } = useUserAge(session);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);

  if (menuStatus === "loading" || userStatus === "loading") {
    return <MenuListSkeleton />;
  }

  if (menuStatus === "error" || userStatus === "error") {
    return (
      <StatusView
        variant="error"
        title="Could not load menu"
        description="메뉴를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
      />
    );
  }

  if (!menuList || menuList.length === 0) {
    return (
      <StatusView
        variant="not-found"
        icon="menu"
        title="No menu items yet"
        description="아직 등록된 메뉴가 없습니다."
      />
    );
  }

  return (
    <>
      <div className="w-full flex flex-col items-center mb-20 gap-6">
        {menuList.map(({ category, menusList }, categoryIdx) => (
          <div
            key={`${category}-${categoryIdx}`}
            className="w-full flex flex-col"
          >
            <span className="type-h3 text-foreground">{category}</span>
            <ul className="mt-1 flex flex-col divide-y divide-border">
              {menusList.map((menu, menuIdx) => (
                <MenuListItem
                  key={`${menu.menuID}-${menuIdx}`}
                  menu={menu}
                  underAge={!!underAge}
                  existingCartQty={cart?.[menu.menuID]?.quantity ?? 0}
                  setSelectedMenu={setSelectedMenu}
                  isPriority={categoryIdx === 0 && menuIdx < 3}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>

      <MenuItemDetail
        key={selectedMenu?.menuID ?? "closed"}
        session={session ?? undefined}
        selectedMenu={selectedMenu}
        onClose={() => setSelectedMenu(null)}
        pochaid={pochaid}
      />
    </>
  );
}

export default memo(MenuList);

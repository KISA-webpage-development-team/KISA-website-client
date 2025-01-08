/**
 * PochaHomeTabContent
 * - Displays the menu or order list depending on the active tab
 * - Displays the cart button if the active tab is menu
 */

import { MenuItem, PochaTab } from "@/types/pocha";
import MenuList from "@/features/pocha/components/menu/MenuList";
import OrderList from "@/features/pocha/components/order/OrderList";
import ViewCartButton from "./menu/ViewCartButton";
import { memo } from "react";

interface PochaHomeTabContentProps {
  activeTab: PochaTab;
  pochaID: number | undefined;
}

function PochaHomeTabContent({ activeTab, pochaID }: PochaHomeTabContentProps) {
  return (
    <div className="flex flex-col justify-between w-full min-h-screen relative">
      {/* Content Area with Scrollable Section */}
      {activeTab === "menu" ? (
        <>
          <MenuList pochaid={pochaID} />
          <ViewCartButton pochaID={pochaID} />
        </>
      ) : activeTab === "orders" ? (
        <OrderList pochaID={pochaID} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default memo(PochaHomeTabContent);

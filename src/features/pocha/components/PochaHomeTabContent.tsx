/**
 * PochaHomeTabContent
 * - Displays the menu or order list depending on the active tab
 * - Displays the cart button if the active tab is menu
 */

import { MenuItem, PochaTab } from "@/types/pocha";
import MenuList from "@/features/pocha/components/menu/MenuList";
import OrderList from "@/features/pocha/components/order/OrderList";
import ViewCartButton from "./menu/ViewCartButton";

interface PochaHomeTabContentProps {
  activeTab: PochaTab;
  pochaID: number | undefined;
  setSelectedMenu: (menu: MenuItem) => void;
}

export default function PochaHomeTabContent({
  activeTab,
  pochaID,
  setSelectedMenu,
}: PochaHomeTabContentProps) {
  return (
    <div className="flex flex-col justify-between w-full min-h-screen relative">
      {/* Content Area with Scrollable Section */}
      {activeTab === "menu" ? (
        <>
          <MenuList setSelectedMenu={setSelectedMenu} pochaid={pochaID} />
          {pochaID && <ViewCartButton pochaID={pochaID} />}
        </>
      ) : activeTab === "orders" ? (
        <OrderList pochaID={pochaID} />
      ) : (
        <></>
      )}
    </div>
  );
}

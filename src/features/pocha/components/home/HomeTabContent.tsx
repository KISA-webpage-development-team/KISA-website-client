/**
 * HomeTabContent
 * - Renders TabsContent panels for the Pocha Home page.
 * - Menu tab also renders the always-visible View Cart button.
 */

import { TabsContent } from "@umichkisa-ds/web";
import MenuList from "@/features/pocha/components/menu/MenuList";
import OrderList from "@/features/pocha/components/order/OrderList";
import ViewCartButton from "@/features/pocha/components/menu/ViewCartButton";
import { memo } from "react";

interface HomeTabContentProps {
  pochaID: number | undefined;
}

function HomeTabContent({ pochaID }: HomeTabContentProps) {
  return (
    <>
      <TabsContent value="menu" className="flex flex-col">
        <MenuList pochaid={pochaID} />
        <ViewCartButton pochaID={pochaID} />
      </TabsContent>
      <TabsContent value="orders">
        <OrderList pochaID={pochaID} />
      </TabsContent>
    </>
  );
}

export default memo(HomeTabContent);

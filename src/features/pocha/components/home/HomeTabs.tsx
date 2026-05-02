/**
 * HomeTabs
 * - Renders the DS TabsList + TabsTrigger pair for Pocha Home Page.
 * - Tab state is URL-sourced; the parent owns the Tabs root and onValueChange.
 */

import React from "react";
import { TabsList, TabsTrigger } from "@umichkisa-ds/web";

export default function HomeTabs() {
  return (
    <TabsList variant="underline" fullWidth>
      <TabsTrigger value="menu" variant="underline">
        Menu
      </TabsTrigger>
      <TabsTrigger value="orders" variant="underline">
        Orders
      </TabsTrigger>
    </TabsList>
  );
}

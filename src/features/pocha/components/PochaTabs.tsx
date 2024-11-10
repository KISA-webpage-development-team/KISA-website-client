"use client";

import React from "react";
import { useState } from "react";

export default function PochaTabs() {
  const [activeTab, setActiveTab] = useState<"menu" | "orders">("menu");
  return (
    <div>
      <button onClick={(e) => setActiveTab("menu")}>Menu</button>
      <button onClick={(e) => setActiveTab("orders")}>Orders</button>
    </div>
  );
}

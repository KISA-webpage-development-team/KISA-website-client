import { useCallback, useEffect, useState } from "react";
import { PochaDashboardTab } from "@/types/pocha";

export function useDashboardSelectMode(currentTab: PochaDashboardTab) {
  const [selectMode, setSelectMode] = useState(false);
  const [isPromotingFood, setIsPromotingFood] = useState(false);
  const [isPromotingDrink, setIsPromotingDrink] = useState(false);
  const isPromoting = isPromotingFood || isPromotingDrink;

  const handleToggle = useCallback(() => {
    if (isPromoting) return;
    setSelectMode((prev) => !prev);
  }, [isPromoting]);

  const handleEnter = useCallback(() => {
    if (isPromoting) return;
    setSelectMode(true);
  }, [isPromoting]);

  // Auto-exit select mode when leaving the Orders tab. The grids' existing
  // selectMode-false effect clears their selectedIds.
  useEffect(() => {
    if (currentTab !== "orders" && selectMode) {
      setSelectMode(false);
    }
  }, [currentTab, selectMode]);

  return {
    selectMode,
    isPromoting,
    handleToggle,
    handleEnter,
    setIsPromotingFood,
    setIsPromotingDrink,
  };
}

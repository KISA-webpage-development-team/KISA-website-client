"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button, Icon, Switch, toast } from "@umichkisa-ds/web";
import { useAuth, MOCK_SESSION } from "@/lib/auth/authContext";
import usePochaID from "@/features/pocha/hooks/usePochaID";
import type { OrderItem } from "@/types/pocha";

const DASHBOARD_PATH = "/pocha/dashboard";

export function MockAuthToggle() {
  const { isMockMode, isAuthenticated, isAdmin, toggle, toggleIsAdmin } =
    useAuth();
  const pathname = usePathname();
  const { pochaID } = usePochaID();
  const [isSimulating, setIsSimulating] = useState(false);

  if (!isMockMode) return null;

  const onDashboard = pathname === DASHBOARD_PATH;
  const showSimulateButton = isAuthenticated && isAdmin && onDashboard;

  const handleSimulate = async () => {
    if (pochaID == null) {
      toast.error("활성 포차를 찾을 수 없습니다");
      return;
    }

    setIsSimulating(true);
    try {
      const res = await fetch(
        `/api/v2/pocha/_mock/spawn-order/${pochaID}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${MOCK_SESSION.token}` },
        }
      );
      if (!res.ok) throw new Error(`spawn-order failed: ${res.status}`);
      const orderItem = (await res.json()) as OrderItem;
      window.dispatchEvent(
        new CustomEvent<OrderItem>("mock:new-order", { detail: orderItem })
      );
      toast.success("주문이 추가되었습니다");
    } catch (error) {
      console.error("Simulate order error:", error);
      toast.error("주문 추가에 실패했습니다");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div
      role="group"
      aria-label="Mock authentication toggle"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 rounded-lg border border-border-strong bg-surface px-3 py-2 shadow-md"
    >
      <div className="flex items-center gap-2">
        <Switch
          checked={isAuthenticated}
          onChange={toggle}
          aria-label="Toggle mock authentication"
        />
        <span className="relative type-body-sm text-foreground">
          <span aria-hidden="true" className="invisible">
            Mock: {MOCK_SESSION.user!.email}
          </span>
          <span className="absolute inset-0">
            {isAuthenticated
              ? `Mock: ${MOCK_SESSION.user!.email}`
              : "Mock: logged out"}
          </span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={isAdmin}
          onChange={toggleIsAdmin}
          disabled={!isAuthenticated}
          aria-label="Toggle mock admin"
        />
        <span className="type-body-sm text-foreground">Mock: admin</span>
      </div>
      {showSimulateButton && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleSimulate}
          disabled={isSimulating}
        >
          <Icon name="plus" size="sm" />
          Simulate order
        </Button>
      )}
    </div>
  );
}

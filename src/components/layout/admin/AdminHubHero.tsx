"use client";

import { forwardRef } from "react";

type Mode = "default" | "apps";

type Props = {
  mode: Mode;
  onToggle: () => void;
};

/**
 * Hero block for the admin hub. Renders one of two modes ("default" / "apps").
 * The inline toggle link is forwarded a ref so the parent can programmatically
 * focus the matching control after a mode swap.
 */
const AdminHubHero = forwardRef<HTMLButtonElement, Props>(function AdminHubHero(
  { mode, onToggle },
  ref
) {
  if (mode === "default") {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="type-display text-foreground">
          안녕하세요, 관리자님
        </h1>
        <p className="type-body text-muted-foreground">
          KISA 운영을 위한 관리자 홈입니다.
        </p>
        <div>
          <button
            ref={ref}
            type="button"
            onClick={onToggle}
            className="type-label text-link underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm"
          >
            둘러보기 →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="type-display text-foreground">
        KISA가 운영하는 서비스
      </h1>
      <p className="type-body text-muted-foreground">
        KISA가 학생들에게 제공하는 사용자 서비스를 둘러보세요.
      </p>
      <div>
        <button
          ref={ref}
          type="button"
          onClick={onToggle}
          className="type-label text-link underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm"
        >
          ← 관리자로 돌아가기
        </button>
      </div>
    </div>
  );
});

export default AdminHubHero;

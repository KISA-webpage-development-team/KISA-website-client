"use client";

import { forwardRef } from "react";

type Mode = "default" | "apps";

type Props = {
  mode: Mode;
  onToggle: () => void;
};

const COPY = {
  default: {
    title: "안녕하세요, 관리자님",
    subtitle:
      "KISA 운영을 한곳에서 — 포차 운영, 운영 데이터, 채용 큐레이션까지 관리할 수 있는 어드민 홈입니다.",
    toggle: "KISA 사용자 서비스 둘러보기 →",
  },
  apps: {
    title: "KISA가 운영하는 서비스",
    subtitle:
      "KISA가 미시간대 학생들에게 제공하는 모든 사용자용 서비스를 한곳에서 살펴보세요.",
    toggle: "← 관리자 홈으로 돌아가기",
  },
} as const;

/**
 * Hero cell for the admin hub. Occupies the first cell of the hub grid;
 * the inline toggle link is forwarded a ref so the parent can programmatically
 * focus the matching control after a mode swap.
 */
const AdminHubHero = forwardRef<HTMLButtonElement, Props>(function AdminHubHero(
  { mode, onToggle },
  ref
) {
  const copy = COPY[mode];

  return (
    <div className="flex flex-col justify-center gap-4 px-2 py-4">
      <h1 className="type-h1 text-foreground">{copy.title}</h1>
      <p className="type-body text-muted-foreground">{copy.subtitle}</p>
      <div className="mt-2">
        <button
          ref={ref}
          type="button"
          onClick={onToggle}
          className="type-label rounded-sm text-link underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          {copy.toggle}
        </button>
      </div>
    </div>
  );
});

export default AdminHubHero;

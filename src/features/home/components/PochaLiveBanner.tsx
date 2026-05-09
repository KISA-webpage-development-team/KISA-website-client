"use client";

import { useEffect, useState } from "react";

import { Container, Icon, IconButton, LinkButton } from "@umichkisa-ds/web";

import usePocha from "@/features/pocha/hooks/usePocha";

const STORAGE_KEY_PREFIX = "kisa.pocha.banner.dismissed.";

function dismissalKey(pochaID: number): string {
  return `${STORAGE_KEY_PREFIX}${pochaID}`;
}

/**
 * Site-wide live-pocha banner pinned full-bleed directly under the Header.
 *
 * Single thin row: pulse dot · "포차 진행중" · pocha title · 입장하기 CTA · X.
 * The title shrinks/truncates so the whole bar fits one line down to 375px.
 *
 * Pocha info is fetched client-side via `usePocha` so MSW (browser-only
 * service worker) can intercept the request in mock mode. Dismissal persists
 * per pochaID in localStorage so a brand-new pocha event re-shows the
 * banner; the same event stays dismissed across reloads.
 */
export default function PochaLiveBanner() {
  const { pochaInfo, status } = usePocha();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (status !== "success" || !pochaInfo?.ongoing) return;
    try {
      const stored = window.localStorage.getItem(dismissalKey(pochaInfo.pochaID));
      if (stored === "1") setDismissed(true);
    } catch {
      // localStorage unavailable — leave dismissed=false so banner shows.
    }
  }, [status, pochaInfo?.ongoing, pochaInfo?.pochaID]);

  if (status !== "success") return null;
  if (!pochaInfo?.ongoing) return null;
  if (dismissed) return null;

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(dismissalKey(pochaInfo.pochaID), "1");
    } catch {
      // localStorage unavailable (private mode etc.) — drop silently;
      // banner will hide for the session anyway.
    }
    setDismissed(true);
  };

  return (
    <div
      role="region"
      aria-label="포차 진행 안내"
      className="w-full bg-brand-accent text-brand-primary"
    >
      <Container size="xl" className="flex items-center gap-3 py-2!">
        <span
          aria-hidden="true"
          className="inline-flex size-2 shrink-0 rounded-full bg-brand-primary motion-safe:animate-pulse"
        />
        <span className="type-body-sm shrink-0 !font-semibold">
          포차 진행중
        </span>
        {pochaInfo.title ? (
          <span className="type-body-sm min-w-0 flex-1 truncate text-brand-primary/90">
            {pochaInfo.title}
          </span>
        ) : (
          <span className="flex-1" />
        )}
        <LinkButton
          href="/pocha"
          variant="primary"
          size="sm"
          className="inline-flex shrink-0 items-center gap-1"
        >
          입장하기
          <Icon name="arrow-right" size="xs" />
        </LinkButton>
        <IconButton
          icon="x"
          aria-label="배너 닫기"
          variant="tertiary"
          size="sm"
          onClick={handleDismiss}
        />
      </Container>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

import { Icon, IconButton, LinkButton } from "@umichkisa-ds/web";

import type { PochaInfo } from "@/types/pocha";

const STORAGE_KEY_PREFIX = "kisa.pocha.banner.dismissed.";

function dismissalKey(pochaID: number): string {
  return `${STORAGE_KEY_PREFIX}${pochaID}`;
}

interface PochaLiveBannerProps {
  initialPochaInfo: PochaInfo | null;
}

/**
 * Conditional live-pocha banner pinned to the top of the home page.
 *
 * Server-fetched pocha info is passed in; the banner does no client-side
 * fetching. Dismissal persists per pochaID in localStorage so a brand-new
 * pocha event re-shows the banner; the same event stays dismissed across
 * reloads.
 */
export default function PochaLiveBanner({
  initialPochaInfo,
}: PochaLiveBannerProps) {
  const ongoing =
    initialPochaInfo?.ongoing === true ? initialPochaInfo : null;

  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!ongoing) return;
    try {
      const stored = window.localStorage.getItem(dismissalKey(ongoing.pochaID));
      if (stored === "1") setDismissed(true);
    } catch {
      // localStorage unavailable — leave dismissed=false so banner shows.
    }
  }, [ongoing]);

  if (!ongoing) return null;
  if (dismissed) return null;

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(dismissalKey(ongoing.pochaID), "1");
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
      className="flex flex-col gap-3 rounded-lg border border-brand-primary bg-brand-accent text-brand-primary p-4 md:flex-row md:items-center md:justify-between md:gap-4 md:p-5"
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="mt-0.5 inline-flex size-2 shrink-0 rounded-full bg-brand-primary motion-safe:animate-pulse"
        />
        <div className="flex flex-col gap-1">
          <p className="type-h3 text-brand-primary">포차 진행중</p>
          {ongoing.title ? (
            <p className="type-body text-brand-primary">{ongoing.title}</p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-2 self-end md:self-auto">
        <LinkButton
          href="/pocha"
          variant="primary"
          size="md"
          className="inline-flex items-center gap-2"
        >
          입장하기
          <Icon name="arrow-right" size="sm" />
        </LinkButton>
        <IconButton
          icon="x"
          aria-label="배너 닫기"
          variant="tertiary"
          size="sm"
          onClick={handleDismiss}
        />
      </div>
    </div>
  );
}

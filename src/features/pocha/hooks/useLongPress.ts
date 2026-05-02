"use client";

import { useCallback, useEffect, useRef } from "react";

interface UseLongPressOptions {
  onLongPress: () => void;
  durationMs?: number;
  moveCancelPx?: number;
}

interface UseLongPressReturn {
  pointerProps: {
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => void;
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => void;
    onPointerUp: () => void;
    onPointerLeave: () => void;
    onPointerCancel: () => void;
  };
  fireSynthetic: () => void;
  /**
   * True for one click after a long-press fires. The consumer must check this
   * in its click handler and reset it (`firedRef.current = false`) to swallow
   * the trailing click that follows the press release.
   */
  firedRef: React.MutableRefObject<boolean>;
}

/**
 * Touch-only long-press gesture. Returns pointer event handlers to spread on
 * the target element, plus `firedRef` so the consumer can swallow the trailing
 * click. Pointer types other than `touch` are ignored — desktop "press and
 * hold" is not a real gesture; pair this with a `contextmenu` handler on the
 * consumer if right-click parity is desired (call `fireSynthetic()` from
 * there).
 */
export function useLongPress({
  onLongPress,
  durationMs = 500,
  moveCancelPx = 10,
}: UseLongPressOptions): UseLongPressReturn {
  const firedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const onLongPressRef = useRef(onLongPress);

  // Keep callback ref fresh without triggering effect re-runs / handler churn.
  useEffect(() => {
    onLongPressRef.current = onLongPress;
  }, [onLongPress]);

  const clear = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    startRef.current = null;
  }, []);

  // Cancel any in-flight timer on unmount — prevents firing onLongPress
  // against a now-dead consumer (e.g., card removed mid-press by a status
  // change in the parent feed).
  useEffect(() => {
    return () => clear();
  }, [clear]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType !== "touch") return;
      startRef.current = { x: e.clientX, y: e.clientY };
      firedRef.current = false;
      timerRef.current = setTimeout(() => {
        firedRef.current = true;
        timerRef.current = null;
        onLongPressRef.current();
      }, durationMs);
    },
    [durationMs]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (timerRef.current === null) return;
      const start = startRef.current;
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (dx * dx + dy * dy > moveCancelPx * moveCancelPx) {
        clear();
      }
    },
    [clear, moveCancelPx]
  );

  const onPointerEnd = useCallback(() => {
    clear();
  }, [clear]);

  const fireSynthetic = useCallback(() => {
    firedRef.current = true;
    onLongPressRef.current();
  }, []);

  return {
    pointerProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerLeave: onPointerEnd,
      onPointerCancel: onPointerEnd,
    },
    fireSynthetic,
    firedRef,
  };
}

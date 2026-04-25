import React, { useEffect, useRef, useCallback } from "react";
import { LoadingSpinner } from "@umichkisa-ds/web";
import NotificationText from "./NotificationText";

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  children: React.ReactNode;
  threshold?: number; // Distance from bottom to trigger load (0-1)
  rootMargin?: string; // CSS margin for the root
  endMessage?: React.ReactNode; // Message to show when no more data
  loadMoreError?: string;
  onRetry?: () => void;
}

export default function InfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  children,
  threshold = 0.1,
  rootMargin = "100px",
  endMessage = <NotificationText text="더 이상 포지션이 없습니다." />,
  loadMoreError,
  onRetry,
}: InfiniteScrollProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      // Suspend auto-trigger when an error is showing — the user must
      // click the retry link explicitly to avoid a tight failure loop.
      if (
        target.isIntersecting &&
        hasMore &&
        !isLoading &&
        !loadMoreError
      ) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore, loadMoreError]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold,
      rootMargin,
    });

    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [handleObserver, threshold, rootMargin]);

  return (
    <div>
      {children}
      <div ref={observerRef} className="flex justify-center items-center py-8">
        {isLoading && (
          <div className="flex flex-col items-center gap-2">
            <LoadingSpinner size="md" />
          </div>
        )}
        {loadMoreError && !isLoading && (
          <div className="flex flex-col items-center gap-2 py-4">
            <span className="type-body-sm text-muted-foreground">
              공고를 더 불러오지 못했습니다.
            </span>
            <button
              type="button"
              onClick={onRetry}
              className="type-body-sm text-brand-primary underline underline-offset-4"
            >
              다시 불러오기
            </button>
          </div>
        )}
        {!hasMore && !isLoading && !loadMoreError && (
          <div className="type-body-sm text-muted-foreground text-center py-4">
            {endMessage}
          </div>
        )}
      </div>
    </div>
  );
}

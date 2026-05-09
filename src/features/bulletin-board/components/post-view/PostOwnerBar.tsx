import React from "react";
import Link from "next/link";
import { Icon } from "@umichkisa-ds/web";

import { formatRelativeTime, formatDateTimeString } from "@/utils/formats/date";

type PostOwnerBarProps = {
  email: string;
  fullname: string;
  created: string;
  readCount: number;
  commentsCount: number;
  anonymous: boolean;
};

export default function PostOwnerBar({
  email,
  fullname,
  created,
  readCount,
  commentsCount,
  anonymous,
}: PostOwnerBarProps) {
  const linkLabel = `View ${fullname}'s profile`;
  const displayName = anonymous ? "익명" : fullname;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 type-caption text-muted-foreground">
      {/* Left: author + time */}
      <div className="flex items-center gap-2">
        {anonymous ? (
          <span className="type-label text-foreground">{displayName}</span>
        ) : (
          <Link
            href={`/users/${email}`}
            title={linkLabel}
            aria-label={linkLabel}
            className="type-label text-foreground hover:underline"
          >
            {displayName}
          </Link>
        )}
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1">
          <Icon name="clock-9" size="xs" />
          <span className="hidden md:inline">{formatDateTimeString(created)}</span>
          <span className="md:hidden">{formatRelativeTime(created)}</span>
        </span>
      </div>

      {/* Right: read + comments */}
      <div className="flex items-center gap-3">
        <span>
          조회 <span className="text-foreground">{readCount}</span>
        </span>
        <span aria-hidden="true">·</span>
        <span>
          댓글 <span className="text-foreground">{commentsCount}</span>
        </span>
      </div>
    </div>
  );
}

import React from "react";
import { Badge } from "@umichkisa-ds/web";

type PostTitleBarProps = {
  isAnnouncement: boolean;
  title: string;
};

export default function PostTitleBar({
  isAnnouncement,
  title,
}: PostTitleBarProps) {
  return (
    <h1 className="type-h2 text-foreground flex flex-wrap items-center gap-2">
      {isAnnouncement && (
        <Badge variant="brand" size="sm">
          공지
        </Badge>
      )}
      <span>{title}</span>
    </h1>
  );
}

"use client";

/**
 * UserProfileHero — large hero card for /users/[email].
 *
 * Layout:
 *   [Avatar]   [fullname (display)]
 *              [major — muted]
 *              [icon · email]
 *              [icon · Class of {gradYear}]
 *              [icon · LinkedIn handle]   (when linkedin set)
 *              [정보 수정 →]               (self only)
 *
 * Loading: Skeleton block in the same shape so the page doesn't jump.
 * Error / not-found: StatusView (variant="not-found"); the parent decides
 *   whether to suppress sibling content.
 */

import {
  Avatar,
  Icon,
  LinkButton,
  Skeleton,
  StatusView,
} from "@umichkisa-ds/web";

import { useUser } from "@/apis/users/swrHooks";

type UserProfileHeroProps = {
  email: string;
  token: string;
  sessionEmail: string;
  sessionImage: string;
};

export default function UserProfileHero({
  email,
  token,
  sessionEmail,
  sessionImage,
}: UserProfileHeroProps) {
  const { user, isLoading, error } = useUser(email, token);
  const isSelf = sessionEmail === email;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
        <Skeleton variant="circular" className="h-14 w-14" />
        <div className="flex flex-1 flex-col gap-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <StatusView
        variant="not-found"
        title="사용자를 찾을 수 없습니다"
        description="요청하신 회원 정보를 불러오지 못했습니다."
      />
    );
  }

  const linkedinHandle = user.linkedin
    ? user.linkedin.split(".com/in/")[1]?.replace(/\/$/, "")
    : "";

  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
      <Avatar
        size="lg"
        src={isSelf ? sessionImage : undefined}
        name={user.fullname}
      />

      <div className="flex flex-1 flex-col items-center gap-4 text-center md:items-start md:text-left">
        <div className="flex flex-col gap-1">
          <h1 className="type-h1 tracking-tight text-foreground">{user.fullname}</h1>
          <p className="type-body text-muted-foreground">{user.major}</p>
        </div>

        <ul className="flex flex-col gap-2">
          <li className="flex items-center justify-center gap-2 type-body text-foreground md:justify-start">
            <Icon name="mail" size="sm" />
            <span>{user.email}</span>
          </li>
          <li className="flex items-center justify-center gap-2 type-body text-foreground md:justify-start">
            <Icon name="graduation-cap" size="sm" />
            <span>{`Class of ${user.gradYear}`}</span>
          </li>
          {linkedinHandle ? (
            <li className="flex items-center justify-center gap-2 type-body text-foreground md:justify-start">
              <Icon name="linkedin" size="sm" />
              <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link hover:underline"
              >
                {linkedinHandle}
              </a>
            </li>
          ) : null}
        </ul>

        {isSelf ? (
          <LinkButton
            variant="secondary"
            size="sm"
            href={`/users/edit/${encodeURIComponent(email)}`}
          >
            정보 수정
          </LinkButton>
        ) : null}
      </div>
    </div>
  );
}

import Link from "next/link";
import React from "react";
import { Avatar } from "@umichkisa-ds/web";

type UserInfoProps = {
  email: string;
  name: string;
  image: string;
};

function UserInfo({ email, name, image }: UserInfoProps) {
  return (
    <Link
      href={`/users/${email}`}
      className="inline-flex rounded-full outline-none ring-offset-2 ring-offset-brand-primary transition-shadow hover:ring-2 hover:ring-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent"
    >
      <Avatar size="sm" src={image} name={name} />
    </Link>
  );
}

export default React.memo(UserInfo);

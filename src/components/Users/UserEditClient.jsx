"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "../../service/user";

// sub-ui components
import EditUserFixed from "./EditUserFixed";
import EditUserForm from "./EditUserForm";

export default function UserEditClient({ email, session }) {
  const { user, isLoading, isError } = useUser(email, session?.token);

  // editable fields
  const [major, setMajor] = useState("");
  const [gradYear, setGradYear] = useState(0);
  const [linkedIn, setLinkedIn] = useState(""); // optional

  useEffect(() => {
    if (isLoading || !user) return;

    setMajor(user.major);
    setGradYear(user.gradYear);
    setLinkedIn(user.linkedin ? user.linkedin : "");
  }, [isLoading, user]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>에러가 발생했습니다!</div>;

  return (
    <div
      className="w-full
    flex flex-col justify-center md:flex-row gap-8 md:gap-16 lg:gap-20"
    >
      <EditUserFixed
        profile={session?.user.image}
        fullname={user?.fullname}
        email={user?.email}
      />
      <div className="w-full">
        <EditUserForm
          major={major}
          setMajor={setMajor}
          gradYear={gradYear}
          setGradYear={setGradYear}
          linkedIn={linkedIn}
          setLinkedIn={setLinkedIn}
          email={email}
          session={session}
        />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../service/user";

// sub-ui components
import EditUserFixed from "./EditUserFixed";
import EditUserForm from "./EditUserForm";
import { useSession } from "next-auth/react";

export default function UserEditClient({ user, email, profile }) {
  const { data: session } = useSession();

  // editable fields
  const [major, setMajor] = useState(user.major);
  const [gradYear, setGradYear] = useState(user.gradYear);
  const [linkedIn, setLinkedIn] = useState(user.linkedin ? user.linkedin : ""); // optional

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-20">
      <EditUserFixed
        profile={profile}
        fullname={user?.fullname}
        email={user?.email}
      />
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
  );
}

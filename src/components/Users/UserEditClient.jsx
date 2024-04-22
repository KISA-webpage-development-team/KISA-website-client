import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../service/user";

// sub-ui components
import EditUserFixed from "./EditUserFixed";
import EditUserForm from "./EditUserForm";
import { useSession } from "next-auth/react";

export default function UserEditClient({ email, profile }) {
  const [user, setUser] = useState(null);
  const { data: session } = useSession();

  // editable fields
  const [major, setMajor] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [linkedIn, setLinkedIn] = useState(""); // optional

  // get user info
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserInfo(email, session?.token);
      setUser(res);

      // set editable fields
      setMajor(res.major);
      setGradYear(res.gradYear);
      setLinkedIn(res.linkedin ? res.linkedin : "");
    };
    if (session ) {
      fetchUser();
    }
  }, [email, session]);

  if (!user) {
    return <div>Loading...</div>;
  }

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
        session = {session}
      />
    </div>
  );
}

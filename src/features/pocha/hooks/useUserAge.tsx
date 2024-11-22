// custom hook to handle user's age logics

import { getUser } from "@/apis/users/queries";
import { UserSession } from "@/lib/next-auth/types";
import { useEffect, useState } from "react";

const useUserAge = (session: UserSession | null) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [underAge, setUnderAge] = useState<boolean>(false);

  // fetch user's age
  useEffect(() => {
    const fetchUserAge = async () => {
      try {
        const res = await getUser(session?.user.email, session?.token);
        const { bornDate, bornMonth, bornYear } = res;
        const age = calculateAge(`${bornYear}-${bornMonth}-${bornDate}`);
        setUnderAge(age < 21);

        setStatus("success");
      } catch (error) {
        console.error("Error while fetching user's age", error);
        setStatus("error");
      }
    };

    if (session) {
      fetchUserAge();
    } else {
      setStatus("error");
    }
  }, [session]);

  return { underAge, status };
};

const calculateAge = (birthday: string | null | undefined): number => {
  if (!birthday) return 0;
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export default useUserAge;

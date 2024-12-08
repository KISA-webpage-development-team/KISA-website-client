// custom hook to handle user's age logics

import { getUser } from "@/apis/users/queries";
import { UserSession } from "@/lib/next-auth/types";
import { useEffect, useState } from "react";

const useUserAge = (session: UserSession | null) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [underAge, setUnderAge] = useState<boolean>();
  const [fullname, setFullname] = useState<string>("");

  const calculateAge = async (
    birthday: string | null | undefined
  ): Promise<number> => {
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

  // fetch user's age
  useEffect(() => {
    const fetchUserAge = async () => {
      try {
        const res = await getUser(session?.user.email, session?.token);

        const { bornDate, bornMonth, bornYear, fullname } = res;
        setFullname(fullname);

        // Ensure proper date formatting
        const formattedMonth = bornMonth.toString().padStart(2, "0");
        const formattedDate = bornDate.toString().padStart(2, "0");
        const birthday = `${bornYear}-${formattedMonth}-${formattedDate}`;

        const age = await calculateAge(birthday);
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

  return { underAge, status, fullname };
};

export default useUserAge;

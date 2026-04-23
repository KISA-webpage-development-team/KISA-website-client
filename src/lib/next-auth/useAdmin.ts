import { useSession } from "next-auth/react";
import { UserSession } from "./types";
import { useEffect, useState } from "react";
import { getIsAdmin } from "@/apis/auth/queries";
import { useMockAuth } from "@/mocks/authContext";

// [NOTE]: I think this hook should be moved to shared folder or something

/**
 * @desc hook to check if the user is an admin (getIsAdmin)
 * @returns isAdmin: boolean, email: string, token: string, status: string
 */
const useAdmin = () => {
  // Mock-mode short-circuit: admin state is driven by MockAuthToggle, not
  // next-auth. Hooks are called unconditionally to satisfy rules-of-hooks;
  // the branch lives in the return.
  const mock = useMockAuth();

  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const [status, setStatus] = useState<string>(sessionStatus);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchIsAdmin = async () => {
      try {
        const res = await getIsAdmin(session?.user.email, session?.token);
        if (res) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setStatus("success");
      } catch (error) {
        console.error(
          "[DashboardPage] error while fetching admin status",
          error
        );
      }
    };

    if (session) {
      fetchIsAdmin();
    }
  }, [session]);

  if (mock.isMockMode) {
    return {
      isAdmin: mock.isAdmin,
      email: mock.session?.user?.email,
      token: mock.session?.token,
      status: "success",
    };
  }

  return {
    isAdmin,
    email: session?.user?.email,
    token: session?.token,
    status,
  };
};

export default useAdmin;

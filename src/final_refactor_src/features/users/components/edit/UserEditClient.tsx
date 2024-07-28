"use client";

import { UserSession } from "@/final_refactor_src/lib/next-auth/types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import UserEditForm from "./UserEditForm";
import UserEditFixed from "./UserEditFixed";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";
import { sejongHospitalLight } from "@/final_refactor_src/utils/fonts/fonts";
import { useUser } from "@/final_refactor_src/apis/users/hooks";
import { EmailIcon } from "@/final_refactor_src/components/icon";

type UserEditClientProps = {
  email: string;
  session: UserSession | null;
};

export default function UserEditClient({
  email,
  session,
}: UserEditClientProps) {
  const { user, isLoading, error } = useUser(email, session.token);
  // loading state for filling initial fields
  const [initialFieldsFilled, setInitialFieldsFilled] = useState(false);

  // form editable fields
  const [major, setMajor] = useState("");
  const [gradYear, setGradYear] = useState(0);
  const [linkedIn, setLinkedIn] = useState(""); // optional

  useEffect(() => {
    if (isLoading || !user) return;

    setMajor(user.major);
    setGradYear(user.gradYear);
    setLinkedIn(user.linkedin ? user.linkedin : ""); // optional

    setInitialFieldsFilled(true);
  }, [isLoading, user]);

  const setMajorCallback = useCallback((value: string) => setMajor(value), []);
  const setGradYearCallback = useCallback(
    (value: number) => setGradYear(value),
    []
  );
  const setLinkedInCallback = useCallback(
    (value: string) => setLinkedIn(value),
    []
  );

  const editableFields = useMemo(
    () => [
      {
        key: "major",
        type: "text",
        label: "전공 (Major)",
        value: major,
        onChange: setMajorCallback,
        required: true,
      },
      {
        key: "gradYear",
        type: "number",
        label: "졸업년도 (Grad Year)",
        value: gradYear.toString(),
        onChange: setGradYearCallback,
        required: true,
      },
      {
        key: "linkedin",
        type: "url",
        label: "LinkedIn",
        value: linkedIn,
        onChange: setLinkedInCallback,
        required: false,
      },
    ],
    [
      major,
      gradYear,
      linkedIn,
      setMajorCallback,
      setGradYearCallback,
      setLinkedInCallback,
    ]
  );

  // fixed fields (feel free to add any field you want to be fixed)
  // - email
  // [NOTE] useMemo() is applied to prevent re-rendering of the fixed fields
  const fixedFields = useMemo(
    () => [
      {
        icon: <EmailIcon />,
        text: user?.email,
      },
    ],
    [user?.email]
  );

  // if loading or initial fields are not filled, show loading spinner
  if (isLoading || !initialFieldsFilled) return <LoadingSpinner />;

  // if error occurs, throw error to be handled by error boundary
  if (error) {
    throw error;
  }

  return (
    <div
      className={`${sejongHospitalLight.className}
      self-stretch w-full mx-auto
      flex flex-col justify-center md:flex-row gap-8 md:gap-16 lg:gap-20`}
    >
      <UserEditFixed
        fullname={user.fullname}
        profile={session.user.image}
        fixedFields={fixedFields}
      />
      <UserEditForm
        editableFields={editableFields} // major, gradYear, linkedIn
      />
    </div>
  );
}

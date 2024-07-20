"use client";

import { UserSession } from "@/final_refactor_src/lib/next-auth/types";
import React from "react";
import useUserEdit, { EditableField } from "../../hooks/useUserEdit";
import { User } from "@/final_refactor_src/types/user";
import UserEditForm from "./UserEditForm";
import UserEditFixed from "./UserEditFixed";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";

type UserEditClientProps = {
  email: string;
  session: UserSession | null;
};

// [Logic]: User Edit Fields Abstraction
// A list of fixed fields
// feel free to add or remove fields
const FIXED_FIELDS: Array<keyof User> = ["fullname", "email"];

// A list of editable fields
// feel free to add or remove fields
const EDITABLE_FIELDS: EditableField[] = [
  {
    key: "major",
    initialValue: "",
    validate: (value) => value.length > 0,
  },
  {
    key: "gradYear",
    initialValue: new Date().getFullYear(),
    validate: (value) =>
      value >= 1900 && value <= new Date().getFullYear() + 10,
  },
  {
    key: "linkedin",
    initialValue: "",
    validate: (value) => value === "",
  },
];

export default function UserEditClient({
  email,
  session,
}: UserEditClientProps) {
  const {
    user,
    isLoading,
    error,
    fixedFields,
    editableFields,
    updateField,
    resetForm,
    validateFields,
  } = useUserEdit(email, session?.token, FIXED_FIELDS, EDITABLE_FIELDS);

  console.log(
    "[UserEditClient] user",
    user,
    isLoading,
    error,
    fixedFields,
    editableFields
  );

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    throw error;
  }

  return (
    <div>
      <UserEditFixed profile={session.user.image} fields={fixedFields} />
      <UserEditForm />
    </div>
  );
}

import { useState, useEffect } from "react";
import { useUser } from "@/final_refactor_src/apis/users/hooks";
import { User } from "@/final_refactor_src/types/user";

export type EditableField = {
  key: keyof User;
  initialValue: any;
  validate?: (value: any) => boolean;
};

const useUserEdit = (
  email: string,
  token: string | null,
  fixedFields: string[],
  editableFields: EditableField[]
) => {
  // [Logic]: Fetch user data
  const { user, isLoading, error } = useUser(email, token);

  const [editables, setEditables] = useState<Record<string, any>>({});
  const [fixed, setFixed] = useState<Record<string, any>>({});

  const [initialFieldsFilled, setInitialFieldsFilled] =
    useState<boolean>(false);

  useEffect(() => {
    if (isLoading || !user) return;

    const initialFields = editableFields.reduce((acc, field) => {
      acc[field.key] = user[field.key] ?? field.initialValue;
      return acc;
    }, {} as Record<string, any>);

    const fixedValues = fixedFields.reduce((acc, field) => {
      acc[field] = user[field];
      return acc;
    }, {} as Record<string, any>);

    setEditables(initialFields);
    setFixed(fixedValues);
    setInitialFieldsFilled(true);
  }, [isLoading, user, editableFields, fixedFields]);

  const updateField = (key: string, value: any) => {
    setEditables((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    if (user) {
      const resetFields = editableFields.reduce((acc, field) => {
        acc[field.key] = user[field.key] ?? field.initialValue;
        return acc;
      }, {} as Record<string, any>);

      setEditables(resetFields);
    }
  };

  const validateFields = () => {
    return editableFields.every(
      (field) => !field.validate || field.validate(editables[field.key])
    );
  };

  return {
    user,
    isLoading: isLoading || !initialFieldsFilled,
    error,
    fixedFields: fixed,
    editableFields: editables,
    updateField,
    resetForm,
    validateFields,
  };
};

export default useUserEdit;

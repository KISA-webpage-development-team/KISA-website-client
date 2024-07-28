import { CustomButton } from "@/final_refactor_src/components/button";
import CustomFormItem from "@/final_refactor_src/components/form/CustomFormItem";
import React, { memo, useCallback, useState } from "react";

type UserEditFormProps = {
  editableFields: editableField[];
};

type editableField = {
  key: string;
  type: string;
  label: string;
  value: any;
  onChange: React.Dispatch<React.SetStateAction<any>>;
  required: boolean;
};

const UserEditForm = ({ editableFields }: UserEditFormProps) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <form
      className="flex-1 
    flex flex-col gap-4
    max-w-2xl"
    >
      {editableFields.map(({ key, type, label, value, onChange, required }) => (
        <CustomFormItem
          key={key}
          htmlFor={key}
          labelText={label}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      ))}
      <CustomButton
        forSubmit={true}
        type="primary"
        text="저장"
        onClick={handleSubmit}
      />
    </form>
  );
};

export default memo(UserEditForm);

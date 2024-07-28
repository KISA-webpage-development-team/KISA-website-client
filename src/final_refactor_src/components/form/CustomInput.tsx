import React, { memo } from "react";

type CustomInputProps = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
};

const CustomInput = ({
  type,
  value,
  onChange,
  placeholder = "",
  required = false,
}: CustomInputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="self-stretch
      border border-gray-300 p-3 rounded-lg 
      focus:outline-michigan-blue text-sm md:text-base
      "
    />
  );
};

export default memo(CustomInput);

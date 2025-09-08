import React from "react";

export default function CustomInput({
  type,
  value,
  checked,
  onChange,
  placeholder,
  required,
}) {
  return (
    <input
      type={type}
      value={value}
      checked={checked}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`${type === "checkbox" ? "w-fit" : "w-full mt-2"}
      border border-gray-300 p-3 rounded-lg
      focus:outline-michigan-blue text-sm md:text-base
      `}
    />
  );
}

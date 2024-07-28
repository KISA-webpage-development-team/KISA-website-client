import React, { memo } from "react";
import CustomInput from "./CustomInput";
import CustomLabel from "./CustomLabel";

type CustomFormItemProps = {
  htmlFor: string;
  labelText: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
};

const CustomFormItem = ({
  htmlFor,
  labelText,
  type,
  value,
  onChange,
  placeholder = "",
  required = false,
}: CustomFormItemProps) => {
  return (
    <div className="flex flex-col gap-1 items-start">
      <CustomLabel htmlFor={htmlFor} text={labelText} required={required} />
      <CustomInput
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

// export default memo(CustomFormItem);
export default CustomFormItem;

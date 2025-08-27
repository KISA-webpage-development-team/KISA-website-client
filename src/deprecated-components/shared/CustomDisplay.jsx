// CustomField.jsx
// : Sign up form field abstraction
// value, setValue: user input value, setter
// label: field label
// placeholder: field placeholder
// type: "text" (default) | "number" | "email" | "year" | "date"
// required: required field

import React from 'react';

import CustomLabel from './CustomLabel';
import CustomText from './CustomText';

export default function CustomDisplay({ value, label, type = 'text' }) {
  return (
    <div>
      <CustomLabel htmlFor={type} text={label} />
      <CustomText type={type} value={value} />
    </div>
  );
}

import React from "react";
import { firstLetterToUppercase } from "../../helpers/functions";

interface RadioPropType extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassname?: string;
  name: string;
}

export default function Radio({
  label,
  onChange,
  name,
  inputClassname,
  ...props
}: RadioPropType) {
  return (
    <>
      <input
        id={label}
        type="radio"
        name={name}
        onChange={onChange}
        className="cursor-pointer"
        required
        {...props}
      />
      <label htmlFor={label} className="ml-1 cursor-pointer">
        {firstLetterToUppercase(label)}
      </label>
    </>
  );
}

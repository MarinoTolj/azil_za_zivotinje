import React from "react";

const firstLetterToUppercase = (string: string) => {
  return string[0].toUpperCase() + string.slice(1);
};

interface RadioPropType extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  inputClassname?: string;
  name: string;
}

export default function Radio({
  label,
  setValue,
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
        onChange={(e) => setValue(e.currentTarget.value)}
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

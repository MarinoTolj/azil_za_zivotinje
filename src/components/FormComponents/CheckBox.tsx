import React from "react";

interface InputPropType extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassname?: string;
}

export default function Input({
  label,
  onChange,
  inputClassname,
  ...props
}: InputPropType) {
  return (
    <div>
      <label htmlFor={label} className="cursor-pointer">
        {label}
      </label>
      <input
        id={label}
        onChange={onChange}
        type="checkbox"
        className="border-2 border-black rounded-sm"
        {...props}
      />
    </div>
  );
}

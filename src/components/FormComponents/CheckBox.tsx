import React from "react";

interface InputPropType extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function CheckBox({
  label,
  onChange,
  className,
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
        className={`accent-green-600 ${className}`}
        {...props}
      />
    </div>
  );
}

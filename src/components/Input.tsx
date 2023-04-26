import React from "react";

type PropType = {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  textArea?: boolean;
  inputClassname?: string;
  [key: string]: any;
};

export default function Input({
  label,
  setValue,
  textArea,
  inputClassname,
  ...props
}: PropType) {
  if (textArea)
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={label}>{label}</label>
        <textarea
          id={label}
          onChange={(e) => setValue(e.currentTarget.value)}
          {...props}
        />
      </div>
    );

  return (
    <div className={inputClassname}>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        onChange={(e) => setValue(e.currentTarget.value)}
        {...props}
      />
    </div>
  );
}

import React from "react";

type PropType<T> = {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  textArea?: boolean;
  [key: string]: any;
};

export default function Input<T,>({ label, setValue, textArea, ...props }: PropType<T>) {
  if (textArea)
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={label}>{label}</label>
        <textarea
          id={label}
          onChange={(e) => setValue(e.currentTarget.value as T)}
          {...props}
        />
      </div>
    );
  
  return (
    <div className="">
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        onChange={(e) => setValue(e.currentTarget.value as T)}
        {...props}
      />
    </div>
  );
}

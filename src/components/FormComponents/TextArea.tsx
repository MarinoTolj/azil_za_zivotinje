interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ label, onChange, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full h-full">
      <label htmlFor={label} className="cursor-pointer">
        {label}
      </label>
      <textarea
        id={label}
        onChange={onChange}
        className="border-2 border-black rounded-sm"
        {...props}
      />
    </div>
  );
};
export default TextArea;

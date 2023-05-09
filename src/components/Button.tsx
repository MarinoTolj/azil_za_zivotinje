const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`bg-green-600 text-white w-3/4 text-lg py-2 rounded-md m-auto ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;

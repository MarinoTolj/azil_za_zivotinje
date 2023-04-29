const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`bg-green-600 w-fit p-3 rounded-md m-auto ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;

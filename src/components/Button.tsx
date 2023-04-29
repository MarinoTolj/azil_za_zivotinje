interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  showIcon: boolean;
}

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button className="bg-green-600 w-fit p-3 rounded-md m-auto" {...props}>
      {children}
    </button>
  );
};
export default Button;

interface Props {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  handleClick?: () => void;
  type: "button" | "submit" | "reset";
}

export const Button: React.FC<Props> = ({
  children,
  type = "button",
  handleClick,
  variant,
}) => {
  const classNameMap = {
    primary: "bg-blue-500 text-white px-4 py-2 rounded-md",
    secondary: "text-gray-500 px-4 py-2 rounded-md",
  };
  return (
    <button className={classNameMap[variant]} onClick={handleClick} type={type}>
      {children}
    </button>
  );
};

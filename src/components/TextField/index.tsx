interface Props {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type: string;
  required?: boolean;
}

export const TextField: React.FC<Props> = ({
  label,
  value,
  onChange,
  name,
  type = "text",
  required = false,
}) => {
  return (
    <>
      <label htmlFor="email" className="mb-2 font-medium">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        id="email"
        type={type}
        className="border border-gray-300 p-2 rounded-md"
        required={required}
      />
    </>
  );
};

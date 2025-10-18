export type InputProps = {
  placeholder: string;
  className?: string;
  type?: string;
  name?: string;
};

export default function Input({
  placeholder,
  type = "text",
  className = "",
  name = "",
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`text-black border-[1px] border-gray-300 w-full text-xl font-medium outline-primary py-3 px-4 rounded-xl ${className}`}
    />
  );
}

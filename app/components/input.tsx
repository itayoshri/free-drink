import { ChangeEvent } from "react";

type InputProps = {
  onChange(newValue: ChangeEvent<HTMLInputElement>): unknown;
  placeholder: string;
  className: string;
};

export default function Input({
  onChange,
  placeholder,
  className,
}: InputProps) {
  return (
    <input
      onChange={(newValue) => onChange(newValue)}
      placeholder={placeholder}
      className="text-black border-[1px] border-gray-300 w-full text-xl font-medium outline-red-600 py-3 px-4 rounded-xl"
    />
  );
}

import { ChangeEvent } from "react";

export type InputProps = {
  onChange(newValue: ChangeEvent<HTMLInputElement>): unknown;
  placeholder: string;
  className?: string;
  type?: string;
};

export default function Input({
  onChange,
  placeholder,
  type = "text",
  className = "",
}: InputProps) {
  return (
    <input
      onChange={(newValue) => onChange(newValue)}
      type={type}
      placeholder={placeholder}
      className={`text-black border-[1px] border-gray-300 w-full text-xl font-medium outline-red-600 py-3 px-4 rounded-xl ${className}`}
    />
  );
}

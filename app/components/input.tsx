import { ChangeEvent } from "react";

export type InputProps = {
  onChange(newValue: string): unknown;
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
      onChange={(newValue) => onChange(newValue.currentTarget.value)}
      type={type}
      placeholder={placeholder}
      className={`text-black border-[1px] border-gray-300 w-full text-xl font-medium outline-primary py-3 px-4 rounded-xl ${className}`}
    />
  );
}

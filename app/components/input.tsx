import { HTMLInputTypeAttribute } from "react";

export type InputProps = {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
  name?: string;
  leftToRight?: boolean;
  disabled?: boolean;
};

export default function Input({
  placeholder = "",
  defaultValue = "",
  type = "text",
  className = "",
  name = "",
  leftToRight = false,
  disabled = false,
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
      className={`text-black border-[1px] border-gray-300 w-full text-xl font-medium outline-primary py-3 px-4 rounded-xl ${className} ${
        leftToRight ? "ltr" : ""
      } ${disabled && "opacity-60 bg-gray-200"}`}
    />
  );
}

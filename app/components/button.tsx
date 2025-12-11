import { ReactNode, Ref } from "react";

export interface ButtonProps {
  children?: ReactNode;
  onClick?(): unknown;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  fit?: boolean;
}

export default function Button({
  children,
  onClick = undefined,
  ref = undefined,
  className = "",
  disabled = false,
  type = "button",
  fit = false,
}: ButtonProps) {
  return (
    <button
      className={`${disabled ? "bg-red-300 dark:bg-red-900" : "bg-primary"} ${
        fit ? "px-3" : "w-full"
      } py-3 rounded-xl text-white text-lg font-medium flex justify-center items-center ${className}`}
      onClick={onClick}
      ref={ref}
      type={type}
    >
      {children}
    </button>
  );
}

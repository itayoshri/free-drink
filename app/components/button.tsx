import { ReactNode, Ref } from "react";

export interface ButtonProps {
  children?: ReactNode;
  onClick?(): unknown;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}

export default function Button({
  children,
  onClick = () => null,
  ref = undefined,
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) {
  return (
    <button
      className={`${
        disabled ? "bg-red-300" : "bg-primary"
      } py-3 rounded-xl w-full text-xl text-white font-medium flex justify-center items-center ${className}`}
      onClick={onClick}
      ref={ref}
      type={type}
    >
      {children}
    </button>
  );
}

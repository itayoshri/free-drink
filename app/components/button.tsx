import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  onClick(): unknown;
  className?: string;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="bg-red-600 py-3 rounded-xl w-full text-xl text-white font-medium flex justify-center items-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

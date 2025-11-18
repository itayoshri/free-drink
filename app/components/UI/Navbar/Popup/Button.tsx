import { ReactElement } from "react";

export default function PopupButton({
  text,
  icon,
  warning,
  onClick = undefined,
}: {
  text: string;
  icon: ReactElement;
  warning?: boolean;
  onClick?(): unknown;
}) {
  return (
    <button
      className={`flex w-full py-1 font-semibold gap-3 items-center ${
        warning ? "text-primary" : ""
      }`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}

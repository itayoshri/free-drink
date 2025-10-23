import { ReactElement } from "react";

type MenuItemProps = {
  text: string;
  icon: ReactElement;
  onClick?(): unknown;
};

export default function MenuItem({ text, icon, onClick }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col w-full items-start gap-form px-page py-6 rounde font-bold rounded-3xl text-white border-zinc-700 border-[1px]"
    >
      {icon}

      {text}
    </button>
  );
}

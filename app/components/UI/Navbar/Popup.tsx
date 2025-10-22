"use client";
import Button from "@/components/button";
import { Account } from "@/components/Icons";
import { Icon } from "@/components/Icons/svgFactory";
import { User } from "@/context/auth";
import { ReactElement } from "react";

export default function AccountPopup({ user }: { user: User }) {
  return (
    <div className="flex flex-col gap-2 absolute top-full h-fit bg-white rounded-xl border-[1px] p-4 border-gray-300 pl-20">
      <div className="flex items-center gap-2">
        <Account className="text-black" height={35} />
        <div className="flex flex-col font-inter">
          <h3 className="font-bold"> {user.phone_number}</h3>
          <a className="text-sm text-zinc-400">{user.role_key}</a>
        </div>
      </div>
      <div className="flex flex-col">
        <PopupButton text="הזנת קוד הצטרפות" icon={<Account width={20} />} />
        <PopupButton text="התנתקות" warning icon={<Account width={20} />} />
      </div>
    </div>
  );
}

function PopupButton({
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
        warning ? "text-primary" : "text-black"
      }`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}

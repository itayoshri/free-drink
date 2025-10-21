"use client";
import { Icon } from "@/components/Icons/svgFactory";
import { User } from "@/context/auth";

export default function AccountPopup({ user }: { user: User }) {
  return (
    <div className="flex absolute -bottom-0 h-fit bg-black rounded-xs">
      {user.phone_number}
    </div>
  );
}

function PopupButton({ text, icon }: { text: string; icon: Icon }) {
  return (
    <div className="flex w-full gap-1 ">
      <a>{text}</a>
      <>{icon}</>
    </div>
  );
}

"use client";
import { Account, Logout } from "@/components/Icons";
import { useAuth, User } from "@/context/auth";
import { ReactElement } from "react";
import PopupButton from "./Button";
import PopupUserInfo from "./UserInfo";

export default function AccountPopup({ user }: { user: User }) {
  const { logout } = useAuth();
  return (
    <div className="flex flex-col gap-4 absolute top-full -mt-2 h-fit bg-white rounded-xl border-[1px] p-4 border-gray-300 pl-20">
      <PopupUserInfo user={user} />
      <div className="flex flex-col">
        {/*<PopupButton text="הזנת קוד הצטרפות" icon={<Add width={20} />} />*/}
        <PopupButton
          text="התנתקות"
          warning
          icon={<Logout width={20} />}
          onClick={() => logout()}
        />
      </div>
    </div>
  );
}

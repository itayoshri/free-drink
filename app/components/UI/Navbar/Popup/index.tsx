"use client";
import { Logout } from "@/components/Icons";
import { useAuth } from "@/context/auth";
import PopupButton from "./Button";
import PopupUserInfo from "./UserInfo";
import { User } from "@/interfaces/db/auth";

export default function AccountPopup({ user }: { user: User }) {
  const { logout } = useAuth();
  return (
    <div className="flex flex-col gap-4 absolute top-full -mt-2 h-fit bg-white dark:bg-zinc-900 text-black dark:text-white rounded-xl border-[1px] p-4 dark:border-zinc-600 pl-20">
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

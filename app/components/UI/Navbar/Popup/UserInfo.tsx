import { Account } from "@/components/Icons";
import { useApp } from "@/context";
import { User } from "@/context/auth";

export default function PopupUserInfo({ user }: { user: User }) {
  const { rolesMap } = useApp();
  return (
    <div className="flex items-center gap-2">
      <Account className="text-black" height={35} />
      <div className="flex flex-col">
        <h3 className="font-bold font-inter"> {user.phone_number}</h3>
        <a className="text-sm text-zinc-400 font-medium">
          {rolesMap[user.role_key]}
        </a>
      </div>
    </div>
  );
}

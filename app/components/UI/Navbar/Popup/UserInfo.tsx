import { Account } from "@/components/Icons";
import { User } from "@/context/auth";

export default function PopupUserInfo({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-2">
      <Account className="text-black" height={35} />
      <div className="flex flex-col font-inter">
        <h3 className="font-bold"> {user.phone_number}</h3>
        <a className="text-sm text-zinc-400">{user.role_key}</a>
      </div>
    </div>
  );
}

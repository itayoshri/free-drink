import { Account } from "@/components/Icons";
import { useAuth } from "@/context/auth";
import { User } from "@/interfaces/db/auth";

export default function PopupUserInfo({ user }: { user: User }) {
  const { rolesMap } = useAuth();
  return (
    <div className="flex items-center gap-2">
      <Account height={35} />
      <div className="flex flex-col">
        <h3 className="font-bold font-inter"> {user.phone_number}</h3>
        <a className="text-sm text-zinc-400 font-medium">
          {rolesMap[user.role_key].displayName}
        </a>
      </div>
    </div>
  );
}

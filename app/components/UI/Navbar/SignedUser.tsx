import { Account, SupervisorAccount } from "@/components/Icons";
import { User } from "@/context/auth";
import AccountPopup from "./Popup";

export default function SignedUser({ user }: { user: User }) {
  return (
    <div className="flex text-black gap-3">
      <Account width={30} />
      <SupervisorAccount width={30} />
      <AccountPopup user={user} />
    </div>
  );
}

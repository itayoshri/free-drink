"use client";
import { Account, SupervisorAccount } from "@/components/Icons";
import { User } from "@/context/auth";
import AccountPopup from "./Popup";
import { useState } from "react";

export default function SignedUser({ user }: { user: User }) {
  const [isPopupOpened, setPopupOpened] = useState(false);
  return (
    <div className="flex text-black gap-3">
      <button onClick={() => setPopupOpened((current) => !current)}>
        <Account width={30} />
      </button>
      <SupervisorAccount width={30} />
      {isPopupOpened ? <AccountPopup user={user} /> : null}
    </div>
  );
}

"use client";
import { Account, SupervisorAccount } from "@/components/Icons";
import AccountPopup from "./Popup";
import { useState } from "react";
import Link from "next/link";
import { User } from "@/interfaces/db/auth";

export default function SignedUser({ user }: { user: User }) {
  const [isPopupOpened, setPopupOpened] = useState(false);
  return (
    <div className="flex gap-3">
      <button onClick={() => setPopupOpened((current) => !current)}>
        <Account width={28} />
      </button>
      <Link href={"/refill"}>
        <SupervisorAccount width={28} />
      </Link>
      {isPopupOpened ? <AccountPopup user={user} /> : null}
    </div>
  );
}

"use client";
import { Account, SupervisorAccount } from "@/components/Icons";
import AccountPopup from "./Popup";
import { useState } from "react";
import Link from "next/link";
import { User } from "@/interfaces/db/auth";
import hasPermission from "@/utils/auth/permissions";
import { useAuth } from "@/context/auth";

export default function SignedUser({ user }: { user: User }) {
  const [isPopupOpened, setPopupOpened] = useState(false);
  const { rolesMap } = useAuth();
  const canAccessRefill = hasPermission(
    user as User,
    "invitation.generate",
    rolesMap
  );

  return (
    <div className="flex gap-3">
      <button onClick={() => setPopupOpened((current) => !current)}>
        <Account width={28} />
      </button>
      {canAccessRefill && (
        <Link href={"/refill"}>
          <SupervisorAccount width={28} />
        </Link>
      )}
      {isPopupOpened ? <AccountPopup user={user} /> : null}
    </div>
  );
}

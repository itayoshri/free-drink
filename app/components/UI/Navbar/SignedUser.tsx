"use client";
import { Account, SupervisorAccount } from "@/components/Icons";
import AccountPopup from "./Popup";
import { useState } from "react";
import Link from "next/link";
import { User } from "@/interfaces/db/auth";
import hasPermission from "@/utils/auth/permissions";
import { useAuth } from "@/context/auth";
import NavbarIcon from "./Icon";

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
      <NavbarIcon
        icon="Account"
        onClick={() => setPopupOpened((current) => !current)}
      />
      {canAccessRefill && (
        <NavbarIcon icon="SupervisorAccount" route="/refill" />
      )}
      {isPopupOpened ? <AccountPopup user={user} /> : null}
    </div>
  );
}

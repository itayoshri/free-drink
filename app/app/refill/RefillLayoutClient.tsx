"use client";
import { useAuth } from "@/context/auth";
import { useMemo } from "react";
import UnauthrizedPage from "./unauthrized";
import RefillLoadingPage from "./loading";
import Navbar from "@/components/UI/Navbar";
import hasPermission from "@/utils/auth/permissions";
import { User } from "@/interfaces/db/auth";

export default function RefillClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading, rolesMap } = useAuth();
  const canAccess =
    user &&
    rolesMap &&
    hasPermission(user as User, "invitation.generate", rolesMap);

  return (
    <>
      {canAccess && !loading && <Navbar />}
      <main className="refill-route bg-zinc-900 flex-1 h-full flex flex-col justify-center items-center px-6">
        {loading ? (
          <RefillLoadingPage />
        ) : canAccess ? (
          children
        ) : (
          <UnauthrizedPage />
        )}
      </main>
    </>
  );
}

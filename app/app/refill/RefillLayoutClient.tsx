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
  const canAccess = useMemo(() => {
    return hasPermission(user as User, "invitation.generate", rolesMap);
  }, [user, rolesMap]);

  return (
    <>
      {loading ? (
        <RefillLoadingPage />
      ) : canAccess ? (
        <>
          <main className="refill-route bg-zinc-900 flex-1 h-full flex flex-col items-center justify-center px-6 py-12">
            {children}
          </main>
        </>
      ) : (
        <main className="refill-route bg-zinc-900 flex-1 h-full flex flex-col items-center justify-center px-6 py-12">
          <UnauthrizedPage />
        </main>
      )}
    </>
  );
}

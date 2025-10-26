"use client";
import { useAuth, User } from "@/context/auth";
import { useMemo } from "react";
import UnauthrizedPage from "./unauthrized";
import RefillLoadingPage from "./loading";

export default function RefillClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();
  const isAdmin = useMemo(
    () => user && (user as User).role_key === "admin",
    [user]
  );

  return (
    <main className="bg-zinc-900 flex-1 h-full flex flex-col justify-center items-center px-6">
      {loading ? (
        <RefillLoadingPage />
      ) : isAdmin ? (
        children
      ) : (
        <UnauthrizedPage />
      )}
    </main>
  );
}

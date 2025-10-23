"use client";
import { useAuth, User } from "@/context/auth";
import { unauthorized } from "next/navigation";
import { useMemo } from "react";
import UnauthrizedPage from "./unauthrized";

export default function RefillLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  const isAdmin = useMemo(
    () => user && (user as User).role_key === "admin",
    [user]
  );

  return user ? (
    <main className="bg-zinc-900 flex-1 flex flex-col justify-center items-center px-6">
      {isAdmin ? children : <UnauthrizedPage />}
    </main>
  ) : null;
}

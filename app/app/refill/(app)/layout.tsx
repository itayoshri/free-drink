"use client";
import Navbar from "@/components/UI/Navbar";
import hasPermission from "@/utils/auth/permissions";
import UnauthrizedPage from "../unauthrized/page";
import { useAuth } from "@/context/auth";

export default function RefillLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { rolesMap, user } = useAuth();
  const canAccess = hasPermission(
    { role_key: user?.role_key as string },
    "invitation.generate",
    rolesMap
  );

  return (
    <>
      {canAccess && <Navbar />}
      <main className="refill-route bg-zinc-900 flex-1 h-full flex flex-col items-center justify-center px-6 py-12">
        {canAccess ? children : <UnauthrizedPage />}
      </main>
    </>
  );
}

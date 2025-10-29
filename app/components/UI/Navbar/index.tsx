"use client";
import { useAuth, User } from "@/context/auth";
import Logo from "../Logo";
import SignedUser from "./SignedUser";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { useApp } from "@/context";

export default function Navbar() {
  const { isAuth, user } = useAuth();
  const { setStep } = useApp();

  const router = useRouter();
  const pathname = usePathname();
  const navigateHome = useCallback(() => {
    if (pathname === "/") setStep("phoneNumber");
    else router.push("/");
  }, [pathname, router, setStep]);

  return (
    <div className="flex sticky border-b-[1px] border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-black dark:text-white justify-between h-14 items-center w-full px-page py-3 top-0">
      {isAuth ? (
        <SignedUser user={user as User} />
      ) : (
        <button
          className=" bg-primary text-white rounded-full p-3 py-1 text-sm"
          onClick={() => router.push("/account")}
        >
          כניסה
        </button>
      )}
      <button onClick={() => navigateHome()}>
        <Logo className="h-4 fill-primary" version="short" />
      </button>
    </div>
  );
}

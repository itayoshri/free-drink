"use client";
import { useAuth, User } from "@/context/auth";
import Logo from "../Logo";
import SignedUser from "./SignedUser";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isAuth, user } = useAuth();
  const router = useRouter();
  return (
    <div className="flex sticky border-[1px] border-gray-300 bg-white justify-between h-16 items-center w-full px-page py-3 top-0">
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
      <Logo className="h-4 fill-primary" version="short" />
    </div>
  );
}

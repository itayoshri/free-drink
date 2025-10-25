"use client";
import LoadingSpinner from "@/components/UI/Loading";
import Logo from "@/components/UI/Logo";

export default function RefillLoadingPage() {
  return (
    <div className="w-screen h-[100dvh] gap-6 z-50 flex flex-col justify-center items-center">
      <Logo className="h-6" version="refill" />
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner />
      </div>
    </div>
  );
}

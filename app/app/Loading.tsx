"use client";
import LoadingSpinner from "@/components/UI/Loading";
import Logo from "@/components/UI/Logo";
import { useApp } from "@/context";
import { useState, useEffect } from "react";

export default function LoadingPage() {
  const TEXTS = ["מתחבר למשתמש", "מעבד תשובות מ-DB", "עונה על חידונים"];
  const [index, setIndex] = useState(0);
  const { step } = useApp();

  useEffect(() => {
    if (step === "verificationCode")
      if (index < TEXTS.length - 1) {
        const timer = setTimeout(() => {
          setIndex((prev) => prev + 1);
        }, 2000);

        return () => clearTimeout(timer);
      }
  }, [index, TEXTS.length, step]);

  return (
    <div className="w-screen h-[100dvh] gap-6 z-50 flex flex-col justify-center items-center bg-white">
      <Logo className="h-6" />
      <div className="flex flex-col items-center gap-3">
        {step === "verificationCode" ? (
          <a className="text-xl text-black font-bold">{TEXTS[index]}</a>
        ) : null}
        <LoadingSpinner />
      </div>
    </div>
  );
}

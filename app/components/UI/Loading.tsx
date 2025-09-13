"use client";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function LoadingPage() {
  const TEXTS = ["מתחבר למשתמש", "מעבד תשובות מ-DB", "עונה על חידונים"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < TEXTS.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [index, TEXTS.length]);

  return (
    <div className="w-screen h-[100dvh] gap-6 z-50 flex flex-col justify-center items-center bg-white">
      <Image
        src={"/logo.png"}
        width={120}
        height={20}
        style={{ height: "auto" }}
        alt="itay"
      />
      <div className="flex flex-col items-center gap-3">
        <a className="text-xl text-black font-bold">{TEXTS[index]}</a>
        <CircularProgress sx={{ color: "#DD1D2A" }} />
      </div>
    </div>
  );
}

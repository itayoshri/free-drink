"use client";
import { useApp } from "@/context";
import PhoneInputPage from "../PhoneInput";
import VerifyPage from "../VerificationCode";
import CompletedPage from "../Completed";
import { JSX } from "react";

const steps: Record<string, JSX.Element> = {
  phoneNumber: <PhoneInputPage />,
  verificationCode: <VerifyPage />,
  completed: <CompletedPage />,
};

export default function Home() {
  const { step } = useApp();

  return steps[step] ?? null;
}

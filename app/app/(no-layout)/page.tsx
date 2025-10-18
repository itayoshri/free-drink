"use client";
import { useAuth } from "@/context";
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
  const { step } = useAuth();

  return steps[step] ?? null;
}

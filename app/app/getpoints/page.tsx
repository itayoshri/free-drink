"use client";
import { useApp } from "@/context";
import PhoneInputPage from "../PhoneInput";
import VerifyPage from "../VerificationCode";
import CompletedPage from "../Completed";
import { JSX } from "react";
import { useLoading } from "@/context/loading";
import LoadingPage from "@/app/Loading";

const steps: Record<string, JSX.Element> = {
  phoneNumber: <PhoneInputPage />,
  verificationCode: <VerifyPage />,
  completed: <CompletedPage />,
};

export default function Home() {
  const { loading } = useLoading();
  const { step } = useApp();

  return loading ? <LoadingPage /> : steps[step] ?? null;
}

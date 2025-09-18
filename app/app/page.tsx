"use client";
import { useAuth } from "@/context";
import PhoneInputPage from "./PhoneInput";
import VerifyPage from "./VerificationCode";
import LoadingPage from "./Loading";
import CompletedPage from "./Completed";

export default function Home() {
  const { step } = useAuth();
  switch (step) {
    case "phoneNumber":
      return <PhoneInputPage />;
    case "verificationCode":
      return <VerifyPage />;
    case "loading":
      return <LoadingPage />;
    case "completed":
      return <CompletedPage />;
    default:
      break;
  }
}

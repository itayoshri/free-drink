"use client";
import axios from "axios";
import { useCallback } from "react";
import { useApp } from "@/context";
import PhoneNumberInput from "@/components/UI/PhoneNumberInput";

export default function PhoneInputPage() {
  const { setMobilePhone, setStep, setLoading } = useApp();
  const sendVerificationCode = useCallback(
    (phoneNumber: string) => {
      if (phoneNumber) {
        setLoading(true);
        axios
          .get(`/api/sendVerificationCode?mobilePhone=${phoneNumber}`)
          .then((res) => {
            setLoading(false);
            setMobilePhone(phoneNumber);
            if (res.status == 200) {
              setStep("verificationCode");
            }
          });
      }
    },
    [setLoading, setMobilePhone, setStep]
  );

  return (
    <div className="flex flex-col w-full gap-8">
      <h1 className="text-5xl text-black font-bold">
        הקלידו את מספר הטלפון שלכם.
      </h1>
      <PhoneNumberInput
        onSubmit={(phoneNumber) => sendVerificationCode(phoneNumber)}
        placeholder="מספר טלפון"
        buttonLabel="הבא"
      />
    </div>
  );
}

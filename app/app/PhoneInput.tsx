"use client";
import axios from "axios";
import { useCallback } from "react";
import { useAuth } from "@/context";
import PhoneNumberInput from "@/components/UI/PhoneNumberInput";

export default function PhoneInputPage() {
  const { setMobilePhone, mobilePhone, setStep, setLoading } = useAuth();
  const sendVerificationCode = useCallback(() => {
    if (mobilePhone) {
      setLoading(true);
      axios
        .get(`/api/sendVerificationCode?mobilePhone=${mobilePhone}`)
        .then((res) => {
          setLoading(false);
          if (res.status == 200) {
            setStep("verificationCode");
          }
        });
    }
  }, [mobilePhone, setLoading, setStep]);

  return (
    <div className="flex flex-col w-full gap-8">
      <h1 className="text-5xl text-black font-bold">
        הקלידו את מספר הטלפון שלכם.
      </h1>
      <PhoneNumberInput
        onChange={(newValue) => setMobilePhone(newValue)}
        onClick={() => sendVerificationCode()}
        placeholder="מספר טלפון"
      >
        הבא
      </PhoneNumberInput>
    </div>
  );
}

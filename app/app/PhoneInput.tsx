"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import axios from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useAuth } from "@/context";

export default function PhoneInputPage() {
  const phoneButtonRef = useRef<HTMLButtonElement>(null);
  const { setMobilePhone, mobilePhone, setStep } = useAuth();
  const sendVerificationCode = useCallback(() => {
    setStep("loading");
    axios
      .get(`/api/sendVerificationCode?mobilePhone=${mobilePhone}`)
      .then((res) => {
        if (res.status == 200) {
          setStep("verificationCode");
        } else setStep("phoneNumber");
      });
  }, [mobilePhone, setStep]);

  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      const buttonRef = phoneButtonRef;
      if (event.key === "Enter") {
        // Trigger click if button exists
        if (buttonRef.current) {
          buttonRef.current.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col w-full gap-8">
      <h1 className="text-5xl text-black font-bold">
        הקלידו את מספר הטלפון שלכם.
      </h1>
      <div className="flex flex-col items-start w-full gap-4">
        <Input
          onChange={(newValue) => setMobilePhone(newValue.currentTarget.value)}
          placeholder="מספר טלפון"
          type="tel"
          key={0}
        />
        <Button
          onClick={() => sendVerificationCode()}
          className="bg-gray-400"
          ref={phoneButtonRef}
        >
          הבא
        </Button>
      </div>
    </div>
  );
}

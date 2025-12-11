"use client";
import axios from "axios";
import { useCallback } from "react";
import { useApp } from "@/context";
import PhoneNumberInput from "@/components/UI/PhoneNumberInput";
import { useAuth } from "@/context/auth";
import hasPermission from "@/utils/auth/permissions";
import { User } from "@/interfaces/db/auth";
import { useUserInfo } from "@/context/user";
import { useLoading } from "@/context/loading";

export default function PhoneInputPage() {
  const { setStep } = useApp();
  const { mobilePhone, setMobilePhone } = useUserInfo();
  const { user, rolesMap } = useAuth();
  const { setLoading } = useLoading();
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

  const changablePhoneNumber = hasPermission<boolean>(
    user as User,
    "points.otherPhoneNumber",
    rolesMap
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
        defaultValue={mobilePhone as string}
        changable={changablePhoneNumber}
      />
    </div>
  );
}

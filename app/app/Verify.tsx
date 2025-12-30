"use client";
import Button from "@/components/button";
import OtpInput from "@/components/UI/OTP";
import EditPhoneNumber from "@/components/UI/OTP/Edit";
import { useAuth } from "@/context/auth";
import { useUserInfo } from "@/context/user";
import { User } from "@/interfaces/db/auth";
import hasPermission from "@/utils/auth/permissions";
import { useCallback, useEffect, useRef, useState } from "react";
import { getPointsStepProps } from "./getpoints/page";

interface VerifyPageProps extends getPointsStepProps {
  onClick(
    mobilePhone: string,
    verificationCode: number,
    amountOfCorks?: number
  ): unknown;
}

export default function VerifyPage({ onClick, setStep }: VerifyPageProps) {
  const { mobilePhone, setMobilePhone } = useUserInfo();
  const { user, rolesMap } = useAuth();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [digits, setDigits] = useState([0, 0, 0, 0]);

  const changeDigit = useCallback((index: number, digit: number) => {
    setDigits((arr) => {
      arr[index] = digit;
      return arr;
    });
  }, []);

  const clearPhoneNumber = useCallback(() => {
    setMobilePhone("");
    setStep("phoneNumber");
  }, [setMobilePhone, setStep]);

  const amountOfCorks = hasPermission<number>(
    user as User,
    "points.amount",
    rolesMap
  );

  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      if (event.key === "Enter") {
        buttonRef.current?.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-black text-2xl font-bold">
            הקלידו את קוד האימות שקיבלתם
          </h2>
          <EditPhoneNumber
            mobilePhone={mobilePhone as string}
            clearPhoneNumber={clearPhoneNumber}
          />
        </div>
        <div className="flex flex-col items-center w-full gap-4">
          <OtpInput changeDigit={changeDigit} length={4} />
        </div>
        <Button
          onClick={() =>
            onClick(
              mobilePhone as string,
              Number(digits.join("")),
              amountOfCorks as number
            )
          }
          className=""
          ref={buttonRef}
        >
          קבלו {amountOfCorks} פקקים
        </Button>
      </div>
    </>
  );
}

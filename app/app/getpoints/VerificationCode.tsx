"use client";
import Button from "@/components/button";
import OtpInput from "@/components/UI/OTP";
import EditPhoneNumber from "@/components/UI/OTP/Edit";
import { useApp } from "@/context";
import { useAuth } from "@/context/auth";
import { useLoading } from "@/context/loading";
import { useUserInfo } from "@/context/user";
import { User } from "@/interfaces/db/auth";
import hasPermission from "@/utils/auth/permissions";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

export default function VerifyPage() {
  const { setStep, setgetPointsResData } = useApp();
  const { mobilePhone, setMobilePhone, setAccessToken } = useUserInfo();
  const { user, rolesMap } = useAuth();
  const { setLoading } = useLoading();

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

  const getPoints = useCallback(async () => {
    const startTime = performance.now();
    setLoading(true);
    try {
      await axios
        .post(`/api/getPoints`, {
          verificationCode: digits.join(""),
          mobilePhone: mobilePhone,
        })
        .then((res) => {
          const endTime = performance.now();
          const duration = ((endTime - startTime) / 1000).toFixed(2);
          setStep("completed");
          setAccessToken(res.data.data.accessToken);
          setgetPointsResData({ ...res.data, duration, points: amountOfCorks });
        });
    } catch {
      // TODO: add toast error
    } finally {
      setLoading(false);
    }
  }, [
    amountOfCorks,
    digits,
    mobilePhone,
    setAccessToken,
    setLoading,
    setStep,
    setgetPointsResData,
  ]);

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
        <Button onClick={() => getPoints()} className="" ref={buttonRef}>
          קבלו {amountOfCorks} פקקים
        </Button>
      </div>
    </>
  );
}

"use client";
import Button from "@/components/button";
import OtpInput from "@/components/UI/OTP";
import { useAuth } from "@/context";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

export default function VerifyPage() {
  const {
    mobilePhone,
    setMobilePhone,
    setStep,
    setgetPointsResData,
    setLoading,
  } = useAuth();

  const codeButtonRef = useRef<HTMLButtonElement>(null);
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
          setgetPointsResData({ ...res.data, duration });
        });
    } catch {
      // TODO: add toast error
    } finally {
      setLoading(false);
    }
  }, [digits, mobilePhone, setLoading, setStep, setgetPointsResData]);

  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      const buttonRef = codeButtonRef;
      if (event.key === "Enter") {
        if (buttonRef.current) {
          //buttonRef.current.click();
        }
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
          <div className="flex flex-col items-center">
            <p className="text-md text-gray-500">
              <span className="font-medium">הקלידו את קוד האימות שנשלח ל</span>
              <span className="font-inter font-semibold">{mobilePhone}</span>
            </p>
            <button
              onClick={() => clearPhoneNumber()}
              className="text-red-500 font-bold"
            >
              ערוך מספר
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center w-full gap-4">
          <OtpInput changeDigit={changeDigit} length={4} />
          {/*<div className="text-lg text-gray-500 font-medium">
            <span className="text-red-500 font-bold">שליחה מחדש</span>{" "}
            <span>בעוד</span> <span className="font-inter">1:36</span>
          </div>*/}
        </div>
        <Button onClick={() => getPoints()} className="" ref={codeButtonRef}>
          קבלו 80 פקקים
        </Button>
      </div>
    </>
  );
}

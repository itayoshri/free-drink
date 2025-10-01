"use client";
import Button from "@/components/button";
import OtpInput from "@/components/UI/OtpInput";
import { useAuth } from "@/context";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

export default function VerifyPage() {
  const { mobilePhone, setStep, setgetPointsResData, setLoading } = useAuth();

  const codeButtonRef = useRef<HTMLButtonElement>(null);
  const [digits, setDigits] = useState([0, 0, 0, 0]);

  const changeDigit = useCallback((index: number, digit: number) => {
    setDigits((arr) => {
      arr[index] = digit;
      return arr;
    });
  }, []);

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
      <div className="flex flex-col items-center gap-9 w-full">
        <h2 className="text-black text-xl font-bold">
          הקלידו את קוד האימות שקיבלתם
        </h2>
        <div className="flex flex-col items-center w-full gap-4">
          <OtpInput changeDigit={changeDigit} length={4} />
          {/*<a className="text-black text-lg">לא קיבלתם את הקוד? שליחה מחדש</a>*/}
        </div>
        <Button onClick={() => getPoints()} className="" ref={codeButtonRef}>
          קבלו 80 פקקים
        </Button>
      </div>
    </>
  );
}

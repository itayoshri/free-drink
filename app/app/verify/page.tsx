"use client";
import Button from "@/components/button";
import Digit from "@/components/OTP/digit";
import ScreenConfetti from "@/components/UI/Confetti";
import { useAuth } from "@/context";
import axios from "axios";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

export default function VerifyPage() {
  const { mobilePhone } = useAuth();

  const codeButtonRef = useRef<HTMLButtonElement>(null);
  const [digits, setDigits] = useState([0, 0, 0, 0]);
  const [showConfetti, setConfetti] = useState(false);

  const changeDigit = useCallback((index: number, digit: number) => {
    setDigits((arr) => {
      arr[index] = digit;
      return arr;
    });
  }, []);

  const getPoints = useCallback(() => {
    axios
      .post(`/api/getPoints`, {
        verificationCode: digits.join(""),
        mobilePhone: mobilePhone,
      })
      .then((res) => {
        console.log(res.data);
        setConfetti(true);
      });
  }, [digits, mobilePhone]);

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
          <div className="flex w-full gap-2 justify-between">
            <Digit setValue={(digit) => changeDigit(3, digit)}></Digit>
            <Digit setValue={(digit) => changeDigit(2, digit)}></Digit>
            <Digit setValue={(digit) => changeDigit(1, digit)}></Digit>
            <Digit setValue={(digit) => changeDigit(0, digit)}></Digit>
          </div>
          {/*<a className="text-black text-lg">לא קיבלתם את הקוד? שליחה מחדש</a>*/}
        </div>
        <Button onClick={() => getPoints()} className="" ref={codeButtonRef}>
          קבל 60 פקקים
        </Button>
      </div>
      {showConfetti ? <ScreenConfetti /> : null}
    </>
  );
}

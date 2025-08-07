"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import Digit from "@/components/OTP/digit";
import ScreenConfetti from "@/components/UI/Confetti";
import axios from "axios";
import { useCallback, useState } from "react";

export default function Home() {
  const [mobilePhone, setMobilePhone] = useState("0");
  const [showCode, setShowCode] = useState(false);
  const [digits, setDigits] = useState([0, 0, 0, 0]);
  const [showConfetti, setConfetti] = useState(false);
  const changeDigit = useCallback((index: number, digit: number) => {
    setDigits((arr) => {
      arr[index] = digit;
      return arr;
    });
  }, []);
  const sendVerificationCode = useCallback(() => {
    axios
      .get(`/api/sendVerificationCode?mobilePhone=${mobilePhone}`)
      .then((res) => {
        if (res.status == 200) {
          setShowCode(true);
        }
      });
  }, [mobilePhone]);

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

  return (
    <div className="bg-white flex flex-col gap-4 justify-center items-center h-screen w-screen px-6">
      {/*TODO: seperate to components*/}
      {showCode ? (
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
            <Button onClick={() => getPoints()} className="">
              קבל 60 פקקים
            </Button>
          </div>
          {showConfetti ? <ScreenConfetti /> : null}
        </>
      ) : (
        <div className="flex flex-col w-full gap-8">
          <h1 className="text-5xl text-black font-bold">
            הקלידו את מספר הטלפון שלכם.
          </h1>
          <div className="flex flex-col items-start w-full gap-4">
            <Input
              onChange={(newValue) =>
                setMobilePhone(newValue.currentTarget.value)
              }
              placeholder="מספר טלפון"
              className="text-black"
              key={0}
            />
            <Button
              onClick={() => sendVerificationCode()}
              className="bg-gray-400"
            >
              הבא
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

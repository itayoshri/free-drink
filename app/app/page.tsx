"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import axios from "axios";
import { useCallback, useState } from "react";

export default function Home() {
  const [mobilePhone, setMobilePhone] = useState("0");
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState("0");
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
        verificationCode: code,
        mobilePhone: mobilePhone,
      })
      .then((res) => {
        console.log(res.data);
      });
  }, [code, mobilePhone]);

  return (
    <div className="bg-white flex flex-col gap-4 justify-center items-center h-screen w-screen px-6">
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

      {showCode ? (
        <div className="flex flex-col items-start w-full gap-4">
          <Input
            onChange={(newValue) => setCode(newValue.currentTarget.value)}
            placeholder="קוד אימות"
            className=""
            key={1}
          />
          <Button onClick={() => getPoints()} className="">
            קבל 60 פקקים
          </Button>
        </div>
      ) : null}
    </div>
  );
}

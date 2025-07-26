"use client";
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
    <div className="bg-white flex flex-col gap-4 justify-center items-center h-screen w-screen">
      <div className="flex flex-row">
        <input
          onChange={(newValue) => setMobilePhone(newValue.currentTarget.value)}
          placeholder="Enter Phone Number"
          className="text-black"
          key={0}
        />
        <button onClick={() => sendVerificationCode()} className="bg-gray-400">
          send code
        </button>
      </div>
      {showCode ? (
        <div className="flex flex-row">
          <input
            onChange={(newValue) => setCode(newValue.currentTarget.value)}
            placeholder="Enter code"
            className="text-black"
            key={1}
          />
          <button onClick={() => getPoints()} className="bg-gray-400">
            get 60 points to account
          </button>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { useCallback, useRef, useState } from "react";
import Button from "../button";
import Input from "../input";
import axios from "axios";
import router from "next/router";

export default function ClientAuth() {
  const [input, setInput] = useState("");
  const verify = useCallback(() => {
    axios.post(`/api/auth`, { token: input }).then((res) => {
      if (res.status == 200) {
        console.log(res.data);
      }
    });
  }, [input]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="flex absolute h-[100dvh] px-6 w-screen items-center justify-center bg-black/50">
      <div className="flex flex-col items-center gap-5 bg-white w-full p-4 rounded-xl">
        <h2 className="text-black text-xl font-bold">הקלידו את הסיסמה שלכם</h2>{" "}
        <div className="flex flex-col gap-4 w-full">
          <Input
            onChange={(newValue) => setInput(newValue.currentTarget.value)}
            placeholder="סיסמה"
          />
          <Button onClick={() => verify()} ref={buttonRef}>
            אימות
          </Button>
        </div>
      </div>
    </div>
  );
}

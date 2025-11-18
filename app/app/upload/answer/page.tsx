"use client";
import Button from "@/components/button";
import axios from "axios";
import { useCallback, useRef, useState } from "react";

export default function UploadAnswersPage() {
  const ref = useRef<HTMLButtonElement>(null);
  const [answer, setAnswer] = useState("");
  const uploadAnswer = useCallback((answer: string) => {
    axios
      .post("/api/upload/answer", { answer: JSON.parse(answer) })
      .then((res) => {
        if (res.status == 200) {
          setAnswer("");
        }
      });
    setAnswer("");
  }, []);

  return (
    <div className="flex flex-col w-full gap-4 h-full py-30">
      <textarea
        onChange={(e) => setAnswer(e.target.value)}
        value={answer}
        className="text-black !font-code ltr text-left h-full border-[1px] border-gray-300 w-full font-medium outline-primary py-3 px-4 rounded-xl"
      ></textarea>
      <Button onClick={() => uploadAnswer(answer)} ref={ref}>
        העלאת תשובה
      </Button>
    </div>
  );
}

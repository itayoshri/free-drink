"use client";
import { useApp } from "@/context";
import PhoneInputPage from "./PhoneInput";
import VerifyPage from "../Verify";
import CompletedPage from "./Completed";
import { JSX, useCallback, useState } from "react";
import { useLoading } from "@/context/loading";
import LoadingPage from "@/app/Loading";
import axios from "axios";
import { useUserInfo } from "@/context/user";

type Step = "phoneNumber" | "verificationCode" | "loading" | "completed";

export type getPointsStepProps = {
  setStep: (step: Step) => void;
};

export default function Home() {
  const { loading, setLoading } = useLoading();
  const [step, setStep] = useState<Step>("phoneNumber");
  const { setgetPointsResData } = useApp();
  const { setAccessToken } = useUserInfo();
  const getPoints = useCallback(
    async (
      mobilePhone: string,
      verificationCode: number,
      amountOfCorks: number
    ) => {
      const startTime = performance.now();
      setLoading(true);
      try {
        await axios
          .post(`/api/getPoints`, {
            verificationCode,
            mobilePhone,
          })
          .then((res) => {
            const endTime = performance.now();
            const duration = ((endTime - startTime) / 1000).toFixed(2);
            setStep("completed");
            setAccessToken(res.data.data.accessToken);
            setgetPointsResData({
              ...res.data,
              duration,
              points: amountOfCorks,
            });
          });
      } catch {
        // TODO: add toast error
      } finally {
        setLoading(false);
      }
    },
    [setAccessToken, setLoading, setStep, setgetPointsResData]
  );

  const steps: Record<string, JSX.Element> = {
    phoneNumber: <PhoneInputPage setStep={setStep} />,
    verificationCode: <VerifyPage onClick={getPoints} setStep={setStep} />,
    completed: <CompletedPage setStep={setStep} />,
  };

  return loading ? <LoadingPage /> : steps[step] ?? null;
}

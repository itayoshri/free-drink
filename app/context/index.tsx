"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import { User } from "@/interfaces/db/auth";

type AppContextType = {
  accessToken: string | null;
  mobilePhone: string | null;
  step: Step;
  getPointsResData: Record<string, unknown>;
  setAccessToken: (token: string | null) => void;
  setMobilePhone: (phone: string | null) => void;
  setStep: (step: Step) => void;
  setgetPointsResData: (data: Record<string, unknown>) => void;
};

type Step = "phoneNumber" | "verificationCode" | "loading" | "completed";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [mobilePhone, setMobilePhone] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("phoneNumber");
  const [getPointsResData, setgetPointsResData] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    if (user && !mobilePhone) setMobilePhone((user as User).phone_number);
  }, [mobilePhone, user]);

  return (
    <AppContext.Provider
      value={{
        accessToken,
        mobilePhone,
        step,
        getPointsResData,
        setAccessToken,
        setMobilePhone,
        setStep,
        setgetPointsResData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

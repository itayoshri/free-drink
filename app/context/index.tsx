"use client";
import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [mobilePhone, setMobilePhone] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("phoneNumber");
  const [getPointsResData, setgetPointsResData] = useState({});

  return (
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

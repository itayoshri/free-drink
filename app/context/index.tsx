"use client";
import React, { createContext, useContext, useState } from "react";

type AppContextType = {
  accessToken: string | null;
  mobilePhone: string | null;
  step: Step;
  loading: boolean;
  getPointsResData: Record<string, unknown>;
  setAccessToken: (token: string | null) => void;
  setMobilePhone: (phone: string | null) => void;
  setStep: (step: Step) => void;
  setLoading: (loading: boolean) => void;
  setgetPointsResData: (data: Record<string, unknown>) => void;
};

type Step = "phoneNumber" | "verificationCode" | "loading" | "completed";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [mobilePhone, setMobilePhone] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("phoneNumber");
  const [loading, setLoading] = useState(false);
  const [getPointsResData, setgetPointsResData] = useState({});

  return (
    <AppContext.Provider
      value={{
        accessToken,
        mobilePhone,
        step,
        loading,
        getPointsResData,
        setAccessToken,
        setMobilePhone,
        setStep,
        setLoading,
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

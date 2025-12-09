"use client";
import React, { createContext, useContext, useState } from "react";

type AppContextType = {
  step: Step;
  getPointsResData: Record<string, unknown>;
  setStep: (step: Step) => void;
  setgetPointsResData: (data: Record<string, unknown>) => void;
};

type Step = "phoneNumber" | "verificationCode" | "loading" | "completed";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState<Step>("phoneNumber");
  const [getPointsResData, setgetPointsResData] = useState({});

  return (
    <AppContext.Provider
      value={{
        step,
        getPointsResData,
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

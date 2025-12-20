"use client";
import React, { createContext, useContext, useState } from "react";

type AppContextType = {
  getPointsResData: Record<string, unknown>;
  setgetPointsResData: (data: Record<string, unknown>) => void;
};

export type Step = "phoneNumber" | "verificationCode" | "loading" | "completed";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [getPointsResData, setgetPointsResData] = useState({});

  return (
    <AppContext.Provider
      value={{
        getPointsResData,
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

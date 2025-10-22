"use client";
import { AUTH_SERVER_URL } from "@/app/account/Form";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

type AppContextType = {
  accessToken: string | null;
  mobilePhone: string | null;
  step: Step;
  loading: boolean;
  getPointsResData: Record<string, unknown>;
  rolesMap: Record<string, string>;
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
  const [rolesMap, setRolesMap] = useState({});

  useEffect(() => {
    axios.get(`${AUTH_SERVER_URL}/invitation/roles`).then((res) => {
      setRolesMap(res.data.data.roles);
    });
  });

  return (
    <AppContext.Provider
      value={{
        accessToken,
        mobilePhone,
        step,
        loading,
        getPointsResData,
        rolesMap,
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

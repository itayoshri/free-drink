"use client";
import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
  accessToken: string | null;
  mobilePhone: string | null;
  setAccessToken: (token: string | null) => void;
  setMobilePhone: (phone: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [mobilePhone, setMobilePhone] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{ accessToken, mobilePhone, setAccessToken, setMobilePhone }}
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

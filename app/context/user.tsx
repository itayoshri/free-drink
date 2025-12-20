"use client";
import React, { createContext, useContext, useState } from "react";

type UserContextType = {
  accessToken: string | null;
  nayaxAccessToken: string | null;

  mobilePhone: string | null;
  setAccessToken: (token: string | null) => void;
  setNayaxAccessToken: (token: string | null) => void;
  setMobilePhone: (phone: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  children,
  phoneNumber,
}: {
  children: React.ReactNode;
  phoneNumber: string | undefined;
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [nayaxAccessToken, setNayaxAccessToken] = useState<string | null>(null);
  const [mobilePhone, setMobilePhone] = useState<string | null>(
    phoneNumber || null
  );

  return (
    <UserContext.Provider
      value={{
        accessToken,
        nayaxAccessToken,
        mobilePhone,
        setAccessToken,
        setNayaxAccessToken,
        setMobilePhone,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserInfo = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

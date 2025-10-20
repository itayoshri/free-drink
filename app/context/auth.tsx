"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: object;
  setUser: (user: object) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<object>({});
  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) setUser(JSON.parse(localStorageUser));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
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

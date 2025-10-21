"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: object | null;
  setUser: (user: User) => void;
  isAuth: boolean;
  setIsAuth: (authed: boolean) => void;
};

export type User = object;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  isAuth: initialValue,
}: {
  children: React.ReactNode;
  isAuth: boolean;
}) => {
  const [isAuth, setIsAuth] = useState(initialValue);
  const [user, setUserVar] = useState<User | null>(null);

  const setUser = (newUser: User) => {
    try {
      if (typeof window !== "undefined") {
        if (newUser) {
          localStorage.setItem("user", JSON.stringify(newUser));
          setIsAuth(true);
        } else {
          localStorage.removeItem("user");
          setIsAuth(false);
        }
        setUserVar(newUser);
      }
    } catch {}
  };

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) setUserVar(JSON.parse(localStorageUser as string));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setIsAuth,
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

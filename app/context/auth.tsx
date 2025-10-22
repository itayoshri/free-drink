"use client";
import { AUTH_SERVER_URL } from "@/app/account/Form";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: object | null;
  setUser: (user: User) => void;
  isAuth: boolean;
  setIsAuth: (authed: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  logout: () => unknown;
};

export type User = {
  user_id: string;
  phone_number: string;
  role_key: string;
  created_token: string;
  upgrade_token: string;
  //created_at: string;
};

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
  const [loading, setLoading] = useState(!Boolean(user));

  const logout = async () => {
    await axios.post(
      `${AUTH_SERVER_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    setUser();
  };

  const setUser = (newUser?: User) => {
    try {
      if (typeof window !== "undefined") {
        if (newUser) {
          localStorage.setItem("user", JSON.stringify(newUser));
          setIsAuth(true);
          setUserVar(newUser);
        } else {
          setUserVar(null);
          setIsAuth(false);
          localStorage.removeItem("user");
        }
      }
    } catch {}
  };

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) setUserVar(JSON.parse(localStorageUser as string));
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setIsAuth,
        loading,
        setLoading,
        logout,
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

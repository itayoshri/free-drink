"use client";
import { AUTH_SERVER_URL } from "@/app/account/Form";
import { PermissionData } from "@/utils/auth/permissions";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export type userContextObj = {
  role_key: string;
  phone_number: string;
};

type AuthContextType = {
  user: userContextObj | null;
  setUser: (user: userContextObj) => void;
  isAuth: boolean;
  setIsAuth: (authed: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  logout: () => unknown;
  rolesMap: PermissionData;
  setUserRole: (newRole: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  isAuth: initialValue,
  rolesMap,
  user: inistialUser,
}: {
  children: React.ReactNode;
  isAuth: boolean;
  rolesMap: PermissionData;
  user: userContextObj | undefined;
}) => {
  const [isAuth, setIsAuth] = useState(initialValue);
  const [user, setUserVar] = useState<userContextObj | null>(
    inistialUser || null
  );
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await axios.post(
      `${AUTH_SERVER_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    setUser();
  };

  const setUser = (newUser?: userContextObj) => {
    try {
      if (typeof window !== "undefined") {
        if (newUser) {
          setIsAuth(true);
          setUserVar(newUser);
        } else {
          setUserVar(null);
          setIsAuth(false);
        }
      }
    } catch {}
  };

  const setUserRole = (newRole: string) => {
    if (user) {
      const { role_key, ...noRoleUser } = user;
      setUser({ ...noRoleUser, role_key: newRole });
    }
  };

  useEffect(() => {
    if (!isAuth) setUser();
    setLoading(false);
  }, [isAuth]);

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
        rolesMap,
        setUserRole,
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

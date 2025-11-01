"use client";
import { AUTH_SERVER_URL } from "@/app/account/Form";
import { User } from "@/interfaces/db/auth";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
  isAuth: boolean;
  setIsAuth: (authed: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  logout: () => unknown;
  rolesMap: Record<string, Record<string, string>>;
  setUserRole: (newRole: string) => void;
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
  const [loading, setLoading] = useState(true);
  const [rolesMap, setRolesMap] = useState({});

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

  const setUserRole = (newRole: string) => {
    if (user) {
      const { role_key, ...noRoleUser } = user;
      setUser({ ...noRoleUser, role_key: newRole });
    }
  };

  useEffect(() => {
    if (!isAuth) setUser();
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) setUserVar(JSON.parse(localStorageUser as string));

    axios
      .get(`${AUTH_SERVER_URL}/invitation/roles`)
      .then((res) => {
        setRolesMap(res.data.data.roles);
      })
      .finally(() => {
        setLoading(false);
      });
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

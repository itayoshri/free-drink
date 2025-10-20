"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: object;
  setUser: (user: object) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserVar] = useState(() => {
    const localStorageUser = localStorage.getItem("user");
    return localStorageUser ? JSON.parse(localStorageUser) : {};
  });

  const setUser = useCallback((newUserObj: object) => {
    localStorage.setItem("user", JSON.stringify(newUserObj));
    setUserVar(newUserObj);
  }, []);

  useEffect(() => {
    const refreshAccessToken = async () => {
      const cookieStore = await cookies();
      const token = cookieStore.get("Authentication")?.value;

      if (!token) {
        console.log(1);
        const refreshToken = cookieStore.get("Refresh")?.value;
        if (refreshToken) {
          try {
            await axios.post(
              `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/refresh`,
              { refreshToken },
              {
                withCredentials: true,
              }
            );
          } catch {}
        }
      }
    };
  });

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

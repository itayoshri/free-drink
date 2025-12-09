import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context";
import { AuthProvider } from "@/context/auth";
import { cookies } from "next/headers";
import axios from "axios";
import { getUserPermissions } from "@/utils/auth/permissions";
import { UserProvider } from "@/context/user";
import { LoadingProvider } from "@/context/loading";
const AUTH_SERVER_URL = process.env.NEXT_PUBLIC_AUTH_SERVER_URL || "";

export const metadata: Metadata = {
  title: "Free Drink",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  const isAuth = Boolean(accessToken?.value);
  const rolesMap = (await axios.get(`${AUTH_SERVER_URL}/invitation/roles`)).data
    .data.roles;
  const { role: role_key, phone_number } = getUserPermissions(
    accessToken?.value as string
  );
  return (
    <AuthProvider
      isAuth={isAuth}
      rolesMap={rolesMap}
      user={{ role_key, phone_number }}
    >
      <AppProvider>
        <UserProvider phoneNumber={phone_number}>
          <LoadingProvider>
            <html lang="en">
              <body className={`antialiased h-dvh w-screen flex flex-col`}>
                {children}
              </body>
            </html>
          </LoadingProvider>
        </UserProvider>
      </AppProvider>
    </AuthProvider>
  );
}

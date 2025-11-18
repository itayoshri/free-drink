import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context";
import { AuthProvider } from "@/context/auth";
import { cookies } from "next/headers";
import axios from "axios";
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
  return (
    <AuthProvider isAuth={isAuth} rolesMap={rolesMap}>
      <AppProvider>
        <html lang="en">
          <body className={`antialiased  h-dvh w-screen flex flex-col`}>
            {children}
          </body>
        </html>
      </AppProvider>
    </AuthProvider>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/auth";
import { cookies } from "next/headers";
import {
  getAppPermissions,
  getUserPermissions,
} from "@/utils/auth/permissions";
import { UserProvider } from "@/context/user";
import { LoadingProvider } from "@/context/loading";

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
  const rolesMap = await getAppPermissions();
  const { role: role_key, phone_number } = getUserPermissions(
    accessToken?.value as string
  );
  return (
    <AuthProvider
      isAuth={isAuth}
      rolesMap={rolesMap}
      user={{ role_key, phone_number }}
    >
      <UserProvider phoneNumber={phone_number}>
        <LoadingProvider>
          <html lang="en">
            <body className={`antialiased h-dvh w-screen flex flex-col`}>
              {children}
            </body>
          </html>
        </LoadingProvider>
      </UserProvider>
    </AuthProvider>
  );
}

import type { Metadata } from "next";
import RefillLayoutClient from "./RefillLayoutClient";

export const metadata: Metadata = {
  title: "Admin Panel - ReFill",
};

export default function RefillLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RefillLayoutClient>{children}</RefillLayoutClient>;
}

import type { Metadata } from "next";
import RefillLayoutClient from "./RefillLayoutClient";
import Navbar from "@/components/UI/Navbar";

export const metadata: Metadata = {
  title: "Admin Panel - ReFill",
};

export default function RefillLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <RefillLayoutClient>{children}</RefillLayoutClient>;
    </>
  );
}

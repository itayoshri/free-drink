import type { Metadata } from "next";
import RefillLayoutClient from "./RefillLayoutClient";

export const metadata: Metadata = {
  title: "Refill Admin Panel",
  description: "Administrative section for Refill system",
};

export default function RefillLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RefillLayoutClient>{children}</RefillLayoutClient>;
}

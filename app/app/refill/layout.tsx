import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - ReFill",
};

export default function RefillLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

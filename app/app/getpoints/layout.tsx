"use client";
import Navbar from "@/components/UI/Navbar";
import "../globals.css";
import { useLoading } from "@/context/loading";

export default function GetpointsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useLoading();
  return (
    <>
      {!loading && <Navbar />}
      <main className="flex-1 flex flex-col justify-center items-center p-page">
        {children}
      </main>
    </>
  );
}

"use client";
import "../globals.css";
import { useApp } from "@/context";
import LoadingPage from "../Loading";
import Navbar from "@/components/UI/Navbar";

export default function NoLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useApp();

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center px-6">
        {children}
      </main>
    </>
  );
}

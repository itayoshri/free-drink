"use client";
import Navbar from "@/components/UI/Navbar";
import "../globals.css";
import LoadingPage from "../Loading";
import { useAuth } from "@/context/auth";

export default function NoLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center p-page">
        {children}
      </main>
    </>
  );
}

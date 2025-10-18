"use client";
import Navbar from "@/components/UI/Navbar";
import "../globals.css";
import { useAuth } from "@/context";
import LoadingPage from "../Loading";

export default function NoLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Navbar />
          <main className="flex-1 flex flex-col justify-center items-center px-6">
            {children}
          </main>
        </>
      )}
    </>
  ); // <- this disables the parent layout
}

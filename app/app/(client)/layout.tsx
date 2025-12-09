import Navbar from "@/components/UI/Navbar";
import "../globals.css";

export default function NoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center p-page">
        {children}
      </main>
    </>
  );
}

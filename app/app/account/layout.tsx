import "../globals.css";

export default function NoLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 flex flex-col justify-center items-center px-6">
      {children}
    </main>
  );
}

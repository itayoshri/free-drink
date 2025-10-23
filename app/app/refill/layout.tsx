export default function RefillLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-zinc-900 flex-1 flex flex-col justify-center items-center px-6">
      {children}
    </main>
  );
}

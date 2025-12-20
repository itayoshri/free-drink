import Logo from "@/components/UI/Logo";

export default function AccountTitle({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Logo className="h-3" />
      <h2 className="text-black text-2xl font-bold">{title}</h2>
    </div>
  );
}

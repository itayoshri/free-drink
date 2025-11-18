export default function TitledComponent({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <a className="text-black dark:text-white font-semibold">{title}</a>
      {children}
    </div>
  );
}

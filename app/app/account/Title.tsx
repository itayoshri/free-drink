import Logo from "@/components/UI/Logo";
import React from "react";

export default function AccountTitle({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Logo className="h-3" />
      {Boolean(title) && (
        <h2 className="text-black text-2xl font-bold">{title}</h2>
      )}
      {Boolean(children) && children}
    </div>
  );
}

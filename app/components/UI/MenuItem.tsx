import Link from "next/link";
import * as Icons from "../Icons";

type MenuItemProps = {
  text: string;
  icon: keyof typeof Icons;
  route: string;
};

export default function MenuItem({ text, icon, route }: MenuItemProps) {
  const IconComponent = Icons[icon];
  return (
    <Link
      href={route}
      className="flex flex-col w-full items-start gap-form px-page py-6 rounde font-bold rounded-3xl bg-gray-50 dark:bg-transparent dark:text-white border-gray-300 dark:border-zinc-700 border-[1px]"
    >
      <IconComponent width={25} />
      {text}
    </Link>
  );
}

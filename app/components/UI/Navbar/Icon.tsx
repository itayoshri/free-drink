import Link from "next/link";
import * as Icons from "../../Icons";
import { Route } from "@/lib/constants";

export default function NavbarIcon({ icon, route, onClick }: Route) {
  const IconComponent = Icons[icon];
  const className = `text-black dark:text-white`;
  const width = 26;
  return route ? (
    <Link href={route} className={className}>
      <IconComponent width={width} />
    </Link>
  ) : (
    <button onClick={onClick} className={className}>
      <IconComponent width={width} />
    </button>
  );
}

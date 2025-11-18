import Link from "next/link";
import * as Icons from "../../Icons";

type NavbarIconProps = {
  icon: keyof typeof Icons;
  route?: string;
  onClick?(): unknown;
};

export default function NavbarIcon({ icon, route, onClick }: NavbarIconProps) {
  const IconComponent = Icons[icon];
  const className = `text-black dark:text-white`;
  const width = 28;
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

import Button from "@/components/button";
import Logo from "@/components/UI/Logo";
import Link from "next/link";

export default function UnauthrizedPage() {
  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <Logo version="refill" className="h-6 fill-primary-500" />
      <div className="flex flex-col gap-8 w-full items-center">
        <a className="text-white">אין לך הרשאות לגשת לעמוד זה</a>
        <Link href={"/"} className="w-full">
          <Button>לדף הבית</Button>
        </Link>
      </div>
    </div>
  );
}

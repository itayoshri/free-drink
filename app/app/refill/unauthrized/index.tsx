import Logo from "@/components/UI/Logo";
import TextBlock from "@/components/UI/Text";

export default function UnauthrizedPage() {
  return (
    <div className="flex flex-col gap-4">
      <Logo version="refill" className="h-6 fill-primary-500" />
      <div className="flex flex-col">
        <a className="text-white">אין לך הרשאות לגשת לעמוד זה</a>
      </div>
    </div>
  );
}

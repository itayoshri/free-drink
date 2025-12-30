import { shuffleString } from "@/lib/functions";
import Logo from "../Logo";
import GiftCardVector from "./vector";

const TOP_TEXT = `שובר למשקה ממכונת ${shuffleString("שמקר")}`;

type GiftCardProps = {
  cardId: number;
};

export default function GiftCard({ cardId }: GiftCardProps) {
  return (
    <div className="relative text-white w-60 h-60 drop-shadow-xl/25 text-sm overflow-hidden flex flex-col items-center justify-center">
      <div className="flex flex-col gap-3 justify-center items-center h-full z-10">
        <Logo className="h-3 fill-white" />
        <a>{TOP_TEXT}</a>
      </div>
      <div className="flex justify-center items-center h-full z-10 font-code font-bold">
        <a>{cardId}</a>
      </div>
      <GiftCardVector className="absolute inset-0 w-full pointer-events-none" />
    </div>
  );
}

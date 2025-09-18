"use client";
import Button from "@/components/button";
import RequestActionCard, { Action } from "@/components/UI/RequestActionCard";
import { useAuth } from "@/context";

const SUCCEED_TEXT = "הפעולה הושלמה בהצלחה, קיבלתם 80 פקקים!";
const FAILED_TEXT = "הפעם זה לא הצליח :(";
export default function CompletedPage() {
  const { getPointsResData } = useAuth();
  const action = getPointsResData["succses"]
    ? Action.TWO_QUESTIONS_OR_MORE
    : Action.FAILED;

  return (
    <div className="flex flex-col w-full gap-6 items-center">
      <a className="text-center font-bold text-3xl text-black">
        הפעולה הושלמה בהצלחה, קיבלתם 80 פקקים!
      </a>
      <div className="flex flex-col w-full gap-4">
        <RequestActionCard action={action} duration={2} />
        <Button disabled>לקבלת משקה מהמכונה</Button>
      </div>
    </div>
  );
}

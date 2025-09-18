"use client";
import Button from "@/components/button";
import RequestActionCard, {
  Action,
  actionInfo,
} from "@/components/UI/RequestActionCard";
import { useAuth } from "@/context";

export default function CompletedPage() {
  const { getPointsResData } = useAuth();

  // TODO: Get request duration
  // TODO: Get in better way from req data
  const action = getPointsResData.success
    ? Action.TWO_QUESTIONS_OR_MORE
    : Action.FAILED;

  return (
    <div className="flex flex-col w-full gap-6 items-center">
      <a className="text-center font-bold text-3xl text-black">
        {actionInfo[action].message}
      </a>
      <div className="flex flex-col w-full gap-4">
        <RequestActionCard action={action} duration={2} />
        <Button disabled>לקבלת משקה מהמכונה</Button>
      </div>
    </div>
  );
}

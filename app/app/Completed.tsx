"use client";
import Button from "@/components/button";
import RequestActionCard, {
  Action,
  actionInfo,
} from "@/components/UI/RequestActionCard";
import { useAuth } from "@/context";
import ScreenConfetti from "./Confetti";

export default function CompletedPage() {
  const { getPointsResData, setStep } = useAuth();

  // TODO: Get request duration
  // TODO: Get in better way from req data
  // TODO: Get if user already had corks
  const userCorks = (getPointsResData.data as Record<string, unknown>)
    .userCorks as number;
  const action =
    userCorks >= 80
      ? Action.TWO_QUESTIONS_OR_MORE
      : userCorks >= 70
      ? Action.ONE_QUESTION
      : Action.FAILED;

  return (
    <div className="flex flex-col w-full gap-6 items-center">
      {/* TODO: add Check icon */}
      <div className="flex flex-col items-center text-black">
        <a className="text-center font-bold text-3xl">
          {actionInfo[action].message}
        </a>
        <a className="text-xl">{`קיבלתם ${
          (getPointsResData.data as Record<string, unknown>).userCorks
        } פקקים`}</a>
      </div>
      <div className="flex flex-col w-full gap-4">
        <RequestActionCard action={action} duration={2} />
        {userCorks < 80 ? (
          <Button onClick={() => setStep("phoneNumber")}>נסו שוב</Button>
        ) : (
          <Button disabled>לקבלת משקה מהמכונה</Button>
        )}
      </div>
      {userCorks >= 80 ? <ScreenConfetti /> : null}
    </div>
  );
}

"use client";
import Button from "@/components/button";
import RequestActionCard, {
  Action,
  actionInfo,
} from "@/components/UI/RequestActionCard";
import { useApp } from "@/context";
import ScreenConfetti from "../Confetti";
import { Retry } from "@/components/Icons";
import { getPointsStepProps } from "./page";

export default function CompletedPage({ setStep }: getPointsStepProps) {
  const { getPointsResData } = useApp();

  // TODO: Get in better way from req data
  // TODO: Get if user already had corks
  const userCorks = (getPointsResData.data as Record<string, unknown>)
    .corks as number;
  const action =
    userCorks >= 80
      ? Action.TWO_QUESTIONS_OR_MORE
      : userCorks >= 70
      ? Action.ONE_QUESTION
      : getPointsResData.points == 60
      ? Action.RESET_ACCOUNT
      : Action.FAILED;

  const retry = () => setStep("phoneNumber");

  return (
    <div className="flex flex-col w-full gap-6 items-center">
      {/* TODO: add Check icon */}
      <div className="flex flex-col items-center text-black">
        <a className="text-center font-bold text-3xl">
          {actionInfo[action].message}
        </a>
        <a className="text-xl">{`קיבלתם ${userCorks} פקקים`}</a>
      </div>
      <div className="flex flex-col w-full gap-4">
        <RequestActionCard
          action={action}
          duration={getPointsResData.duration as number}
        />
        {userCorks < 80 ? (
          <Button onClick={retry}>נסו שוב</Button>
        ) : (
          <div className="flex gap-3">
            <Button disabled>לקבלת משקה מהמכונה</Button>{" "}
            <Button fit onClick={retry}>
              <Retry width={24} />
            </Button>
          </div>
        )}
      </div>
      {userCorks >= 80 ? <ScreenConfetti /> : null}
    </div>
  );
}

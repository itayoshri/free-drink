"use client";
import Button from "@/components/button";
import RequestActionCard, {
  Action,
  actionInfo,
} from "@/components/UI/RequestActionCard";
import ScreenConfetti from "../Confetti";
import { Retry } from "@/components/Icons";
import { getPointsResData, getPointsStepProps } from "./page";
import GiftCard from "@/components/UI/GiftCard";

interface CompletedPageProps extends getPointsStepProps {
  getPointsResData: getPointsResData;
}

export default function CompletedPage({
  setStep,
  getPointsResData,
}: CompletedPageProps) {
  // TODO: Get in better way from req data
  // TODO: Get if user already had corks
  const { corks, goalCorks, duration, cardId } = getPointsResData;
  const action = (() => {
    switch (corks) {
      case 60:
        if (goalCorks == 60) return Action.RESET_ACCOUNT;
        return Action.FAILED;

      case 70:
        return Action.ONE_QUESTION;

      default:
        return Action.TWO_QUESTIONS_OR_MORE;
    }
  })();
  /*
    corks >= 80
      ? Action.TWO_QUESTIONS_OR_MORE
      : corks >= 70
      ? Action.ONE_QUESTION
      : goalCorks == 60
      ? Action.RESET_ACCOUNT
      : Action.FAILED;*/

  const retry = () => setStep("phoneNumber");

  return (
    <div className="flex flex-col w-full gap-8 items-center">
      {/* TODO: add Check icon */}
      <div className="flex flex-col items-center text-black">
        <a className="text-center font-bold text-2xl">
          {actionInfo[action].message}
        </a>
        <a className="text-xl">{`קיבלתם ${corks} פקקים`}</a>
      </div>
      {cardId ? (
        <GiftCard cardId={cardId} />
      ) : (
        <RequestActionCard action={action} duration={duration} />
      )}
      <div className="flex gap-3 w-full">
        {corks < 80 ? (
          <Button onClick={retry}>נסו שוב</Button>
        ) : (
          <>
            <Button disabled>לקבלת משקה מהמכונה</Button>{" "}
            <Button fit onClick={retry}>
              <Retry width={24} />
            </Button>
          </>
        )}
      </div>
      {corks >= 80 ? <ScreenConfetti /> : null}
    </div>
  );
}

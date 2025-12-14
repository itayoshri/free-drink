"use client";
import Button from "@/components/button";
import Logo from "@/components/UI/Logo";
import TextBlock from "@/components/UI/Text";
import { useUserInfo } from "@/context/user";
import Link from "next/link";

type GetPointsCardProps = {
  amountOfCorks: number;
};

export default function GetPointsCard({ amountOfCorks }: GetPointsCardProps) {
  const message = (amountOfCorks: number) =>
    "המשיכו לקבלת " +
    amountOfCorks +
    " פקקים באפליקציה" +
    `${amountOfCorks == 80 && " המאפשרים לרכוש שובר למשקה מהמכונה"}`;

  const { mobilePhone } = useUserInfo();
  return (
    <div className="flex flex-col w-full p-page border rounded-3xl gap-4">
      <Logo className="h-3" />
      <TextBlock subTitle="שובר למשקה מהמכונה" text={message(amountOfCorks)} />
      {mobilePhone ? (
        <span>
          <a className="font-inter font-medium">{mobilePhone}</a>
          <a className="font-bold text-primary mr-2">ערוך מספר</a>
        </span>
      ) : null}
      <Link href={"/getpoints"}>
        <Button>המשיכו</Button>
      </Link>
    </div>
  );
}

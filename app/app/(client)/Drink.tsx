import Button from "@/components/button";
import Logo from "@/components/UI/Logo";
import TextBlock from "@/components/UI/Text";

type GetPointsCardProps = {
  amountOfCorks: number;
  phoneNumber?: string;
};

export default function GetPointsCard({
  amountOfCorks,
  phoneNumber,
}: GetPointsCardProps) {
  const message = (amountOfCorks: number) =>
    "המשיכו לקבלת " +
    amountOfCorks +
    " פקקים באפליקציה" +
    `${amountOfCorks == 80 && " המאפשרים לרכוש שובר למשקה מהמכונה"}`;
  return (
    <div className="flex flex-col w-full p-page border rounded-3xl gap-6">
      <Logo className="h-3" />
      <TextBlock subTitle="שובר למשקה מהמכונה" text={message(amountOfCorks)} />
      {phoneNumber ? (
        <span>
          <a className="font-inter font-medium">{phoneNumber}</a>
          <a className="font-bold text-primary mr-2">ערוך מספר</a>
        </span>
      ) : null}
      <Button>המשיכו</Button>
    </div>
  );
}

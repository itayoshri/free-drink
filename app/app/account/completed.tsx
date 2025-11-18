import Button from "@/components/button";
import TextBlock from "@/components/UI/Text";
import { redirect } from "next/navigation";

export default function SignedUpSuccesfuly() {
  return (
    <div className="flex flex-col items-center w-full gap-6">
      <TextBlock
        title="החשבון נוצר בהצלחה!"
        text="כעת תוכלו לקבל 80 פקקים באפליקציה"
        className="flex flex-col items-center"
      />
      <Button onClick={() => redirect("/")}>לדף הבית</Button>
    </div>
  );
}

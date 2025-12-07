"use client";
import MenuItem from "@/components/UI/MenuItem";
import TextBlock from "@/components/UI/Text";
import { routes } from "@/lib/constants";
import GetPointsCard from "./Drink";
import { useApp } from "@/context";

export default function HomePage() {
  const { mobilePhone } = useApp();
  return (
    <div className="flex flex-col h-full w-full gap-form">
      <TextBlock title="ברוך שובכם!" className="py-6" />
      <GetPointsCard amountOfCorks={80} phoneNumber={mobilePhone as string} />
      <div className="flex flex-col gap-form w-full">
        {routes.map((route, index) => (
          <MenuItem {...route} key={index} />
        ))}
      </div>
    </div>
  );
}

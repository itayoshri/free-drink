import MenuItem from "@/components/UI/MenuItem";
import TextBlock from "@/components/UI/Text";
import { routes } from "@/lib/constants";
import GetPointsCard from "./Drink";
import { useApp } from "@/context";

export default function HomePage() {
  return (
    <div className="flex flex-col h-full w-full gap-form">
      <TextBlock subTitle="ברוך שובכם!" className="py-3" />
      <GetPointsCard amountOfCorks={80} />
      <div className="flex flex-col gap-form w-full">
        {routes.map((route, index) => (
          <MenuItem {...route} key={index} />
        ))}
      </div>
    </div>
  );
}

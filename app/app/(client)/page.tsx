import MenuItem from "@/components/UI/MenuItem";
import TextBlock from "@/components/UI/Text";
import { routes } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center h-full w-full gap-form">
      <TextBlock title="ברוך שובכם!" className="py-12" />
      <div className="flex flex-col gap-form w-full">
        {routes.map((route, index) => (
          <MenuItem {...route} key={index} />
        ))}
      </div>
    </div>
  );
}

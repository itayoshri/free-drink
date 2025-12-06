import { Add, Wind } from "@/components/Icons";
import MenuItem from "@/components/UI/MenuItem";
import Logo from "@/components/UI/Logo";

const BASE_PATH = "refill";

export default function RefillMenu() {
  return (
    <div className="flex flex-col w-full items-center gap-8">
      <Logo version="refill" className="h-6 fill-primary-500" />
      <div className="flex flex-col w-full gap-form">
        <MenuItem
          text="מחולל קודי הזמנה"
          icon="Add"
          route={`${BASE_PATH}/invitation`}
        />
        <MenuItem text="פותר חידות" icon="Wind" route={`${BASE_PATH}/solver`} />
      </div>
    </div>
  );
}

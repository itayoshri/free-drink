import { Add, Wind } from "@/components/Icons";
import MenuItem from "@/components/refill/MenuItem";

export default function RefillMenu() {
  return (
    <div className="flex flex-col w-full gap-form">
      <div className="flex flex-col w-full gap-form">
        <MenuItem text="מחולל קודי הזמנה" icon={<Add width={25} />} />
        <MenuItem text="פותר חידות" icon={<Wind width={25} />} />
      </div>
    </div>
  );
}

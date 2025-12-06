import MenuItem from "@/components/UI/MenuItem";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full gap-form">
      <MenuItem text="itay" icon={"Add"} route="/getpoints" />
      <MenuItem text="itay" icon={"Add"} route="/getpoints" />
      <MenuItem text="itay" icon={"Add"} route="/getpoints" />
    </div>
  );
}

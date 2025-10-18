import Logo from "./Logo";

export default function Navbar() {
  return (
    <div className="flex sticky border-[1px] border-gray-300 bg-white justify-between h-16 items-center w-full px-page py-3 top-0">
      <button className=" bg-primary text-white rounded-full p-3 py-1 text-sm">
        כניסה
      </button>
      <Logo className="h-4 fill-primary" version="short" />
    </div>
  );
}

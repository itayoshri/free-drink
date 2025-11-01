import { useState } from "react";
import DropdownOption from "./Option";
import { Add, ArrowDown, ArrowUp } from "@/components/Icons";

export type Option = { value: string; label: string };

type DropdownProps = {
  options: Option[];
  onChange: (option: Option) => unknown;
  selected: Option;
};

export default function Dropdown({
  options,
  onChange,
  selected,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((current) => !current)}
        className="text-black flex justify-between dark:text-white text-right border-[1px] border-gray-300 dark:border-zinc-600 w-full text-xl font-medium py-3 px-4 rounded-xl"
      >
        {selected.label}
        {isOpen ? <ArrowUp width={25} /> : <ArrowDown width={25} />}
      </button>
      {isOpen && (
        <div className="absolute w-full flex flex-col overflow-auto mt-3 items-start rounded-xl border-[1px] border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900">
          {options.map((option, index) => (
            <DropdownOption
              option={option}
              key={index}
              handleSelect={(option) => handleSelect(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

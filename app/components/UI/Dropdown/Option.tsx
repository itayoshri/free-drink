import { Option } from ".";

type DropdownOptionProps = {
  option: Option;
  handleSelect: (option: Option) => unknown;
};

export default function DropdownOption({
  option,
  handleSelect,
}: DropdownOptionProps) {
  return (
    <button
      className={
        "py-3 px-4 focus:bg-white/5 hover:bg-white/5 cursor-pointer w-full text-right text-xl"
      }
      onClick={() => handleSelect(option)}
    >
      <a>{option.label}</a>
    </button>
  );
}

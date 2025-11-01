import { Option } from ".";

type DropdownOptionProps = {
  option: Option;
  selected?: boolean;
  handleSelect: (option: Option) => unknown;
};

export default function DropdownOption({
  option,
  selected = false,
  handleSelect,
}: DropdownOptionProps) {
  return (
    <button
      className={`py-3 px-4 hover:bg-zinc-700 w-full text-right text-xl ${
        selected && "bg-primary"
      }`}
      onClick={() => handleSelect(option)}
    >
      <a>{option.label}</a>
    </button>
  );
}

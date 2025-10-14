import Button, { ButtonProps } from "../button";
import Input, { InputProps } from "../input";

interface PhoneNumberInputProps extends InputProps, ButtonProps {}

export default function PhoneNumberInput({
  children,
  placeholder,
  onChange,
  ref,
  onClick,
}: PhoneNumberInputProps) {
  return (
    <div className="flex flex-col items-start w-full gap-4">
      <Input
        onChange={(newValue) => onChange(newValue)}
        placeholder={placeholder}
        type="tel"
        key={0}
      />
      <Button
        onClick={onClick ? () => onClick() : () => null}
        className="bg-gray-400"
        ref={ref}
      >
        {children}
      </Button>
    </div>
  );
}

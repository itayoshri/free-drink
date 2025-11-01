import Button from "../button";
import Input from "../input";

interface PhoneNumberInputProps {
  placeholder: string;
  buttonLabel: string;
  onSubmit: (phoneNumber: string) => void;
  disabled?: boolean;
  changable?: boolean;
  defaultValue?: string;
}

export default function PhoneNumberInput({
  placeholder,
  buttonLabel,
  onSubmit,
  disabled = false,
  defaultValue = "",
  changable = true,
}: PhoneNumberInputProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phoneNumber = formData.get("phone") as string;
    onSubmit(phoneNumber);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start w-full gap-form"
    >
      <Input
        placeholder={placeholder}
        name="phone"
        type="tel"
        defaultValue={defaultValue}
        disabled={!changable}
      />
      <Button type="submit" className="bg-gray-400" disabled={disabled}>
        {buttonLabel}
      </Button>
    </form>
  );
}

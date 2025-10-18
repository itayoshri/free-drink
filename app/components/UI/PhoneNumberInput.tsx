import Button from "../button";
import Input from "../input";

interface PhoneNumberInputProps {
  placeholder: string;
  buttonLabel: string;
  onSubmit: (phoneNumber: string) => void;
}

export default function PhoneNumberInput({
  placeholder,
  buttonLabel,
  onSubmit,
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
      <Input placeholder={placeholder} name="phone" type="tel" />
      <Button type="submit" className="bg-gray-400">
        {buttonLabel}
      </Button>
    </form>
  );
}

import { useEffect, useRef } from "react";
import Button, { ButtonProps } from "../button";
import Input, { InputProps } from "../input";

interface PhoneNumberInputProps extends InputProps, ButtonProps {
  buttonLabel: string;
}

export default function PhoneNumberInput({
  placeholder,
  buttonLabel,
  onChange,
  onClick,
}: PhoneNumberInputProps) {
  const phoneButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      const buttonRef = phoneButtonRef;
      if (event.key === "Enter") {
        // Trigger click if button exists
        if (buttonRef.current) {
          buttonRef.current.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
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
        ref={phoneButtonRef}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}

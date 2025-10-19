import { HTMLInputTypeAttribute } from "react";
import Input, { InputProps } from "./input";

interface TitledInputProps extends InputProps {
  title: string;
  type: HTMLInputTypeAttribute;
  name: string;
  defaultValue?: string;
}

export default function TitledInput({
  title,
  type,
  name,
  defaultValue = "",
}: TitledInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <a className="text-black font-semibold">{title}</a>
      <Input name={name} type={type} defaultValue={defaultValue} leftToRight />
    </div>
  );
}

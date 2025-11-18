import { HTMLInputTypeAttribute } from "react";
import Input, { InputProps } from "./input";
import TitledComponent from "./UI/Titled";

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
    <TitledComponent title={title}>
      <Input name={name} type={type} defaultValue={defaultValue} leftToRight />
    </TitledComponent>
  );
}

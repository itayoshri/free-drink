"use client";
import Input from "@/components/input";
import PhoneNumberInput from "@/components/UI/PhoneNumberInput";
import { useState } from "react";

const TITLE = "התחברו או צרו משתמש";
const SUBTITLE = "עם משתמש רשום ניתן לקבל 80 פקיים ויותר";
export default function AccountForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col text-black items-center gap-2">
        <h1 className="font-bold text-3xl">{TITLE}</h1>
        <h4>{SUBTITLE}</h4>
      </div>
      <PhoneNumberInput
        onChange={(newValue) => setPhoneNumber("")}
        onClick={() => null}
        placeholder="מספר טלפון"
      >
        המשיכו
      </PhoneNumberInput>
    </div>
  );
}

"use client";
import Input from "@/components/input";
import PhoneNumberInput from "@/components/UI/PhoneNumberInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const TITLE = "התחברו או צרו משתמש";
const SUBTITLE = "עם משתמש רשום ניתן לקבל 80 פקיים ויותר";
export default function AccountForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const checkIfUserExists = useCallback(
    (phoneNumber: string) => {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_AUTH_SERVER_URL}/users/exists?phoneNumber=${phoneNumber}`
        )
        .then((res) => {
          if (res.status == 200) {
            if (res.data.data.exists) {
              router.push("/account/login");
            } else router.push("/account/register");
          }
        });
    },
    [router]
  );
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col text-black items-center gap-2">
        <h1 className="font-bold text-3xl">{TITLE}</h1>
        <h4>{SUBTITLE}</h4>
      </div>
      <PhoneNumberInput
        onChange={(newValue) => setPhoneNumber(newValue.currentTarget.value)}
        onClick={() => checkIfUserExists(phoneNumber)}
        placeholder="מספר טלפון"
      >
        המשיכו
      </PhoneNumberInput>
    </div>
  );
}

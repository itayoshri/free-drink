"use client";
import PhoneNumberInput from "@/components/UI/PhoneNumberInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const TITLE = "התחברו או צרו משתמש";
const SUBTITLE = "עם משתמש רשום ניתן לקבל 80 פקיים ויותר";
const AUTH_SERVER_URL = process.env.NEXT_PUBLIC_AUTH_SERVER_URL;

export default function AccountForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const checkIfUserExists = useCallback(
    (phoneNumber: string) => {
      axios
        .get(`${AUTH_SERVER_URL}/users/exists?phoneNumber=${phoneNumber}`)
        .then((res) => {
          router.push(
            `/account/${
              res.status == 200 ? "login" : "register"
            }?phoneNumber=${phoneNumber}`
          );
        });
    },
    [router]
  );
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col text-black items-center">
        <h1 className="font-bold text-3xl">{TITLE}</h1>
        <h4>{SUBTITLE}</h4>
      </div>
      <PhoneNumberInput
        onChange={(newValue) => setPhoneNumber(newValue)}
        onClick={() => checkIfUserExists(phoneNumber)}
        placeholder="מספר טלפון"
        buttonLabel="המשיכו"
      />
    </div>
  );
}

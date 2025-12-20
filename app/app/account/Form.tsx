"use client";
import PhoneNumberInput from "@/components/UI/PhoneNumberInput";
import TextBlock from "@/components/UI/Text";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import AccountTitle from "./Title";

const TITLE = "התחברו או צרו משתמש";
const SUBTITLE = "עם משתמש רשום ניתן לקבל 80 פקיים ויותר";
export const AUTH_SERVER_URL = process.env.NEXT_PUBLIC_AUTH_SERVER_URL || "";

export default function AccountForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const checkIfUserExists = useCallback(
    (phoneNumber: string) => {
      setLoading(true);
      axios
        .get(`${AUTH_SERVER_URL}/users/exists?phoneNumber=${phoneNumber}`)
        .then((res) => {
          if (res.status == 200)
            router.push(
              `/account/${
                res.data.data.exists ? "login" : "register"
              }?phoneNumber=${phoneNumber}`
            );
          else setLoading(false);
        });
    },
    [router]
  );
  return (
    <div className="flex flex-col gap-4 w-full">
      <AccountTitle>
        <TextBlock title={TITLE} text={SUBTITLE} className="flex flex-col" />
      </AccountTitle>
      <PhoneNumberInput
        onSubmit={(phoneNumber) => checkIfUserExists(phoneNumber)}
        placeholder="מספר טלפון"
        buttonLabel="המשיכו"
        disabled={loading}
      />
    </div>
  );
}

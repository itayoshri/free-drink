"use client";
import { useState } from "react";
import SignedUpSuccesfuly from "../completed";
import TitledInput from "@/components/TitledInput";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { AUTH_SERVER_URL } from "../Form";
import Button from "@/components/button";
import { useAuth } from "@/context/auth";
import AccountTitle from "../Title";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber") || "";
  const { setUser } = useAuth();

  const [completed, setCompleted] = useState(false);
  const onSubmit = async (
    phoneNumber: string,
    password: string,
    invitationToken: string
  ) => {
    try {
      axios
        .post(
          `${AUTH_SERVER_URL}/users/create`,
          {
            phoneNumber,
            password,
            invitationToken,
          },
          { withCredentials: true }
        )
        .then((res) => {
          const { user } = res.data.data;
          setUser(user);
          setCompleted(true);
        });
    } catch (error) {}
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phoneNumber = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const invitationToken = formData.get("invitation") as string;

    onSubmit(phoneNumber, password, invitationToken);
  };

  return completed ? (
    <SignedUpSuccesfuly />
  ) : (
    <div className="flex flex-col w-full gap-6">
      <AccountTitle title="יצירת משתמש" />
      <form className="flex flex-col gap-form w-full" onSubmit={handleSubmit}>
        <TitledInput
          title="מספר טלפון"
          name="phone"
          type="tel"
          defaultValue={phoneNumber}
        />
        <TitledInput
          title="סיסמה"
          name="password"
          type="password"
          defaultValue=""
        />
        <TitledInput
          title="קוד הזמנה"
          name="invitation"
          type="text"
          defaultValue=""
        />
        <Button type="submit">יצירת משתמש</Button>
      </form>
    </div>
  );
}

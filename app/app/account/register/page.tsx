"use client";
import { useState } from "react";
import SignedUpSuccesfuly from "../completed";
import TitledInput from "@/components/TitledInput";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import router from "next/router";
import { AUTH_SERVER_URL } from "../Form";
import Button from "@/components/button";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber") || "";

  const [completed, setCompleted] = useState(false);
  const onSubmit = async (
    phoneNumber: string,
    password: string,
    invitationToken: string
  ) => {
    try {
      const res = await axios.post(
        `${AUTH_SERVER_URL}/users/create`,
        {
          phoneNumber,
          password,
          invitationToken,
        },
        { withCredentials: true }
      );
      router.push("/");
      console.log(res.data);
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
    <div className="flex flex-col items-center w-full gap-6">
      <h2 className="text-black text-2xl font-bold">יצירת משתמש</h2>
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

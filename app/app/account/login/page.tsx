"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { useSearchParams } from "next/navigation";
import { AUTH_SERVER_URL } from "../Form";
import axios from "axios";
import React from "react";
import LoggedInSuccesfuly from "../completed";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber") || "";
  const router = useRouter();

  const onSubmit = async (phoneNumber: string, password: string) => {
    try {
      const res = await axios.post(
        `${AUTH_SERVER_URL}/auth/login`,
        {
          phoneNumber,
          password,
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
    onSubmit(phoneNumber, password);
  };

  return (
    <div className="flex flex-col w-full gap-6 items-center">
      <h2 className="text-black text-2xl font-bold">התחברות</h2>
      <form className="flex flex-col w-full gap-form" onSubmit={handleSubmit}>
        <Input
          name="phone"
          placeholder="מספר טלפון"
          type="tel"
          defaultValue={phoneNumber}
        />
        <Input name="password" placeholder="סיסמה" type="password" />
        <Button type="submit">התחברו</Button>
      </form>
    </div>
  );
}

"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { useSearchParams } from "next/navigation";
import { AUTH_SERVER_URL } from "../Form";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, userContextObj } from "@/context/auth";
import { useUserInfo } from "@/context/user";
import Logo from "@/components/UI/Logo";
import AccountTitle from "../Title";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber") || "";
  const router = useRouter();
  const { setUser } = useAuth();
  const { setMobilePhone } = useUserInfo();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (phoneNumber: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${AUTH_SERVER_URL}/auth/login`,
        {
          phoneNumber,
          password,
        },
        { withCredentials: true }
      );
      const user = res.data.data.user as userContextObj;
      setUser(user);
      setMobilePhone(user.phone_number);
      router.push("/");
    } catch (error) {
      setLoading(false);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phoneNumber = formData.get("phone") as string;
    const password = formData.get("password") as string;
    onSubmit(phoneNumber, password);
  };

  return (
    <div className="flex flex-col w-full gap-8">
      <AccountTitle title="התחברות באמצעות מספר טלפון" />
      <form className="flex flex-col w-full gap-form" onSubmit={handleSubmit}>
        <Input
          name="phone"
          placeholder="מספר טלפון"
          type="tel"
          defaultValue={phoneNumber}
        />
        <Input name="password" placeholder="סיסמה" type="password" />
        <Button type="submit" disabled={loading}>
          התחברו
        </Button>
      </form>
    </div>
  );
}

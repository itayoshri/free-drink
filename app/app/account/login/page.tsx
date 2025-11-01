"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { useSearchParams } from "next/navigation";
import { AUTH_SERVER_URL } from "../Form";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber") || "";
  const router = useRouter();
  const { setUser } = useAuth();
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
      setUser(res.data.data.user);
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
        <Button type="submit" disabled={loading}>
          התחברו
        </Button>
      </form>
    </div>
  );
}

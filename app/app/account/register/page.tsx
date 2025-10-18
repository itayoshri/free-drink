"use client";
import { useState } from "react";
import SignedUpSuccesfuly from "../completed";

export default function RegisterPage() {
  const [completed, setCompleted] = useState(true);
  return completed ? <SignedUpSuccesfuly /> : <div></div>;
}

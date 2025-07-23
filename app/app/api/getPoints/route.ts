import deleteUser from "@/utils/account/delete";
import register from "@/utils/account/register";
import sendVerificationCode, {
  verifyUser,
} from "@/utils/account/verificationCode";
import { NextRequest } from "next/server";

interface reqData {
  verificationCode: string;
  mobilePhone: string;
}

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { mobilePhone, verificationCode } = data;
  const verificationToken = (await verifyUser(verificationCode, mobilePhone))
    .body.verificationToken;

  deleteUser(verificationToken);

  return new Response(
    JSON.stringify(await register(verificationToken, mobilePhone)),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

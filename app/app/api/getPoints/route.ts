import deleteUser from "@/utils/account/delete";
import register from "@/utils/account/register";
import sendVerificationCode, {
  verifyUser,
} from "@/utils/account/verificationCode";
import { NextRequest } from "next/server";

const NEW_USER_CORKS = 60;
interface reqData {
  verificationCode: string;
  mobilePhone: string;
}

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { mobilePhone, verificationCode } = data;

  console.log("authenticating...");
  const resVerifyUser = await verifyUser(verificationCode, mobilePhone);
  const verificationToken = resVerifyUser.body.verificationToken;

  //delete user if exists and has less corks than a new one
  const accessToken = resVerifyUser.body.userInfo.accessToken;
  if (accessToken && resVerifyUser.body.userInfo.corks < NEW_USER_CORKS) {
    console.log("deleting user...", verificationToken);
    console.log(await deleteUser(verificationToken));

    console.log("registering user...");
    const resRegister = await register(verificationToken, mobilePhone);
    console.log(resRegister);
  }

  return new Response(JSON.stringify(null), {
    headers: { "Content-Type": "application/json" },
  });
}

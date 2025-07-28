import sendVerificationCode from "@/utils/account/verificationCode";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mobilePhone = searchParams.get("mobilePhone");

  return new Response(
    JSON.stringify(await sendVerificationCode(mobilePhone as string)),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

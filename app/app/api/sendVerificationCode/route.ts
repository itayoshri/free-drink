import sendVerificationCode from "@/utils/account/verificationCode";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  console.log(searchParams);
  const mobilePhone = searchParams.get("mobilePhone");

  return new Response(
    JSON.stringify(console.log(sendVerificationCode(mobilePhone as string))),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

import sendVerificationCode from "@/utils/account/verificationCode";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  console.log(searchParams);
  const mobilePhone = searchParams.get("mobilePhone");

  return new Response(
    JSON.stringify(
      console.log(await sendVerificationCode(mobilePhone as string))
    ),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

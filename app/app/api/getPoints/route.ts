import { HandleUser } from "@/utils/account";

type reqData = {
  verificationCode: string;
  mobilePhone: string;
};

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { mobilePhone, verificationCode } = data;

  const accessToken = HandleUser(mobilePhone, verificationCode);

  return new Response(JSON.stringify(null), {
    headers: { "Content-Type": "application/json" },
  });
}

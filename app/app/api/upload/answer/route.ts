import { AddAnswer } from "@/utils/db/answer";

type reqData = {
  verificationCode: string;
  mobilePhone: string;
  answer: unknown;
};

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { answer } = data;
  await AddAnswer(answer);

  return new Response(JSON.stringify(""), {
    headers: { "Content-Type": "application/json" },
  });
}

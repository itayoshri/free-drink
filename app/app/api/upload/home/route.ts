import { HandleUser } from "@/utils/account";
import GetHomePage from "@/utils/content/homePage";
import UpdateContent from "@/utils/db/content";

type reqData = {
  verificationCode: string;
  mobilePhone: string;
  answer: unknown;
};

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { mobilePhone, verificationCode } = data;

  const accessToken = await HandleUser(mobilePhone, verificationCode);

  const contents = (await GetHomePage()).body.contents;
  await UpdateContent(contents, accessToken);

  return new Response(JSON.stringify(""), {
    headers: { "Content-Type": "application/json" },
  });
}

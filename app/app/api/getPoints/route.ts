import { HandleUser } from "@/utils/account";
import GetUserPoints from "@/utils/account/points";
import { NextRequest, NextResponse } from "next/server";
import hasPermission, {
  getAppPermissions,
  getAcessTokenFromRequest,
  getUserPermissions,
} from "@/utils/auth/permissions";
import { HttpStatusCode } from "axios";
import getPoints from ".";
import getGiftCard from "./giftCard";

type reqData = {
  verificationCode: string;
  mobilePhone: string;
};

export async function POST(request: NextRequest) {
  const data = (await request.json()) as reqData;
  const { mobilePhone, verificationCode } = data;
  const permissions = await getAppPermissions();
  const accesToken = getAcessTokenFromRequest(request);
  const { role: role_key, phone_number } = getUserPermissions(
    accesToken as string
  );
  const { amount, otherPhoneNumber } = hasPermission<{
    amount: number;
    otherPhoneNumber: boolean;
  }>({ role_key }, "points", permissions) as {
    amount: number;
    otherPhoneNumber: boolean;
  };
  const targetNumberOfCorks = amount;

  if (!otherPhoneNumber && phone_number != mobilePhone)
    return NextResponse.json(
      {
        success: false,
        data: {},
        message:
          "user is only permitted to use the app with his own phone number",
      },
      { status: 401 }
    );

  try {
    const { accessToken, userCorks } = await HandleUser(
      mobilePhone,
      verificationCode,
      true
    );

    if (userCorks >= targetNumberOfCorks)
      return NextResponse.json(
        {
          data: { corks: userCorks, accessToken },
          message: "user already has enough corks",
        },
        { status: 200 }
      );

    const corksForTarget = targetNumberOfCorks - userCorks;
    await getPoints(corksForTarget, accessToken);
    const corks = (await GetUserPoints(accessToken)).body.corks;
    const achieved = Boolean(corks >= targetNumberOfCorks);
    const giftCard = await getGiftCard(accessToken as string);

    return NextResponse.json(
      {
        data: { corks, accessToken, giftCard },
        message: achieved
          ? ""
          : "there aren't enough available solved games on our DB",
      },
      {
        status: achieved
          ? HttpStatusCode.Ok
          : HttpStatusCode.InternalServerError,
      }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        data: null,
        message: "Invalid verification code",
      },
      { status: HttpStatusCode.BadRequest }
    );
  }
}

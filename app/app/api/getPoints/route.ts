import { CORKS_FOR_DRINK, HandleUser } from "@/utils/account";
import GetUserPoints from "@/utils/account/points";
import { NextResponse } from "next/server";
import HandleAnswers from ".";

type reqData = {
  verificationCode: string;
  mobilePhone: string;
};

// TODO: get number from user

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { mobilePhone, verificationCode } = data;
  const targetNumberOfCorks = CORKS_FOR_DRINK;

  try {
    const { accessToken, userCorks } = await HandleUser(
      mobilePhone,
      verificationCode
    );

    if (userCorks >= targetNumberOfCorks)
      return NextResponse.json(
        {
          success: true,
          data: { userCorks, accessToken },
          message: "user already has enough corks",
        },
        { status: 200 }
      );

    const corksForTarget = targetNumberOfCorks - userCorks;
    await HandleAnswers(corksForTarget, accessToken);
    const corks = (await GetUserPoints(accessToken)).body.corks;
    const achieved = Boolean(corks >= targetNumberOfCorks);

    return NextResponse.json(
      {
        success: achieved,
        data: { corks, accessToken },
        message: achieved
          ? ""
          : "there aren't enough available solved games on our DB",
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Invalid verification code",
      },
      { status: 400 }
    );
  }
}

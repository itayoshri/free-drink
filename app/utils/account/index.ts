import deleteUser from "./delete";
import register from "./register";
import { verifyUser } from "./verificationCode";

export const NEW_USER_CORKS = 60;
export const CORKS_FOR_DRINK = 80;

/**
 *
 * @param mobilePhone - user's mobile phone
 * @param verificationCode - code for phone verification
 * @returns accessToken that used to verify and authorize against coca-cola's api
 */
export async function HandleUser(
  mobilePhone: string,
  verificationCode: string,
  reset?: boolean
) {
  const resVerifyUser = await verifyUser(verificationCode, mobilePhone);
  const verificationToken = resVerifyUser.body.verificationToken;
  const userCorks = resVerifyUser.body.userInfo.corks;

  const accessToken = resVerifyUser.body.userInfo?.accessToken;
  const userExists = Boolean(accessToken);
  if (userExists && userCorks >= CORKS_FOR_DRINK && !reset) {
    return { accessToken, userCorks };
  } else {
    // delete user if exists and has less corks than a new one
    if (userExists) {
      console.log("deleting user...", accessToken);
      console.log(await deleteUser(accessToken));
    }

    // create new user
    console.log("registering user...");
    const resRegister = await register(verificationToken, mobilePhone);
    return {
      accessToken: resRegister.body.userInfo.accessToken,
      userCorks: resRegister.body.userInfo.corks,
    };
  }
}

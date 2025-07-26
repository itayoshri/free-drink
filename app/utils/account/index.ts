import deleteUser from "./delete";
import register from "./register";
import { verifyUser } from "./verificationCode";

const NEW_USER_CORKS = 60;

/**
 *
 * @param mobilePhone - user's mobile phone
 * @param verificationCode - code for phone verification
 * @returns accessToken that used to verify and authorize against coca-cola's api
 */
export async function HandleUser(
  mobilePhone: string,
  verificationCode: string
) {
  const resVerifyUser = await verifyUser(verificationCode, mobilePhone);
  const verificationToken = resVerifyUser.body.verificationToken;

  const userExists = Boolean(resVerifyUser.body.userInfo.accessToken);
  if (userExists && resVerifyUser.body.userInfo.corks >= NEW_USER_CORKS) {
    return resVerifyUser.body.userInfo.accessToken;
  } else {
    // delete user if exists and has less corks than a new one
    if (userExists) {
      console.log("deleting user...", verificationToken);
      console.log(await deleteUser(verificationToken));
    }

    // create new user
    console.log("registering user...");
    const resRegister = await register(verificationToken, mobilePhone);
    return resRegister.body.userInfo.accessToken;
  }
}

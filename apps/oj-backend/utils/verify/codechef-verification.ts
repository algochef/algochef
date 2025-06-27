import * as cheerio from "cheerio";
import { getCodeChefProfileStats } from "../profile-details/codechef-profile-stats";

export const verifyCodechef = async (
  handle: string,
  verificationCode: string,
) => {
  try {
    const codechefUserData = await getCodeChefProfileStats(handle);
    if (!codechefUserData || !codechefUserData.lastName) {
      return false;
    }
    if (codechefUserData.lastName.toLowerCase() === verificationCode.toLowerCase()) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong while verifying!");
  }
};

(async()=>{
    console.log(await verifyCodechef('jaybeeop', '#1'));
})()


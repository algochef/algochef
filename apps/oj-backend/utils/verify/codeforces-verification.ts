import { getCodeforcesProfileStats } from "../profile-details/codeforce-profile-stats";

export const verifyCodeforces = async (
  handle: string,
  verificationCode: string,
) => {
  try {
    const codeforcesUserData = await getCodeforcesProfileStats(handle);
    if (!codeforcesUserData || !codeforcesUserData.lastName) {
      return false;
    }
    if (codeforcesUserData.lastName.toLowerCase() === verificationCode.toLowerCase()) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong while verifying!");
  }
};


(async()=>{
  console.log(await verifyCodeforces('terminalwarlord', "#1"));
})()
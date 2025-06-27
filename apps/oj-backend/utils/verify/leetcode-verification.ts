import { getLeetcodeProfileStats } from "../profile-details/leetcode-profile-stats";

export const verifyLeetcode = async (
  handle: string,
  verificationCode: string,
) => {
  try {
    const leetcodeUserData = await getLeetcodeProfileStats(handle);
    if (!leetcodeUserData || !leetcodeUserData.aboutMe) {
      return false;
    }
    if (
      leetcodeUserData.aboutMe.toLowerCase() === verificationCode.toLowerCase()
    ) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong while verifying!");
  }
};

// (async () => {
//     console.log(await verifyLeetcode('terminalwarlord', '#1'));
// })()

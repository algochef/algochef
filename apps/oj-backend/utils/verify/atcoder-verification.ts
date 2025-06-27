import { getAtcoderProfileStats } from "../profile-details/atcoder-profile-stats";

export const verifyAtcoder = async (
  handle: string,
  verificationCode: string,
) => {
  try {
    const atcoderUserData = await getAtcoderProfileStats(handle);
    if (!atcoderUserData || !atcoderUserData.aboutMe) {
      return false;
    }
    if (
      atcoderUserData.aboutMe.toLowerCase() === verificationCode.toLowerCase()
    ) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong while verifying!");
  }
};

// (async()=>{
//     console.log(await verifyAtcoder('terminalwarlord', '#1'));
// })()

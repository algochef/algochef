import { Platform } from "@repo/types/contest";
import { verifyAtcoder } from "./atcoder-verification";
import { verifyCodechef } from "./codechef-verification";
import { verifyCodeforces } from "./codeforces-verification";
import { verifyLeetcode } from "./leetcode-verification";

export const verifyHandle = async (
  platform: Platform,
  handle: string,
  verificationCode: string,
) => {
  if (platform === Platform.ATCODER) {
    return verifyAtcoder(handle, verificationCode);
  } else if (platform === Platform.CODECHEF) {
    return verifyCodechef(handle, verificationCode);
  } else if (platform === Platform.CODEFORCES) {
    return verifyCodeforces(handle, verificationCode);
  } else if (platform === Platform.LEETCODE) {
    return verifyLeetcode(handle, verificationCode);
  }
  return false;
};

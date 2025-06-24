import { getSubmissionCount } from "../profile-details/cses-helper/get-submission-count";

const sleep = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));
export const verifyCses = async (userId: number) => {
  // The idea is to ask the user to submit exactly 3 times (compilation error expected) using PASCAL within 60 seconds
  const oldSubmissionsInPascal = await getSubmissionCount(userId);
  if (oldSubmissionsInPascal === null) {
    throw Error("Failed to get submissions!");
  }
  console.log(oldSubmissionsInPascal);
  await sleep(30);
  const newSubmissionsInPascal = await getSubmissionCount(userId);
  console.log(newSubmissionsInPascal);
  if (newSubmissionsInPascal === null) {
    throw Error("Failed to get new submissions!");
  }
  if (newSubmissionsInPascal - oldSubmissionsInPascal === 3) {
    return true;
  }
  return false;
};

(async () => {
  console.log(await verifyCses(343130));
})();

import { codeforcesProblems } from "./providers/codeforces";
import { leetcodeProblems } from "./providers/leetcode";

const updateProblems = async () => {
  // await codeforcesProblems();
  // console.log("Processed CodeForces Problems");
  // await leetcodeProblems();
  // console.log("Processed LeetCode Problems");
};

(async () => {
  await updateProblems();
})();

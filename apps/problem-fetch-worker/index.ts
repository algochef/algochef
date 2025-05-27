import { codeforcesProblems } from "./providers/codeforces";

const updateProblems = async () => {
  await codeforcesProblems();
  console.log("Processed CodeForces Problems");
};

(async () => {
  await updateProblems();
})();

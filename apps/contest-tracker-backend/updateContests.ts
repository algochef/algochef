import { codechefTracker } from "./providers/codechef"
import { leetcodeTracker } from "./providers/leetcode";
import { codeforcesTracker } from "./providers/codeforces";
import { atcoderTracker } from "./providers/atcoder";


const updateDb = async () => {
    await leetcodeTracker();
    console.log("Processed Leetcode");
    await codechefTracker();
    console.log("Processed Codechef");
    await codeforcesTracker();
    console.log("Processed Codeforces");
    await atcoderTracker();
    console.log("Processed Atcoder");
    console.log("All contests has been processed!");
}


(async()=>{
    await updateDb();
})();
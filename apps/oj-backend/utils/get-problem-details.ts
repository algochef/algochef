import { getAtcoderProblemDetails } from "../platforms/atcoder";
import { getCodechefProblemDetails } from "../platforms/codechef";
import { getCodeforcesProblemDetails } from "../platforms/codeforces"
import { getCSESProblemDetails } from "../platforms/cses";
import { getLeetcodeProblemDetails } from "../platforms/leetcode";


export const getProblemDetails = async (url: string) => {
    if (url.includes('codeforces')) {
        return await getCodeforcesProblemDetails(url);
    }
    else if (url.includes('codechef')) {
        return await getCodechefProblemDetails(url);
    }
    else if (url.includes('atcoder')) {
        return await getAtcoderProblemDetails(url);
    }
    else if (url.includes('cses')) {
        return await getCSESProblemDetails(url);
    }
    else if (url.includes('leetcode')) {
        return await getLeetcodeProblemDetails(url);
    }
    return {
        message: "Platform not supported!"
    }
}
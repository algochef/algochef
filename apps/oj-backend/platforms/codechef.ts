import { Platform } from "@repo/types/contest";
import type { Problem } from "@repo/types/problem";
import { createSlug } from "../utils/create-slug";



const safeParseInt = (value: string, radix = 10) => {
    const parsed = parseInt(value, radix);
    return isNaN(parsed) ? undefined : parsed;
};

export const getCodechefProblemDetails = async (url: string) => {
    // URL PATTERNS:
    // https://www.codechef.com/learn/course/c-beginner/BC01BC24/problems/STRCC12
    // https://www.codechef.com/START188C/problems/YETMON
    try {
        const contestCode = url.split('/problems/')[0].split('/').pop()
        const problemId = url.split('/problems/')[1]
        const res = await fetch(`https://www.codechef.com/api/contests/${contestCode}/problems/${problemId}`);
        const resData = await res.json();
        const difficultyNumeric = safeParseInt(resData.difficulty_rating);
        return {
            url, 
            difficultyNumeric,
            title: resData.problem_name,
            problemCode: `CC${problemId}`,
            platform: Platform.CODECHEF,
            slug: createSlug(resData.problem_name),
        };
    }
    catch (err) {
        return {
            message: "Failed to get problem details from Codechef"
        }
    }
}

// (async () => {
//     console.log(await getCodechefProblemDetails('https://www.codechef.com/START188C/problems/YETMON'));
// })();
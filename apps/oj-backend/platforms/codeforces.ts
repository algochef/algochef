import { Platform } from "@repo/types/contest";
import type { Problem } from "@repo/types/problem";
import { createSlug } from "../utils/create-slug";
import { createTopicTag } from "../utils/create-topic-tags";




export const getCodeforcesProblemDetails = async (url: string) => {
    try {
        let contestId;
        let problemIndex;
        // https://codeforces.com/problemset/problem/1443/B
        if (url.includes('problemset/')) {
            contestId = parseInt(url.split('problem/')[1].split('/')[0]);
            problemIndex = url.split('problem/')[1].split('/')[1];
        }
        // https://codeforces.com/contest/1443/problem/B
        else if (url.includes('contest/')) {
            contestId = parseInt(url.split('/problem/')[0].split('/').pop() as string);
            problemIndex = url.split('problem/')[1];
        }
        else {
            // https://codeforces.com/edu/course/2/lesson/2/1/practice/contest/269100/problem/A
            // https://codeforces.com/gym/105859/problem/A
            return {
                message: "Gym and Edu problems cannot be fetched using API"
            }
        }
        console.log(contestId, problemIndex);
        const res = await fetch('https://codeforces.com/api/problemset.problems');
        const resData = await res.json();
        const problems = resData.result.problems;

        for (const problem of problems) {
            if (problem.contestId === contestId && problem.index === problemIndex) {
                const tagIds=[];
                for(const tag of problem.tags){
                    tagIds.push(await createTopicTag(tag));
                }
                return {
                    url,
                    platform: Platform.CODEFORCES,
                    problemCode: `CF${contestId}${problemIndex}`,
                    title: problem.name,
                    difficultyNumeric: problem.rating,
                    tags: tagIds,
                    slug: createSlug(problem.name),

                };
            }
        }
        return {
            message: "Problem doesn't exist on CF"
        };

    }
    catch (err) {
        // gym/edu problems are not supported
        console.error("Failed to get problem details");
        return {
            message: "Failed to get problem details from CF"
        };
    }
}


// (async () => {
//     // console.log(await getCodeforcesProblemDetails('https://codeforces.com/problemset/problem/1443/B'));
//     console.log(await getCodeforcesProblemDetails('https://codeforces.com/gym/105859/problem/A'));
// })()
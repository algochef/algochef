import { Platform } from "@repo/types/contest";
import { DifficultyCategory, Problem } from "@repo/types/problem";



const OJ_BACKEND = "http://localhost:3001";
export const fetchProblemData = async (problemUrl: string) => {
    try {
        const res = await fetch(OJ_BACKEND + '/api/v1/problem-details', {
            method: "POST",
            body: JSON.stringify({
                url: problemUrl
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!res.ok) {
            throw Error("Bad status code! Failed to parse problem data");
        }
        const resData = await res.json();
        return {
            title: resData.title,
            platform: resData.platform as Platform,
            problemCode: resData.problemCode,
            difficultyNumeric: resData.difficultyNumeric,
            difficultyCategory: resData.difficultyCategory as DifficultyCategory,
            url: resData.url,
            tags: resData.tags || [],
            companyTags: resData.companyTags || [],
            slug: resData.slug
        } as Problem;
    }
    catch (err) {
        return {
            title: "",
            companyTags: [],
            tags: [],
            difficultyCategory: DifficultyCategory.EASY,
            difficultyNumeric: undefined,
            problemCode: "",
            url: "",
            platform: Platform.CODEFORCES,
            slug: ""
        } as Problem;
    }
}
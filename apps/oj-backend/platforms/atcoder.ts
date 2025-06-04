import { Platform } from "@repo/types/contest";
import type { Problem } from "@repo/types/problem";
import { createSlug } from "../utils/create-slug";
import * as cheerio from "cheerio";
import { DifficultyCategory } from "@repo/types/problem";



export const getAtcoderProblemDetails = async (url: string) => {
    try {
        const problemId = url.split('/tasks/')[1].split('/')[0];
        const res = await (await fetch(url)).text();
        const $ = cheerio.load(res);
        const title = $('title').text();
        const idxWhereHyphen = title.indexOf("-");
        const trimmedTitle = title.substring(idxWhereHyphen + 1).trim();
        const score = parseInt($('span.lang-en').text().split(":")[1].split("points")[0].trim());
        let difficultyCategory = DifficultyCategory.HARD;
        if (score <= 200) {
            difficultyCategory = DifficultyCategory.EASY;
        }
        else if (score <= 400) {
            difficultyCategory = DifficultyCategory.MEDIUM;
        }
        return {
            url,
            difficultyCategory,
            title: trimmedTitle,
            platform: Platform.ATCODER,
            problemCode: `ATC${problemId}`,
            slug: createSlug(trimmedTitle),
        };
    }
    catch (err) {
        console.error(err);
        return {
            message: "Failed to get problem details from Atcoder"
        };
    }
}

// (async () => {
//     console.log(await getAtcoderProblemDetails('https://atcoder.jp/contests/arc199/tasks/arc199_a'));
// })()
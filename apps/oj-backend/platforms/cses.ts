import { Platform } from "@repo/types/contest";
import type { Problem } from "@repo/types/problem";
import { createSlug } from "../utils/create-slug";
import * as cheerio from "cheerio";
import { createTopicTag } from "../utils/create-tags";



export const getCSESProblemDetails = async (url: string) => {
    try {
        const problemId = url.split('/task/')[1];
        const html = await (await fetch(url)).text();
        const $ = cheerio.load(html);
        const title = $('div.title-block h1').text();
        const tag = $('div.nav h4').text();
        return {
            title,
            url,
            platform: Platform.CSES,
            slug: createSlug(title),
            problemCode: `CSES${problemId}`,
            tags: await createTopicTag(tag)
        };

    }
    catch (err) {
        console.error(err);
        return {
            message: "Failed to get problem details from CSES"
        };
    }
}


// (async () => {
//     console.log(await getCSESProblemDetails('https://cses.fi/problemset/task/1635'));
// })()
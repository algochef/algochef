import { Platform } from "@repo/types/contest";
import { DifficultyCategory, type Problem } from "@repo/types/problem";
import { createTopicTag } from "../utils/create-tags";




export const getLeetcodeProblemDetails = async (url: string) => {
    try {
        // https://leetcode.com/problems/candy/description/?envType=daily-question&envId=2025-06-02
        // https://leetcode.com/problems/median-of-two-sorted-arrays/
        const titleSlug = url.split('/problems/')[1].split('/')[0];
        const raw = JSON.stringify({
            "query": "query getQuestionDetail($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    title\n    titleSlug\n    content\n    difficulty\n    stats\n    topicTags {\n      name\n      slug\n    }\n    categoryTitle\n  }\n}",
            "variables": {
                "titleSlug": titleSlug
            }
        });
        const res = await fetch('https://leetcode.com/graphql/', {
            body: raw,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const resData = await res.json();
        let difficultyCategory = DifficultyCategory.EASY;
        if (resData.data.question.difficulty === 'Hard') {
            difficultyCategory = DifficultyCategory.HARD;
        }
        else if (resData.data.question.difficulty === 'Medium') {
            difficultyCategory = DifficultyCategory.MEDIUM;
        }

        const tags: { name: string, slug: string }[] = resData.data.question.topicTags;
        const tagIds = [];
        for (const item of tags) {
            tagIds.push(await createTopicTag(item.name));
        }

        return {
            url,
            difficultyCategory,
            title: resData.data.question.title,
            slug: resData.data.question.titleSlug,
            problemCode: `LC${resData.data.question.questionId}`,
            platform: Platform.LEETCODE,
            tags: tagIds
        };

    }
    catch (err) {
        console.error(err);
        return {
            message: "Failed to get problem details from Leetcode"
        };
    }
}


// (async () => {
//     console.log(await getLeetcodeProblemDetails('https://leetcode.com/problems/median-of-two-sorted-arrays/'));
// })()
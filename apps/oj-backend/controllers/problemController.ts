import { prismaClient } from "@repo/db/client";
import type { Context, Next } from "hono";
import type { Variables } from "hono/types";
import { getProblemDetails } from "../utils/get-problem-details";

export const getProblems = async (c: Context<Variables>, next: Next) => {
    // Get problems for:
    // 1. specific company tag, topic tag, difficulty, platform
    // 2. Navigation
    const { tags, companyTags, difficultyCategory } = await c.req.queries();
    // const problems  = await prismaClient.problem.findMany();
    return c.json({
        message: tags
    });
}


// export const postAddProblem = async (c: Context<Variables>, next: Next) => {
//     //  Extract title, difficulty, platform etc 
//     // TODO: Add helper function to get problem details from the url
//     const {
//         title,
//         tags,
//         companyTags,
//         difficultyCategory,
//         difficultyNumeric,
//         problemCode,
//         platform,
//         url
//     } = await c.req.json();
//     await prismaClient.problem.create({})
// }


export const postProblemDetails = async (c: Context, next: Next) => {
    const { url } = await c.req.json();
    if (!url) {
        c.status(403);
        return c.json({
            message: "Missing 'url' query parameter.",
        });
    }
    const res = await getProblemDetails(url);
    if(res && res?.message){
        c.status(403);
        return c.json({
            message: "Failed to parse problem details!",
        });
    }
    return c.json({
        ...res
    });
}


import { prismaClient } from "@repo/db/client";
import type { Context, Next } from "hono";
import type { Variables } from "hono/types";
import { getProblemDetails } from "../utils/get-problem-details";
import { DifficultyCategory } from "@repo/types/problem";
import { z } from 'zod';
import { createCompanyTag, createTopicTag } from "../utils/create-tags";
import { Platform } from "@repo/types/contest";
import { createSlug } from "../utils/create-slug";

export const getProblems = async (c: Context<Variables>, next: Next) => {
    // Get problems for:
    // 1. specific company tag, topic tag, difficulty, platform
    // 2. Navigation
    // const { tags, companyTags, difficultyCategory } = await c.req.queries();
    const parsedTags = c.req.query('tags');
    const parsedCompanies = c.req.query('companyTags');
    const tagSlugs = Array.isArray(parsedTags) ? parsedTags : (parsedTags ? [parsedTags] : []);
    const companyTagSlugs = Array.isArray(parsedCompanies) ? parsedCompanies : (parsedCompanies ? [parsedCompanies] : []);
    const difficultySchema = z.nativeEnum(DifficultyCategory);
    const difficultyRes = difficultySchema.safeParse(c.req.query('difficultyCategory'));
    if (!difficultyRes.success) {
        return c.json({
            error: "Invalid difficulty category"
        });
    }
    // TODO: add zod validation 
    // const difficultyNumeric = z.number(c.req.query('difficultyNumeric')||1);
    const difficultyCategory: DifficultyCategory = difficultyRes.data;

    const problems = await prismaClient.problem.findMany({
        where: {
            // problems that falls into a/multiple tag(s), company tag(s), difficulty
            tags: {
                some: {
                    tag: {
                        slug: {
                            in: tagSlugs
                        }
                    }
                }
            },
            companyTags: {
                some: {
                    companyTag: {
                        slug: {
                            in: companyTagSlugs
                        }
                    }
                }
            },
            difficultyCategory: difficultyCategory,
        }
    });
    return c.json({
        message: problems
    });
}


export const postAddProblem = async (c: Context<Variables>) => {
    const schema = z.object({
        title: z.string({ required_error: "Title is required" }).nonempty("Invalid title"),
        tagIds: z.array(z.number()),
        companyTagIds: z.array(z.number()),
        difficultyCategory: z.nativeEnum(DifficultyCategory).describe("Invalid Difficulty").optional(),
        platform: z.nativeEnum(Platform, { required_error: "Platform is required" }).describe("Invalid Platform"),
        difficultyNumeric: z.number().describe("Invalid Difficulty!").optional(),
        problemCode: z.string({ required_error: "Problem Code is required" }).nonempty("Invalid Problem Code"),
        url: z.string({ required_error: "URL is required" }).describe("Invalid url")
    })
    const res = schema.safeParse(await c.req.json());
    if(!res.success){
        c.status(403);
        return c.json({
            errors: res.error.flatten().fieldErrors
        })
    }
    const slug = createSlug(res.data.title);
    return c.json({
        a: res.data
    })
}


export const postProblemDetails = async (c: Context, next: Next) => {
    const { url } = await c.req.json();
    if (!url) {
        c.status(403);
        return c.json({
            message: "Missing 'url' query parameter.",
        });
    }
    const res = await getProblemDetails(url);
    if (res && res?.message) {
        c.status(403);
        return c.json({
            message: "Failed to parse problem details!",
        });
    }
    return c.json({
        ...res
    });
}



export const postCreateCompanyTag = async (c: Context<Variables>)=>{
    const schema = z.object({
        companyTag: z.string().nonempty()
    });
    const res = schema.safeParse(c.req.query('companyTag'));
    if(!res.success){
        c.status(403);
        return c.json({
            message: "Invalid input"
        })
    }
    return {
        tagId: await createCompanyTag(res.data.companyTag)
    }
}

export const postTopicTag = async (c: Context<Variables>)=>{
    const schema = z.object({
        tag: z.string().nonempty()
    });
    const res = schema.safeParse(c.req.query('tag'));
    if(!res.success){
        c.status(403);
        return c.json({
            message: "Invalid input"
        })
    }
    return {
        tagId: await createTopicTag(res.data.tag)
    }
}
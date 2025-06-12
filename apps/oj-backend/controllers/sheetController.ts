import { prismaClient } from "@repo/db/client";
import type { Context } from "hono";
import { z } from "zod";
import { createSlug } from "../utils/create-slug";
import { SheetTheme } from "@repo/types/problem";


export const getSheets = async (c: Context) => {
    const sheets = await prismaClient.sheet.findMany();

    return c.json({
        sheets
    });
}


export const getSheetsSections = async (c: Context) => {
    const slug = c.req.query('slug');
    if (!slug) {
        return c.json({
            message: "Slug is mandatory!"
        }, 403);
    }
    const user = c.get('user');
    console.log(slug, user);
    const solveCondition = user ? {
        where: {
            userId: user.id && parseInt(user.id),
        },
        select: {
            problemId: true
        }
    } : {
        where: {
            userId: -1,
        },
        select: {
            problemId: true
        }
    };
    const sections = await prismaClient.sheet.findUnique({
        where: {
            slug
        },
        select: {
            description: true,
            title: true,
            slug: true,
            theme: true,
            createdBy: {
                select: {
                    name: true,
                    username: true
                }
            },
            section: {
                select: {
                    title: true,
                    order: true,
                    problems: {
                        select: {
                            problem: {
                                select: {
                                    solved: solveCondition,
                                    companyTags: {
                                        select: {
                                            companyTag: {
                                                select: {
                                                    name: true,
                                                    slug: true
                                                }
                                            }
                                        }
                                    },
                                    tags: {
                                        select: {
                                            tag: {
                                                select: {
                                                    name: true,
                                                    slug: true
                                                }
                                            }
                                        }
                                    },
                                    difficultyCategory: true,
                                    difficultyNumeric: true,
                                    platform: true,
                                    slug: true,
                                    url: true,
                                    title: true
                                    // solved: {
                                    //    where: 
                                    // }

                                }
                            }
                        },
                        orderBy: {
                            problem: {
                                difficultyCategory: "asc"
                            }
                        }
                    }
                }
                ,
                orderBy: {
                    order: "asc"
                }
            }
        }
    });
    const difficultyOrder = {
        EASY: 0,
        MEDIUM: 1,
        HARD: 2,
    };
    const finalRes = {
        ...sections,
        section: sections?.section.map(probs => {
            return {
                ...probs,
                problems: probs.problems.map(p => {
                    return {
                        ...p.problem,
                        companyTags: p.problem.companyTags.map(cp => {
                            return cp.companyTag
                        }),
                        tags: p.problem.tags.map(t => {
                            return t.tag
                        }),
                        solved: p.problem.solved.length > 0
                    }
                }).sort((a, b) => {
                    const getDifficultyValue = (p: any) => {
                        if (p.difficultyNumeric != null) return p.difficultyNumeric;
                        return difficultyOrder[p.difficultyCategory as keyof typeof difficultyOrder] ?? 999; // fallback
                    };

                    return getDifficultyValue(a) - getDifficultyValue(b);

                }),

            }
        })
    }

    // sections
    return c.json({
        result: finalRes
    });
}

export const postAddSheet = async (c: Context) => {
    // TODO: Add logic to create unique slug
    const sheetSchema = z.object({
        title: z.string().nonempty("Sheet title can't be empty!"),
        description: z.string().optional(),
        theme: z.nativeEnum(SheetTheme).describe("Invalid theme selected!").optional().default(SheetTheme.EMERALD),
        sections: z.array(z.object({
            title: z.string().nonempty("Section title can't be empty!"),
            problems: z.array(z.object({
                problemId: z.number(),
                order: z.number(),
            })),
            order: z.number()
        }))
    });
    const user = c.get('user');
    if (!user || !user.id) {
        return c.json({
            message: "Unauthorized!"
        }, 401);
    }
    const res = sheetSchema.safeParse(await c.req.json());
    if (!res.success) {
        c.status(403);
        return c.json({
            message: "Validation Failed!"
        })
    }
    await prismaClient.sheet.create({
        data: {
            title: res.data.title,
            description: res.data.description,
            slug: createSlug(res.data.title),
            theme: res.data.theme,
            createdBy: {
                connect: {
                    id: user.id
                }
            },
            section: {
                create: res.data.sections.map(sec => ({
                    order: sec.order,
                    title: sec.title,
                    problems: {
                        create: sec.problems.map(prob => ({
                            problem: {
                                connect: {
                                    id: prob.problemId
                                }
                            }
                        }))
                    }
                }))
            }
        }
    })
    return c.json({
        res: res.data
    })
}


export const postAddSection = async (c: Context) => {

}
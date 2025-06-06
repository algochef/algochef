import { prismaClient } from "@repo/db/client";
import type { Context } from "hono";


export const getTopicTags = async (c: Context) => {
    try {
        const tags = await prismaClient.tag.findMany({
            select: {
                name: true,
                slug: true,
                _count: {
                    select: {
                        problems: true
                    }
                },
            },
            orderBy: {
                problems: {
                    _count: "desc"
                }
            }
        });

        return c.json({
            tags: tags.map(tag => {
                return {
                    name: tag.name,
                    slug: tag.slug,
                    count: tag._count.problems
                }
            })
        })
    }
    catch (err) {
        c.status(403);
        return c.json({
            message: "Unauthorized"
        })
    }
}

export const getCompanyTags = async (c: Context) => {
    try {
        const companyTags = await prismaClient.companyTag.findMany({
            select: {
                name: true,
                slug: true,
                _count: {
                    select: {
                        problems: true
                    }
                },
            },
            orderBy: {
                problems: {
                    _count: "desc"
                }
            }
        });
        return c.json({
            companyTags: companyTags.map(tag => {
                return {
                    name: tag.name,
                    slug: tag.slug,
                    count: tag._count.problems
                }
            })
        })
    }
    catch (err) {
        c.status(403);
        return c.json({
            message: "Unauthorized"
        })
    }
}
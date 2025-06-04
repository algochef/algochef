import { prismaClient } from "@repo/db/client"
import { createSlug } from "./create-slug"


export const createTopicTag = async (tag: string | undefined) => {
    if (!tag) {
        return undefined;
    }
    const trimmedTag = tag.trim();
    const slug = createSlug(trimmedTag);
    const existingTag = await prismaClient.tag.findFirst({
        where: {
            slug
        }
    });
    if (existingTag) {
        return {name: existingTag.name, slug: existingTag.slug};
    }
    const newtag = await prismaClient.tag.create({
        data: {
            slug,
            name: trimmedTag,
        }
    })
    return {name: newtag.name, slug: newtag.slug};
}



export const createCompanyTag = async (tag: string | undefined) => {
    if (!tag) {
        return undefined;
    }
    const trimmedTag = tag.trim();
    const slug = createSlug(trimmedTag);
    const existingTag = await prismaClient.companyTag.findFirst({
        where: {
            slug
        }
    });
    if (existingTag) {
        return {name: existingTag.name, slug: existingTag.slug};
    }
    const newtag = await prismaClient.companyTag.create({
        data: {
            slug,
            name: trimmedTag,
        }
    })
    return {name: newtag.name, slug: newtag.slug};
}
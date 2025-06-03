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
        return existingTag.id;
    }
    const newtag = await prismaClient.tag.create({
        data: {
            slug,
            name: trimmedTag,
        }
    })
    return newtag.id;
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
        return existingTag.id;
    }
    const newtag = await prismaClient.companyTag.create({
        data: {
            slug,
            name: trimmedTag,
        }
    })
    return newtag.id;
}
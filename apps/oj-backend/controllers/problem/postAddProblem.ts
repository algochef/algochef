import { prismaClient } from "@repo/db/client";
import { Platform } from "@repo/types/contest";
import { DifficultyCategory } from "@repo/types/problem";
import type { Context, Next } from "hono";
import type { Variables } from "hono/types";
import { z } from "zod";
import { createSlug } from "../../utils/create-slug";

export const postAddProblem = async (c: Context<Variables>) => {
  // TODO: ADD extra layer of Authorization sycning with next auth
  const schema = z.object({
    title: z
      .string({ required_error: "Title is required" })
      .nonempty("Invalid title"),
    tags: z.array(
      z.object({
        name: z.string(),
        slug: z.string(),
      }),
    ),
    companyTags: z.array(
      z.object({
        name: z.string(),
        slug: z.string(),
      }),
    ),
    difficultyCategory: z
      .nativeEnum(DifficultyCategory)
      .describe("Invalid Difficulty")
      .optional(),
    platform: z
      .nativeEnum(Platform, { required_error: "Platform is required" })
      .describe("Invalid Platform"),
    difficultyNumeric: z.number().describe("Invalid Difficulty!").optional(),
    problemCode: z
      .string({ required_error: "Problem Code is required" })
      .nonempty("Invalid Problem Code"),
    url: z
      .string({ required_error: "URL is required" })
      .describe("Invalid url"),
  });
  const res = schema.safeParse(await c.req.json());
  if (!res.success) {
    c.status(403);
    return c.json({
      errors: res.error.flatten().fieldErrors,
    });
  }
  try {
    const newProblem = await prismaClient.problem.create({
      data: {
        url: res.data.url,
        title: res.data.title,
        problemCode: res.data.problemCode,
        slug: createSlug(res.data.title),
        difficultyCategory: res.data.difficultyCategory,
        difficultyNumeric: res.data.difficultyNumeric,
        tags:
          res.data.tags.length > 0
            ? {
                create: res.data.tags.map((t) => ({
                  tag: {
                    connectOrCreate: {
                      where: { slug: t.slug },
                      create: {
                        name: t.name,
                        slug: createSlug(t.name),
                      },
                    },
                  },
                })),
              }
            : undefined,
        companyTags:
          res.data.companyTags.length > 0
            ? {
                create: res.data.companyTags.map((companyT) => ({
                  companyTag: {
                    connectOrCreate: {
                      where: { slug: companyT.slug },
                      create: {
                        name: companyT.name,
                        slug: createSlug(companyT.name),
                      },
                    },
                  },
                })),
              }
            : undefined,
        platform: res.data.platform,
      },
    });
    return c.json({
      problem: newProblem,
    });
  } catch (err) {
    c.status(500);
    return c.json({
      message: res.data,
    });
  }
};

import { prismaClient } from "@repo/db/client";
import type { Context, Next } from "hono";
import type { Variables } from "hono/types";

export const getProblems = async (c: Context<Variables>, next: Next) => {
  // TODO: Get problems for:
  // // 1. specific company tag, topic tag, difficulty, platform
  // // 2. Navigation

  const problems = await prismaClient.problem.findMany({
    include: {
      companyTags: {
        include: {
          companyTag: true,
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
  const formattedProblems = problems.map((problem) => {
    return {
      ...problem,
      tags: problem.tags.map((t) => t.tag),
      companyTags: problem.companyTags.map((t) => t.companyTag),
    };
  });
  console.log(formattedProblems);
  return c.json({
    results: formattedProblems,
  });
};

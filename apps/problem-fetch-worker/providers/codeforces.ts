import { prismaClient } from "@repo/db/client";
import { Platform } from "@repo/types/problem";
import { DifficultyCategory } from "@repo/types/problem";
import type { Problem } from "@repo/types/problem";
import { getTitleSlug } from "../utils/generateSlug";

export const codeforcesProblems = async (): Promise<Problem[]> => {
  try {
    const url = "https://codeforces.com/api/problemset.problems";
    const response = await fetch(url);
    // console.log(res);

    // Bad status code
    if (!response.ok) {
      throw Error("Failed to get CodeForces Problems");
    }
    const data = (await response.json()) as { result: { problems: any[] } };
    // console.log(data.result);
    // console.log(data.result.problems);

    const problems: Problem[] = [];

    for (const singleProblem of data.result.problems) {
      const contestId = singleProblem?.contestId;
      const index = singleProblem?.index;
      const problemCode = `${contestId}${index}`;
      const title = singleProblem.name;
      const url = `https://codeforces.com/contest/${contestId}/problem/${index}`;
      const slug = getTitleSlug(Platform.CODEFORCES, title, problemCode);
      const tags = singleProblem?.tags || [];
      const difficultyNumeric = singleProblem?.rating;

      const newProblem: Problem = {
        platform: Platform.CODEFORCES,
        problemCode,
        title,
        url,
        slug,
        difficultyNumeric,
        isActive: true,
        tags,
      };

      const problem = await prismaClient.problem.upsert({
        where: {
          platform_problemCode: {
            platform: Platform.CODEFORCES,
            problemCode: problemCode,
          },
        },
        update: {
          title,
          url,
          slug,
          difficultyNumeric,
        },
        create: {
          platform: Platform.CODEFORCES,
          problemCode,
          title,
          url,
          slug,
          difficultyNumeric,
        },
      });

      for (const tagName of tags) {
        const tag = await prismaClient.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });

        await prismaClient.problemTag.upsert({
          where: {
            problemId_tagId: {
              problemId: problem.id,
              tagId: tag.id,
            },
          },
          update: {},
          create: {
            problemId: problem.id,
            tagId: tag.id,
          },
        });
      }
      problems.push(newProblem);
    }

    console.log("✅ Codeforces problems synced.");

    return problems;
  } catch (error) {
    console.error("❌ Failed to sync Codeforces problems:", error);
    return [];
  }
};

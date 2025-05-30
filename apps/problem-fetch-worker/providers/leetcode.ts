import { prismaClient } from "@repo/db/client";
import { Platform } from "@repo/types/problem";
import { DifficultyCategory } from "@repo/types/problem";
import type { Problem } from "@repo/types/problem";

interface LeetCodeTag {
  name: string;
  slug: string;
  id: string;
}

async function getTagList(posTags: LeetCodeTag[]): Promise<string[]> {
  return posTags.map((tag) => tag.name);
}

export const leetcodeProblems = async (): Promise<Problem[]> => {
  try {
    const query = `
    query problemsetQuestionList(
      $categorySlug: String,
      $limit: Int,
      $skip: Int,
      $filters: QuestionListFilterInput
    ) {
      problemsetQuestionList: questionList(
        categorySlug: $categorySlug,
        limit: $limit,
        skip: $skip,
        filters: $filters
      ) {
        total: totalNum
        questions: data {
          acRate
          difficulty
          freqBar
          frontendQuestionId: questionFrontendId
          isFavor
          paidOnly: isPaidOnly
          status
          title
          titleSlug
          topicTags {
            name
            id
            slug
          }
          hasSolution
          hasVideoSolution
        }
      }
    }
    `;
    const LIMIT = 100;
    let skip = 0;
    let cnt = 0;

    const problems: Problem[] = [];
    
    while(true) {
      const variables = {
        categorySlug: "",
        skip,
        limit: LIMIT,
        filters: {},
      };

      const response = await fetch("https://leetcode.com/graphql/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Referrer: "https://leetcode.com",
        },
        body: JSON.stringify({ query, variables }),
      });
      const resData = (await response.json()) as {
        data: {
          problemsetQuestionList: {
            questions: any[];
          };
        };
      };
      const allProblems = resData.data.problemsetQuestionList.questions;
      // console.log(allProblems);
      // console.log(allProblems.length);
      
      if (!allProblems.length) break;

      for (const singleProblem of allProblems) {
        const frontendQuestionId = singleProblem?.frontendQuestionId;
        const problemCode = `LC-${frontendQuestionId}`;
        const title = singleProblem.title;
        const url = `https://leetcode.com/problems/${singleProblem.titleSlug}/description/`;
        const slug = `${Platform.LEETCODE.toLowerCase()}-${singleProblem.titleSlug}`;
        const difficultyCategory = singleProblem.difficulty.toUpperCase();
        const tags = await getTagList(singleProblem?.topicTags);
  
        const newProblem: Problem = {
          platform: Platform.LEETCODE,
          problemCode,
          title,
          url,
          slug,
          difficultyCategory,
          isActive: true,
          tags,
        };
  
        const problem = await prismaClient.problem.upsert({
          where: {
            platform_problemCode: {
              platform: Platform.LEETCODE,
              problemCode: problemCode,
            },
          },
          update: {
            title,
            url,
            slug,
            difficultyCategory,
          },
          create: {
            platform: Platform.LEETCODE,
            problemCode,
            title,
            url,
            slug,
            difficultyCategory,
            isActive: true,
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
      cnt += 1;
      skip += LIMIT;
    }
    // console.log(cnt);
    return problems;
  } catch (error) {
    console.error("Failed to fetch LeetCode problems:", error);
    return [];
  }
};

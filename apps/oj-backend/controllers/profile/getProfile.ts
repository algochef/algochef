import { prismaClient } from "@repo/db/client";
import { Platform } from "@repo/types/contest";
import type { Context } from "hono";
import { getLeetcodeProfileStats } from "../../utils/profile-details/leetcode-profile-stats";
import { getCodeforcesProfileStats } from "../../utils/profile-details/codeforce-profile-stats";
import { getCodeChefProfileStats } from "../../utils/profile-details/codechef-profile-stats";
import { getAtcoderProfileStats } from "../../utils/profile-details/atcoder-profile-stats";
import { getCsesStats } from "../../utils/profile-details/cses-profile-stats";

export const getProfile = async (c: Context) => {
  const username = c.req.param("username");
  const user = await prismaClient.user.findUnique({
    where: {
      username,
    },
    include: {
      social: {
        select: {
          githubUrl: true,
          instagramUrl: true,
          linkedinUrl: true,
          portfolioUrl: true,
          twitterUrl: true,
        },
      },
      ojHandles: {
        omit: {
          createdAt: true,
          userId: true,
          id: true,
        },
      },
    },
    omit: {
      provider: true,
      providerId: true,
      createdAt: true,
      password: true,
    },
  });
  if (!user) {
    return c.json(
      {
        message: "User not found",
      },
      401,
    );
  }
  const userWithOjStats = {
    ...user,
    ojHandles: await Promise.all(
      user.ojHandles.map(async (handle) => {
        if (handle.totalSolved) {
          return handle;
        }
        let details;
        if (handle.platform === Platform.LEETCODE) {
          details = await getLeetcodeProfileStats(handle.handle);
        } else if (handle.platform === Platform.CODEFORCES) {
          details = await getCodeforcesProfileStats(handle.handle);
        } else if (handle.platform === Platform.CODECHEF) {
          details = await getCodeChefProfileStats(handle.handle);
        } else if (handle.platform === Platform.ATCODER) {
          details = await getAtcoderProfileStats(handle.handle);
        } else if (handle.platform === Platform.CSES) {
          details = await getCsesStats(handle.handle as unknown as number);
        } else return handle;
        return {
          ...handle,
          ...details,
        };
      }),
    ),
  };
  return c.json({
    result: userWithOjStats,
  });
};

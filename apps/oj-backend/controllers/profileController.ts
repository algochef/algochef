import { prismaClient } from "@repo/db/client";
import { Platform } from "@repo/types/contest";
import type { Context } from "hono";
import { z } from "zod";
import { verifyHandle } from "../utils/verify/verifyHandle";
import { getLeetcodeProfileStats } from "../utils/profile-details/leetcode-profile-stats";
import { getCodeforcesProfileStats } from "../utils/profile-details/codeforce-profile-stats";
import { getCodeChefProfileStats } from "../utils/profile-details/codechef-profile-stats";
import { getAtcoderProfileStats } from "../utils/profile-details/atcoder-profile-stats";
import { getCsesStats } from "../utils/profile-details/cses-profile-stats";

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

export const postAddAHandle = async (c: Context) => {
  // TODO: handle invalid handle or already taken handle
  const user = c.get("user");
  if (!user || !user.id) {
    return c.json(
      {
        message: "Unauthorized",
      },
      403,
    );
  }
  const schema = z.object({
    platform: z
      .nativeEnum(Platform, { required_error: "Platform is required" })
      .describe("Invalid platform"),
    handle: z.string().nonempty("Enter a valid handle"),
  });

  const res = schema.safeParse(await c.req.json());
  if (!res.success) {
    return c.json(
      {
        message: "Invalid input",
      },
      401,
    );
  }
  // Validate handle
  const userId = parseInt(user.id);
  const handle = res.data.handle;
  const platform = res.data.platform;

  let details;
  if (platform === Platform.LEETCODE)
    details = await getLeetcodeProfileStats(handle);
  else if (platform === Platform.CODEFORCES)
    details = await getCodeforcesProfileStats(handle);
  else if (platform === Platform.CODECHEF)
    details = await getCodeChefProfileStats(handle);
  else if (platform === Platform.ATCODER)
    details = await getAtcoderProfileStats(handle);
  else if (platform === Platform.CSES)
    details = await getCsesStats(parseInt(handle));
  else {
    return c.json(
      {
        message: "Invalid Platform",
      },
      401,
    );
  }
  console.log(details);
  await prismaClient.ojProfile.upsert({
    where: {
      userId_platform: {
        userId,
        platform,
      },
    },
    create: {
      userId,
      handle,
      platform,
      badge: details ? details.badge : undefined,
      easySolved:
        platform === Platform.LEETCODE && details ? details?.easySolved : 0,
      mediumSolved:
        platform === Platform.LEETCODE && details ? details?.mediumSolved : 0,
      hardSolved:
        platform === Platform.LEETCODE && details ? details?.hardSolved : 0,
      maxRating: details?.maxRating,
      rank: details?.rank,
      rating: details?.rating,
      totalSolved: details?.totalSolved || 0,
      totalContests: details?.totalContests,
    },
    update: {
      handle,
      platform,
      verified: false,
      badge: details ? details.badge : undefined,
      easySolved:
        platform === Platform.LEETCODE && details ? details?.easySolved : 0,
      mediumSolved:
        platform === Platform.LEETCODE && details ? details?.mediumSolved : 0,
      hardSolved:
        platform === Platform.LEETCODE && details ? details?.hardSolved : 0,
      maxRating: details?.maxRating,
      // maxRank: parseInt(details?.maxRank || "0"),
      rank: details?.rank,
      rating: details?.rating,
      totalSolved: details?.totalSolved || 0,
      totalContests: details?.totalContests,
    },
  });

  return c.json({
    message: "Successful",
    code: "#" + user.id,
  });
};

export const getVerifyHandle = async (c: Context) => {
  const username = c.req.param("username");
  if (!username) {
    return c.json(
      {
        message: "No username passed",
      },
      401,
    );
  }
  const schema = z.object({
    platform: z.nativeEnum(Platform),
    handle: z.string().nonempty(),
  });
  const res = schema.safeParse(c.req.query());
  console.log("getting query  ", c.req.query());
  if (!res.success) {
    return c.json(
      {
        message: "Invalid platform or handle",
      },
      401,
    );
  }

  const user = await prismaClient.user.findFirst({
    where: {
      username,
    },
    include: {
      ojHandles: {
        where: {
          platform: res.data.platform,
          handle: res.data.handle,
          verified: false,
        },
      },
    },
  });

  if (!user) {
    return c.json({
      message:
        "Either username/platform combination is invalid or handle is already verified",
    });
  }

  console.log("success");

  // Check
  try {
    if (await verifyHandle(res.data.platform, res.data.handle, `#${user.id}`)) {
      await prismaClient.ojProfile.update({
        where: {
          userId_platform: {
            platform: res.data.platform,
            userId: user.id,
          },
        },
        data: {
          verified: true,
        },
      });

      return c.json({
        message: "Successful",
      });
    } else {
      return c.json({
        message: "Failed to verify!",
      });
    }
  } catch (err) {
    return c.json({
      message: "Failed to verify! " + err,
    });
  }
};

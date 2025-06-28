import { Platform } from "@repo/types/contest";
import type { Context } from "hono";
import { z } from "zod";
import {
  fetchLeetcodeSubmissionsCalendar,
  getLeetcodeProfileStats,
} from "../../utils/profile-details/leetcode-profile-stats";
import {
  fetchCodeforcesSubmissionCalendar,
  getCodeforcesProfileStats,
} from "../../utils/profile-details/codeforce-profile-stats";
import { getCodeChefProfileStats } from "../../utils/profile-details/codechef-profile-stats";
import { getAtcoderProfileStats } from "../../utils/profile-details/atcoder-profile-stats";
import { getCsesStats } from "../../utils/profile-details/cses-profile-stats";
import { prismaClient } from "@repo/db/client";

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
  if (platform === Platform.LEETCODE) {
    details = await getLeetcodeProfileStats(handle);
  } else if (platform === Platform.CODEFORCES) {
    details = await getCodeforcesProfileStats(handle);
  } else if (platform === Platform.CODECHEF) {
    details = await getCodeChefProfileStats(handle);
  } else if (platform === Platform.ATCODER) {
    details = await getAtcoderProfileStats(handle);
  } else if (platform === Platform.CSES) {
    details = await getCsesStats(parseInt(handle));
  } else {
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

  // TODO: Handle submission update on background
  if (platform === Platform.LEETCODE) {
    await fetchLeetcodeSubmissionsCalendar(handle);
  } else if (platform === Platform.CODEFORCES) {
    await fetchCodeforcesSubmissionCalendar(handle);
  }

  return c.json({
    message: "Successful",
    code: "#" + user.id,
  });
};

import { Platform } from "@repo/types/contest";
import type { Context } from "hono";
import { z } from "zod";
import { verifyHandle } from "../../utils/verify/verifyHandle";
import { prismaClient } from "@repo/db/client";

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

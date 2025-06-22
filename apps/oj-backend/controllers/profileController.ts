import { prismaClient } from "@repo/db/client";
import { Platform } from "@repo/types/contest";
import type { Context } from "hono";
import { z } from "zod";
import { verifyCodeforces } from "../utils/verify/codeforces";
import { verifyHandle } from "../utils/verify/verifyHandle";

export const getProfile = async (c: Context) => {
    const username = c.req.param('username');
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
                }
            },
            ojHandles: {
                select: {
                    handle: true,
                    verified: true,
                    platform: true,
                }
            }
        },
        omit: {
            provider: true,
            providerId: true,
            createdAt: true,
            password: true,
        }
    })
    if (!user) {
        return c.json({
            message: "User not found"
        }, 401);
    }
    return c.json({
        result: user
    })
}


export const postAddAHandle = async (c: Context) => {
    const user = c.get('user');
    if (!user || !user.id) {
        return c.json({
            message: "Unauthorized"
        }, 403);
    }
    const schema = z.object({
        platform: z.nativeEnum(Platform, { required_error: "Platform is required" }).describe("Invalid platform"),
        handle: z.string().nonempty("Enter a valid handle")
    });

    const res = schema.safeParse(await c.req.json())
    if (!res.success) {
        return c.json({
            message: "Invalid input"
        }, 401);
    }
    // Validate handle
    const userId = parseInt(user.id);
    const handle = res.data.handle;
    const platform = res.data.platform;
    await prismaClient.ojProfile.upsert({
        where: {
            userId_platform: {
                userId,
                platform
            }
        },
        create: {
            userId,
            handle,
            platform
        },
        update: {
            handle,
            verified: false
        }
    });

    return c.json({
        message: "Successful",
        code: "#" + user.id
    })
}



export const getVerifyHandle = async (c: Context) => {
    const username = c.req.param('username');
    if (!username) {
        return c.json({
            message: "No username passed"
        }, 401);
    }
    const schema = z.object({
        platform: z.nativeEnum(Platform),
        handle: z.string().nonempty()
    });
    const res = schema.safeParse(c.req.query());
    console.log("geeting query  ", c.req.query());
    if (!res.success) {
        return c.json({
            message: "Invalid platform or handle"
        }, 401);
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
                }
            }
        }
    })

    if (!user) {
        return c.json({
            message: "Either username/platform combination is invalid or handle is already verified"
        });
    }

    console.log("success")

    // Check 
    try {
        if (await verifyHandle(res.data.platform,res.data.handle, `#${user.id}`)) {
            await prismaClient.ojProfile.update({
                where: {
                    userId_platform: {
                        platform: res.data.platform,
                        userId: user.id
                    }
                },
                data: {
                    verified: true
                }
            })

            return c.json({
                message: "Successful"
            })
        }
        else{
            return c.json({
            message: "Failed to verify!"
        })
        }
    }
    catch(err){
        return c.json({
            message: "Failed to verify! "+ err
        })
    }

}
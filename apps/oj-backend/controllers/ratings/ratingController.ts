import type { Context } from "hono";
import { fetchLeetcodeRatingHistory } from "../../utils/contests-history/leetcode-contest-history";
import { z } from "zod";
import { Platform } from "@repo/types/contest";
import { fetchCodeforcesRatingHistory } from "../../utils/contests-history/codeforces-contest-history";
import { fetchCodechefRatingHistory } from "../../utils/contests-history/codechef-contest-history";
import { fetchAtcoderRatingHistory } from "../../utils/contests-history/atcoder-contest-history";
import { prismaClient } from "@repo/db/client";

export const getRatingHistory = async (c: Context) => {
    const schema = z.object({
        handle: z.string().nonempty(),
        platform: z.nativeEnum(Platform)
    })
    const res = schema.safeParse({
        handle: c.req.param("handle"),
        platform: c.req.param("platform").toUpperCase()
    })
    if (!res.success) {
        return c.json(
            {
                message: "Handle or platform is invalid!",
            },
            401,
        );
    }
    try {
        const ojHandle = await prismaClient.ojProfile.findFirst({
            where: {
                handle: res.data.handle,
                platform: res.data.platform
            }
        });
        if(!ojHandle){
            return c.json({
                message: "Handle isnt registered yet!"
            }, 401);
        }
        let result;
        const ratingHistory = await prismaClient.ratingHistory.findMany({
            where: { platform: res.data.platform, ojProfileId: ojHandle.id },
            omit:{
                ojProfileId: true,
            }
        })
        
        if(ratingHistory && ratingHistory.length>0){
            return c.json({
                result: ratingHistory
            });
        }
        if (res.data.platform === Platform.LEETCODE) {
            result = await fetchLeetcodeRatingHistory(res.data.handle);
        }
        else if (res.data.platform === Platform.CODEFORCES) {
            result = await fetchCodeforcesRatingHistory(res.data.handle);
        }
        else if (res.data.platform === Platform.CODECHEF) {
            result = await fetchCodechefRatingHistory(res.data.handle);
        }
        else if (res.data.platform === Platform.ATCODER) {
            result = await fetchAtcoderRatingHistory(res.data.handle);
        }
        else {
            return c.json({
                message: "Invalid Platform!"
            }, 401);
        }
        if(!result){
            return c.json({
                result: []
            });
        }

        await prismaClient.ratingHistory.createMany({
            data: result.map(res=>{
                return {
                    ...res,
                    ojProfileId: ojHandle.id,
                    platform: ojHandle.platform,
                }
            }),
            skipDuplicates: true
        })
        return c.json({
            result,
        });
    } catch (err) {
        console.error(err)
        return c.json(
            {
                message: "Failed to generate rating history",
            },
            401,
        );
    }
};

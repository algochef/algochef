import { prismaClient } from "@repo/db/client";
import { contestType as ContestTypeEnum } from "@repo/types/contest"

export default async function getContests(
    { offset = 0,
        limit = 10,
        contestType = ContestTypeEnum.UPCOMING
    }: {
        offset?: number;
        limit?: number;
        contestType?: ContestTypeEnum
    }={}) {
    const order = contestType === ContestTypeEnum.UPCOMING ? "desc" : "asc";
    const hasEnded = contestType !== ContestTypeEnum.UPCOMING;
    const contests = await prismaClient.contest.findMany({
        skip: offset,
        take: limit,
        where: {
            hasEnded
        },
        orderBy: {
            startsAt: order
        }
    })

    return contests;
}
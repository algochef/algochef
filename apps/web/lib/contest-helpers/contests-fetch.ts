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
    const order = contestType === ContestTypeEnum.UPCOMING ? "asc" : "desc";
    const whereClause = contestType === ContestTypeEnum.UPCOMING?{
        endsAt: {
            gte: Math.round(Date.now()/1000)
        }
    }:{
        endsAt:{
            lt: Math.round(Date.now()/1000)
        }
    }
    const contests = await prismaClient.contest.findMany({
        skip: offset,
        take: limit,
        where: whereClause,
        orderBy: {
            startsAt: order
        }
    })
    // if(contestType===ContestTypeEnum.UPCOMING){
    //     console.log(contests);
    // }
    return contests;
}
import { TabsContent } from '@radix-ui/react-tabs'
import React from 'react'
import ContestCard from './contest-card'
import { Contest, contestType as contestTypeEnum } from '@repo/types/contest'
import getContests from '@/lib/contest-helpers/contests'

const LoadContests = async (
    { contestType = contestTypeEnum.UPCOMING }:
        { contestType?: contestTypeEnum }
) => {
    console.log(contestType);
    const contests = await getContests({ contestType, limit:20 })
    return (
        <TabsContent value={`${contestType == contestTypeEnum.UPCOMING ? 'upcoming' : 'past'}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contests.map(contest=>(
                <ContestCard key={contest.id} contest={contest as Contest}/>
            ))}
        </TabsContent>
    )
}

export default LoadContests
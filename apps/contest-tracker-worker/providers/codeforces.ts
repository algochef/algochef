import { prismaClient } from "@repo/db/client";
import type { Contest } from "@repo/types/contest";
import { Platform } from "@repo/types/contest";


export const codeforcesTracker = async (): Promise<Contest[]> => {

    try {
        // Get the list of all CF contests
        const res = await fetch('https://codeforces.com/api/contest.list?gym=false');

        // bad status code, raise error
        if (!res.ok) {
            throw Error("Failed to get Codeforces contests");
        }

        // get the result 
        const results = (await res.json()).result;
        const contests: Contest[] = [];
        for (const item of results) {
            const hasEnded = item.relativeTimeSeconds < 0;

            
            const newItem: Contest = {
                hasEnded,
                title: item.name,
                url: 'https://codeforces.com/contest/' + item.id,
                startsAt: item.startTimeSeconds,
                duration: item.durationSeconds,
                platform: Platform.CODEFORCES,
            }
            if(!hasEnded){
                await prismaClient.contest.upsert({
                    where: {url:newItem.url},
                    update: {
                        title: newItem.title,
                        startsAt: newItem.startsAt
                    },
                    create: newItem
                });
            }
            else{
                try{
                    await prismaClient.contest.create({
                        data: newItem
                    })
                }
                catch(err){
                    // console.log("already added");
                }
            }
            contests.push(newItem);
        }
        return contests;
    }
    catch (err) {
        console.log(err);
        return [];
    }
}



// (async () => {
//     const res = await codeforcesTracker();
//     console.log(res);
// })();
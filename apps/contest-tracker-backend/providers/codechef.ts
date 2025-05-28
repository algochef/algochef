import { Platform, type Contest } from "@repo/types/contest";
import { getUnixTime } from "../utils/dateTimeFormatter";
import { prismaClient } from "@repo/db/client";



const getCodechefUpcomingContests = async () => {
    try {
        const res = await fetch('https://www.codechef.com/api/list/contests/all');

        // bad status code, raise error
        if (!res.ok) {
            throw Error("Failed to get upcoming Codechef contests");
        }
        const resData = await res.json();
        return resData.future_contests;
    }
    catch (err) {
        return [];
    }
}



export const codechefTracker = async () => {
    const resData: any[] = await getCodechefUpcomingContests();
    try {
        const totalOffset = 4000;
        for (let offset = 0; offset <= totalOffset; offset += 20) {
            console.log(offset);
            const res = await fetch(`https://www.codechef.com/api/list/contests/past?sort_by=START&sorting_order=desc&offset=${offset}&mode=all`);


            // bad status code, raise error
            if (!res.ok) {
                throw Error("Failed to get Codechef contests");
            }
            // get the result 
            const results: [] = (await res.json()).contests;
            if (!results || results.length == 0) break;
            resData.push(...results);
        }
        const contests: Contest[] = [];
        const curTime = Math.round(Date.now() / 1000);
        for (const item of resData) {
            // console.log(item);
            const hasEnded = getUnixTime(item.contest_end_date) < curTime;
            const duration = parseInt(item.contest_duration) * 60;
            const startsAt = getUnixTime(item.contest_start_date);
            const newItem: Contest = {
                startsAt,
                endsAt: startsAt+duration,
                title: item.contest_name,
                url: "https://www.codechef.com/" + item.contest_code,
                platform: Platform.CODECHEF
            }
            // contests.push(newItem);
            try {
                await prismaClient.contest.create({
                    data: newItem
                });
            }
            catch (err) {
                // console.log(err);
                // console.log(newItem.title, " has already been added");
            }
        }
        return contests;

    }
    catch (err) {
        console.log(err);
        return [];

    }
}



// (async()=>{
//     console.log(await codechefTracker());
// })();
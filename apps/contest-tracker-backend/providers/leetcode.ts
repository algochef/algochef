import { prismaClient } from "@repo/db/client";
import type { Contest } from "@repo/types/contest";
import { Platform } from "@repo/types/contest";

const twoTopContests = async () => {
    try {
        const res = await fetch("https://leetcode.com/graphql/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Referrer": "https://leetcode.com"
            },
            body: JSON.stringify({
                "query": "query topTwoContests { topTwoContests { title titleSlug startTime duration } }",
                "operationName": "topTwoContests"
            })
        });
        if (!res.ok) {
            return [];
        }
        const resData = (await res.json()).data.topTwoContests;
        return resData;
    }
    catch (err) {
        return []
    }
}

const getPastContests = async (page: number): Promise<any[]> => {
    console.log(page);
    // Get the list of all LC contests
    const res = await fetch("https://leetcode.com/graphql/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Referrer": "https://leetcode.com"
        },
        body: JSON.stringify({
            "query": "query pastContests($pageNo: Int, $numPerPage: Int) { pastContests(pageNo: $pageNo, numPerPage: $numPerPage) { pageNum currentPage totalNum numPerPage data { title titleSlug startTime duration } } }",
            "variables": {
                "pageNo": page
            },
            "operationName": "pastContests"
        })
    });

    if (!res.ok) {
        throw Error("Failed to get Leetcode contests");
    }
    // Read the response
    const resData = await res.json();
    return resData.data.pastContests.data;


}

const getTotalPages = async () => {
    try {
        // Get the list of all LC contests
        // It uses graphQL
        const res = await fetch("https://leetcode.com/graphql/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Referrer": "https://leetcode.com"
            },
            body: JSON.stringify({
                "query": "query pastContests($pageNo: Int, $numPerPage: Int) { pastContests(pageNo: $pageNo, numPerPage: $numPerPage) { pageNum currentPage totalNum numPerPage data { title titleSlug startTime duration } } }",
                "variables": {
                    "pageNo": 1
                },
                "operationName": "pastContests"
            })
        });

        // Read the response
        const resData = await res.json();
        return Math.ceil((resData.data.pastContests.totalNum) / 10);
    }
    catch(err){
        console.log("Failed to get total page count");
        return 1;
    }
}


export const leetcodeTracker = async () => {
    try {
        const resData: any[] = await twoTopContests();
        // Calculate total number of pages to go through

        const totalPages = await getTotalPages();
        for (let page = 0; page <= totalPages; page++) {
            resData.push(...await getPastContests(page));
        }
        const contests: Contest[] = []
        const curTime = Math.round(Date.now() / 1000);
        for (const item of resData) {
            const endsAt = (item.startTime + item.duration);
            const hasEnded = endsAt < curTime;
            const newItem: Contest = {
                hasEnded,
                title: item.title,
                platform: Platform.LEETCODE,
                duration: item.duration,
                startsAt: item.startTime,
                url: "https://leetcode.com/contest/" + item.titleSlug,
            }
            // contests.push(newItem);
            try{
                await prismaClient.contest.create({
                    data: newItem
                });
            }
            catch(err){
                // console.log(newItem.title, " has already been added");
            }
        }
        return contests;
    }
    catch (err) {
        console.log(err);
        return []
    }
}


// (async () => {
//     const res = await leetcodeTracker();
//     console.log(res);
// })()
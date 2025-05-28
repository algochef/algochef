import * as cheerio from 'cheerio';
import { Platform, type Contest } from '@repo/types/contest';
import { getUnixTime } from '../utils/dateTimeFormatter';
import { prismaClient } from '@repo/db/client';


export type ContestType = 'upcoming' | 'recent';


export async function fetchContestList(type: ContestType = 'upcoming'): Promise<Contest[]> {
    try {
        const url = 'https://atcoder.jp/contests';
        const html = await (await fetch(url)).text();
        const $ = cheerio.load(html);
        const contests: Contest[] = [];

        const tableSelector = type === 'upcoming' ? '#contest-table-upcoming' : '#contest-table-recent';
        const contestRows = $(`${tableSelector} tbody tr`);

        if (contestRows.length === 0) {
            console.warn(`No ${type} contests found. The HTML structure may have changed or there are no contests.`);
        }
        const curTime = Math.round(Date.now() / 1000);
        // contestRows.each(async (_, el) =>{}
        for (const el of contestRows) {
            try {
                const startsAt = getUnixTime($(el).find('td:nth-child(1)').text().trim());
                const title = $(el).find('td:nth-child(2) a').text().trim();
                const duration = $(el).find('td:nth-child(3)').text().trim();
                const seconds = parseInt(duration.split(":")[0]) * 3600 + parseInt(duration.split(":")[1])*60;
                const contestIdElement = $(el).find('td:nth-child(2) a').attr('href');
                if (!contestIdElement) continue;
                const url = 'https://atcoder.jp' + contestIdElement;

                const hasEnded = curTime > startsAt;
                const newItem: Contest = {
                    title,
                    startsAt,
                    url,
                    endsAt: startsAt+seconds,
                    platform: Platform.ATCODER
                };
                try {
                    await prismaClient.contest.create({
                        data: newItem
                    });
                }
                catch (err) {
                    console.log(newItem.title, " has already been added");
                }
                // console.log(seconds);
                // contests.push(newItem);
            } catch (rowError) {
                console.error('Error parsing contest row:', rowError);

            }
        };

        return contests;
    } catch (error) {
        console.error('Error fetching contest list:', error);
        throw new Error(`Failed to fetch contests: ${error instanceof Error ? error.message : String(error)}`);
    }
}

const fetchUpcomingContests = async (): Promise<Contest[]> => {
    return fetchContestList('upcoming');
}
const fetchRecentContests = async (): Promise<Contest[]> => {
    return fetchContestList('recent');
}


export const atcoderTracker = async()=>{
    await fetchUpcomingContests();
    await fetchRecentContests();
}

// (async () => {
//     await fetchUpcomingContests();
//     await fetchRecentContests();
// })();
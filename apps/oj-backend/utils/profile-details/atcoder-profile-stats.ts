import * as cheerio from "cheerio";
import { type AtcoderAccount, AtcoderAccountSchema } from "@repo/types/stat";

const parseRank = (value: string) => {
    try {
        let rank = "";
        for (const ch of value) {
            if (ch >= "0" && ch <= "9") {
                rank += ch;
            }
        }
        return parseInt(rank);
    }
    catch (err) {
        return 0;
    }
}

const getAtcoderTotalSolve = async (handle: string) => {
    try {
        const res = await fetch('https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user='+handle);
        if(!res.ok){
            console.error("Failed to get atcoder total count");
        }
        const resData = await res.json();
        return resData.count;
    }
    catch(err){
        console.error("Failed to get atcoder total count using kenkoooo's API");
        return 0;
    }
}

export const getAtcoderStats = async (handle: string) => {
    try {
        const res = await fetch('https://atcoder.jp/users/' + handle);
        if (!res.ok) {
            throw Error("Couldn't make ATC API request!");
        }
        const $ = cheerio.load(await res.text());
        const affiliation = $('.dl-table').eq(0).find('tr').eq(3).find('td.break-all').text().trim();
        const rank = parseRank($('.dl-table').eq(1).find('tr').eq(0).find('td').text().trim()) || 0;
        const badge = $('.dl-table').eq(1).find('tr').eq(2).find('img').attr('src');
        const rating = parseInt($('.dl-table').eq(1).find('tr').eq(1).find('td').text().trim()) || 0;
        const maxRating = parseInt($('.dl-table').eq(1).find('tr').eq(2).find('td').text().trim()) || 0;
        const totalContests = parseInt($('.dl-table').eq(1).find('tr').eq(3).find('td').text().trim()) || 0;
        const data:AtcoderAccount = {
            affiliation,
            totalContests,
            rank,
            badge,
            rating,
            maxRating,
            totalSolved: await getAtcoderTotalSolve(handle)
        }
        return data;
    }
    catch (err) {
        console.error(err);
        throw Error("Something went wrong while parsing Atcoder profile!");
    }
}


(async () => {
    console.log(await getAtcoderStats('terminalwarlord'));
})()
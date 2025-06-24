import * as cheerio from "cheerio";

export const getSubmissionCount = async (userId: number) => {
    try {
        const res = await fetch('https://cses.fi/user/' + userId);
        if (!res.ok) {
            console.error("Bad status code");
            return null;
        }
        const $ = cheerio.load(await res.text());
        const table = $('table.narrow').find('tr').slice(4);
        for (const item of table) {
            const $item = $(item);
            const language = $item.find('td').eq(0).text().trim();
            const submissions = parseInt($item.find('td').eq(1).text().trim());
            // TODO: Change it back to Pascal
            if (language === "Pascal") {
                return submissions;
            }
        }
        return 0;
    }
    catch (err) {
        console.error("Couldn't parse submission count");
        return null;
    }
}

// (async () => {
//     console.log(await getSubmissionCount(343130));
// })()
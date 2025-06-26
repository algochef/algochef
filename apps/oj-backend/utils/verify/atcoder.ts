import * as cheerio from "cheerio";

export const verifyAtcoder = async (
  handle: string,
  verificationCode: string,
) => {
  try {
    const res = await fetch("https://atcoder.jp/users/" + handle);
    if (!res.ok) {
      throw new Error("Couldn't make ATC API request!");
    }
    const $ = cheerio.load(await res.text());
    const affiliation = $(".dl-table")
      .eq(0)
      .find("tr")
      .eq(3)
      .find("td.break-all")
      .text()
      .trim();
    console.log(affiliation);
    if (affiliation.toLowerCase() === verificationCode.toLowerCase()) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong while verifying!");
  }
};

// (async()=>{
//     await verifyAtcoder('terminalwarlord', '#1');
// })()

import * as cheerio from "cheerio";

export const verifyCodechef = async (
  handle: string,
  verificationCode: string,
) => {
  try {
    const res = await fetch("https://www.codechef.com/users/" + handle);
    if (!res.ok) {
      throw new Error("Couldn't make CC API request!");
    }
    const $ = cheerio.load(await res.text());
    const name = $(".user-details-container > header >h1.h2-style")
      .text()
      .trim();
    console.log(name);
    if (name.toLowerCase() === verificationCode.toLowerCase()) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong while verifying!");
  }
};

import * as cheerio from 'cheerio';

export const codechefUserDetails = async(handle: string)=>{
    const res = await fetch('https://www.codechef.com/users/'+ handle);
    const $ = cheerio.load(await res.text());
    const name = $('.user-details-container > header >h1.h2-style').text().trim();
    const country = $('.user-country-name').text().trim();
    // const name = details
    console.log(name, country);
}



(async()=>{
    await codechefUserDetails('terminalwarlor');
})()

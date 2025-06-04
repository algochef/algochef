import type { CompanyTag } from "@repo/types/problem";
import { createSlug } from "./create-slug";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const getCompanyTags = async (problemSlug: string) => {
    try {
        const url = `https://api.github.com/search/code?q=${problemSlug}+repo:liquidslr/leetcode-company-wise-problems`;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${GITHUB_TOKEN}`
            }
        })
        if (!res.ok) {
            return [];
        }
        const companies: CompanyTag[] = [];
        const resData = await res.json();
        for (const item of resData.items) {
            const companyName = item.path.split('/')[0];
            const companySlug = createSlug(companyName);
            if (companies.some(company => company.slug == companySlug)) {
                continue;
            }
            companies.push({
                name: companyName,
                slug: companySlug
            });
        }
        console.log(companies);
        return companies;
    }
    catch (err) {
        console.error("Failed to get company tags");
        return [];
    }
}

// (async () => {
//     await getCompanyTag('median-of-two-sorted-arrays');
// })()
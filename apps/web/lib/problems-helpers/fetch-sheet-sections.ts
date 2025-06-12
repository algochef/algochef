import { Sheet } from "@repo/types/problem";

const OJ_BACKEND = process.env.OJ_BACKEND || "http://localhost:3001";

const DUMMY_DATA = [
    {
        title: "Prefix Sum",
        order: 1,
        problems: [
            {
                solved: true,
                companyTags: [
                    {
                        name: "DE Shaw",
                        slug: "de-shaw"
                    },
                    {
                        name: "Samsung",
                        slug: "samsung"
                    },
                    {
                        name: "TikTok",
                        slug: "tiktok"
                    },
                    {
                        name: "Hulu",
                        slug: "hulu"
                    }
                ],
                tags: [
                    {
                        name: "Trie",
                        slug: "trie"
                    }
                ],
                difficultyCategory: "HARD",
                difficultyNumeric: null,
                platform: "LEETCODE",
                slug: "k-th-smallest-in-lexicographical-order",
                url: "https://leetcode.com/problems/k-th-smallest-in-lexicographical-order/?envType=daily-question&envId=2025-06-09",
                title: "K-th Smallest in Lexicographical Order"
            },
            {
                solved: false,
                companyTags: [
                    {
                        name: "Oracle",
                        slug: "oracle"
                    },
                    {
                        name: "Luxoft",
                        slug: "luxoft"
                    },
                    {
                        name: "WinZO",
                        slug: "winzo"
                    },
                    {
                        name: "Zoho",
                        slug: "zoho"
                    },
                    {
                        name: "Turing",
                        slug: "turing"
                    },
                    {
                        name: "Apple",
                        slug: "apple"
                    },
                    {
                        name: "Bloomberg",
                        slug: "bloomberg"
                    },
                    {
                        name: "Airbnb",
                        slug: "airbnb"
                    },
                    {
                        name: "TikTok",
                        slug: "tiktok"
                    },
                    {
                        name: "Citadel",
                        slug: "citadel"
                    },
                    {
                        name: "Meta",
                        slug: "meta"
                    },
                    {
                        name: "MakeMyTrip",
                        slug: "makemytrip"
                    },
                    {
                        name: "Yahoo",
                        slug: "yahoo"
                    },
                    {
                        name: "Amazon",
                        slug: "amazon"
                    },
                    {
                        name: "Snowflake",
                        slug: "snowflake"
                    },
                    {
                        name: "Confluent",
                        slug: "confluent"
                    },
                    {
                        name: "Uber",
                        slug: "uber"
                    },
                    {
                        name: "Google",
                        slug: "google"
                    },
                    {
                        name: "ByteDance",
                        slug: "bytedance"
                    },
                    {
                        name: "Hiver",
                        slug: "hiver"
                    }
                ],
                tags: [
                    {
                        name: "String",
                        slug: "string"
                    },
                    {
                        name: "Recursion",
                        slug: "recursion"
                    },
                    {
                        name: "Dynamic Programming",
                        slug: "dynamic-programming"
                    }
                ],
                difficultyCategory: "HARD",
                difficultyNumeric: null,
                platform: "LEETCODE",
                slug: "regular-expression-matching",
                url: "https://leetcode.com/problems/regular-expression-matching/",
                title: "Regular Expression Matching"
            }
        ]
    },
    {
        title: "Two Pointers",
        order: 2,
        problems: [
            {
                solved: false,
                companyTags: [
                    {
                        name: "Microsoft",
                        slug: "microsoft"
                    },
                    {
                        name: "Adobe",
                        slug: "adobe"
                    },
                    {
                        name: "Yahoo",
                        slug: "yahoo"
                    },
                    {
                        name: "Bloomberg",
                        slug: "bloomberg"
                    },
                    {
                        name: "Apple",
                        slug: "apple"
                    },
                    {
                        name: "Google",
                        slug: "google"
                    },
                    {
                        name: "Zoho",
                        slug: "zoho"
                    },
                    {
                        name: "Amazon",
                        slug: "amazon"
                    },
                    {
                        name: "Uber",
                        slug: "uber"
                    },
                    {
                        name: "Meta",
                        slug: "meta"
                    },
                    {
                        name: "tcs",
                        slug: "tcs"
                    },
                    {
                        name: "Flipkart",
                        slug: "flipkart"
                    }
                ],
                tags: [
                    {
                        name: "Array",
                        slug: "array"
                    },
                    {
                        name: "Sorting",
                        slug: "sorting"
                    },
                    {
                        name: "Two Pointers",
                        slug: "two-pointers"
                    }
                ],
                difficultyCategory: "MEDIUM",
                difficultyNumeric: null,
                platform: "LEETCODE",
                slug: "3sum-closest",
                url: "https://leetcode.com/problems/3sum-closest/",
                title: "3Sum Closest"
            }
        ]
    }
];
export const fetchSheetSections = async (slug: string, userId: string | undefined) => {
    try {
        console.log(slug, userId);
        // TODO: Add filters, pagination
        const res = await fetch(OJ_BACKEND + "/api/v1/sheet?slug="+slug);
        if (!res.ok) {
            console.log("Bad status code");
            return undefined;
        }
        const resData = await res.json();
        console.log(resData.result);
        return resData.result as Sheet;
    }
    catch (err) {
        console.error(err)
        return undefined;
    }
}
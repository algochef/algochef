import { Sheet } from "@repo/types/problem";

const OJ_BACKEND = process.env.OJ_BACKEND || "http://localhost:3001";
export const fetchAllSheets = async ({ userId = 1 }: { userId?: number }) => {
    try {
        // TODO: Add filters, pagination
        // Add user filtered sheets
        const res = await fetch(OJ_BACKEND + "/api/v1/sheets");
        if (!res.ok) {
            console.log("Bad status code");
            return [] as Sheet[];
        }
        const resData = await res.json();
        console.log(resData.sheets);
        return resData.sheets as Sheet[];
    }
    catch (err) {
        return [] as Sheet[]
    }
}
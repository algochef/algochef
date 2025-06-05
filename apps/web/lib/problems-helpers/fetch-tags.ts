
const OJ_BACKEND = process.env.OJ_BACKEND || "http://localhost:3001";
export const fetchTags = async () => {
    try {
        // TODO: Add filters, pagination
        const res = await fetch(OJ_BACKEND + "/api/v1/topics");
        if (!res.ok) {
            console.log("Bad status code");
            return [];
        }
        const resData = await res.json();
        console.log(resData.tags);
        return resData.tags as [];
    }
    catch (err) {
        return []
    }
}
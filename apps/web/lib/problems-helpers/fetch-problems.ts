
const OJ_BACKEND = process.env.OJ_BACKEND || "http://localhost:3001";
export const fetchProblems = async () => {
    try {
        // TODO: Add filters, pagination
        const res = await fetch(OJ_BACKEND + "/api/v1/problems");
        if (!res.ok) {
            console.log("Bad status code");
            return [];
        }
        const resData = await res.json();
        console.log(resData.results);
        return resData.results as [];
    }
    catch (err) {
        return []
    }
}
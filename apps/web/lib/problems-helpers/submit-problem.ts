import { Problem } from "@repo/types/problem";

const OJ_BACKEND = "http://localhost:3001";
export const submitProblem = async (problem: Problem) => {
    try {
        const res = await fetch(OJ_BACKEND + "/api/v1/add-problem", {
            method: "POST",
            body: JSON.stringify(problem),
            headers: {
                "content-type": "application/json"
            }
        });
        if (!res.ok) {
            console.log("ERROR")
            return {
                error: true,
                message: "ERROR"
            };
        }
        return {
            error: false,
            message: "Problem has been added!"
        };

    }
    catch (err) {
        console.log(err)
        return {
            error: true,
            message: err
        };;
    }
}
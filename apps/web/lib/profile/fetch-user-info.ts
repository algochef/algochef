import {User} from "@repo/types/user";

const OJ_BACKEND = process.env.OJ_BACKEND || "http://localhost:3001";

export const fetchUserInfo = async (username: string ) => {
    console.log("fetchUserInfo",username)
    if(!username){
        return null;
    }
    try {
        const res = await fetch(OJ_BACKEND + "/api/v1/profile/"+username);
        if (!res.ok) {
            console.log("Bad status code");
            return null;
        }
        const resData = await res.json();
        console.log(resData)
        return resData.result as User;
    }
    catch (err) {
        return null
    }
}
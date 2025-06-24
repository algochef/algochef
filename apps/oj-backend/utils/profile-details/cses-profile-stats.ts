import { CSESClient } from "./cses-helper/cses-client";



let instance: CSESClient | null = null;
let initializing: Promise<CSESClient> | null = null;

const getClient = async () => {
    if (instance) return instance;
    if (!initializing) {
        initializing = CSESClient.create().then(client => {
            instance = client;
            return client;
        })
    }
    return initializing;
}


export const getCsesStats = async (userId: number) => {
    const client = await getClient();
    await client.addFriend(userId);

    const totalSolved = await client.getSolveCount(userId);
    return {
        totalSolved
    }
}



// (async () => {
//     console.log(await getCsesStats(112416))
// })()
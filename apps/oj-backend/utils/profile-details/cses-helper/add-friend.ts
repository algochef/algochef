export const addFriendHelper = async (sessionId: string, userId: number) => {
    try {
        if (!userId) {
            throw Error("Invalid handle!");
        }
        const res = await fetch(`https://cses.fi/user/${userId}/add`, {
            headers: {
                "Cookie": sessionId,
            }
        });
        return true;
    }
    catch (err) {
        return false;
    }
}
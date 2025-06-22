export const verifyCodeforces = async (handle: string, verificationCode: string) => {
    try {
        const res = await fetch('https://codeforces.com/api/user.info?handles=' + handle);
        if (!res.ok) {
            throw Error("Couldn't make CF API request!");
        }
        const resData = await res.json();
        const lastName = resData.result[0].lastName;
        console.log(lastName)
        if ((lastName.trim() as string).toLowerCase() === verificationCode.toLowerCase()) {
            return true;
        }
        return false;
    }
    catch (err) {
        console.error(err);
        throw Error("Something went wrong while verifying!");
    }
}
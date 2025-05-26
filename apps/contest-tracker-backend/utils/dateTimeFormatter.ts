export const getUnixTime = (datetime: string): number => {
    const formattedUnixTime = Math.floor(new Date(datetime).getTime() / 1000);
    return formattedUnixTime;
}
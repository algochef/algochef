export const verifyLeetcode = async (
  handle: string,
  verificationCode: string,
) => {
  try {
    const query = `
            query userPublicProfile($username: String!) {
            matchedUser(username: $username) {
                contestBadge {
                name
                expired
                hoverText
                icon
                }
                username
                githubUrl
                twitterUrl
                linkedinUrl
                profile {
                ranking
                userAvatar
                realName
                aboutMe
                school
                websites
                countryName
                company
                jobTitle
                skillTags
                postViewCount
                postViewCountDiff
                reputation
                reputationDiff
                solutionCount
                solutionCountDiff
                categoryDiscussCount
                categoryDiscussCountDiff
                certificationLevel
                }
            }
            }
        `;
    const res = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://leetcode.com",
        Referer: `https://leetcode.com/u/${handle}/`,
        "User-Agent": "Mozilla/5.0",
      },
      body: JSON.stringify({
        query,
        variables: { username: handle },
        operationName: "userPublicProfile",
      }),
    });
    if (!res.ok) {
      throw new Error("Couldn't make LC API request!");
    }
    const resData = await res.json();
    const sumamry = resData?.data?.matchedUser?.profile?.aboutMe;
    if (sumamry && sumamry.toLowerCase() === verificationCode.toLowerCase()) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong while verifying!");
  }
};

// (async () => {
//     console.log(await verifyLeetcode('terminalwarlord', '#1'));
// })()

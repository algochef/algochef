import { prismaClient } from "@repo/db/client";
import type { Submission } from "@repo/types/user";

export const getRecentSubmissions = async (
  username: string,
  userId: number,
) => {
  const query = `
    query recentAcSubmissionList($username: String!) {
      recentAcSubmissionList(username: $username) {
        id
        title
        titleSlug
        timestamp
      }
    }
  `;

  const body = JSON.stringify({
    query,
    variables: { username },
  });

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com/",
        "User-Agent": "Mozilla/5.0",
      },
      body,
    });

    if (!response.ok) {
      console.error("Network response was not ok:", response.statusText);
      return null;
    }

    const json = await response.json();

    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
      return null;
    }

    const submissions: Submission[] = json.data.recentAcSubmissionList;
    if (!submissions || !submissions.length) {
      return;
    }
    // console.log(submissions);
    for (const submission of submissions) {
      // console.log(submission)
      // await prismaClient.
    }
  } catch (err) {
    console.error("Fetch error:", err);
    return;
  }
};

// Example usage
(async () => {
  await getRecentSubmissions("TerminalWarlord", 1);
})();
